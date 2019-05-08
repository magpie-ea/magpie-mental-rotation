// This will be moved to babe-project

// Function to save all config information
// Will be moved to babe-utils and generalized to flatten all kind of objects and not only canvas
save_config_trial_data = function(config_info, trial_data) {
    for (let prop in config_info) {
        if (config_info.hasOwnProperty(prop)) {
            trial_data[prop] = config_info[prop];
        }
    }

    if (config_info.canvas !== undefined) {
        if (config_info.canvas.canvasSettings !== undefined) {
            for (let prop in config_info.canvas.canvasSettings) {
                if (config_info.canvas.canvasSettings.hasOwnProperty(prop)) {
                    trial_data[prop] = config_info.canvas.canvasSettings[prop];
                }
            }
            delete trial_data.canvas.canvasSettings;
        }
        for (let prop in config_info.canvas) {
            if (config_info.canvas.hasOwnProperty(prop)) {
                trial_data[prop] = config_info.canvas[prop];
            }
        }
        delete trial_data.canvas;
    }

    return trial_data;
};


// The following 3 dicts will be moved to babe-templates.js or something similar

// The view template dict contains a generator function for every view type we support
// The generator gets the config dict and CT as input and will generate the babe-view HTML code
// (Some view templates are the same, e.g. forced_choice and sliderRating)
const view_temp_dict = {
    "basic_stimulus": function (config, CT) {
        return `<div class='babe-view'>
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <p class='babe-view-question babe-view-qud'>${config.data[CT].QUD}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;
    },
    "key_press": function(config, CT) {
        return `<div class="babe-view">
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <p class='babe-response-keypress-header'>
                    <strong>${config.data[CT].key1}</strong> = ${config.data[CT][config.data[CT].key1]}, 
                    <strong>${config.data[CT].key2}</strong> = ${config.data[CT][config.data[CT].key2]}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;
    },
    "fixed_text": function(config, CT) {
        return `<div class='babe-view'>
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <section class="babe-text-container">
                        <p class="babe-view-text">${config.text}</p>
                    </section>
                </div>`
    }
};

// The answer container dict contains a generator function for every view type we support
// The generator gets the config dict and CT as input and will generate the babe-view-answer-container HTML code
// (Some answer container elements should be the same, e.g. slider rating and SPR-slider rating)
const answer_contain_dict = {
    "button_choice": function (config, CT) {
        return `<div class='babe-view-answer-container'>
                    <p class='babe-view-question'>${config.data[CT].question}</p>
                    <label for='o1' class='babe-response-buttons'>${config.data[CT].option1}</label>
                    <input type='radio' name='answer' id='o1' value=${config.data[CT].option1} />
                    <input type='radio' name='answer' id='o2' value=${config.data[CT].option2} />
                    <label for='o2' class='babe-response-buttons'>${config.data[CT].option2}</label>
                </div>`;
    },
    "question": function(config, CT) {
        return `<div class='babe-view-answer-container'>
                        <p class='babe-view-question'>${config.data[CT].question}</p>`;
    },
    "one_button": function (config, CT) {
        return `<button id="next" class='babe-view-button' class="babe-nodisplay">${
                        config.button
                    }</button>`
    }
};

// The enable response dict contains a generator function for every view type we support
// The generator gets the config dict, CT, the answer_container_generator and the startingTime as input
const enable_response_dict = {
    "button_choice": function(config, CT, babe, answer_container_generator, startingTime) {
        $(".babe-view").append(answer_container_generator(config, CT));

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal
        // to the answer is added to the trial object
        // as well as a readingTimes property with value
        $("input[name=answer]").on("change", function() {
            const RT = Date.now() - startingTime;
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                response: $("input[name=answer]:checked").val(),
                RT: RT
            };

            trial_data = save_config_trial_data(config.data[CT], trial_data);

            babe.trial_data.push(trial_data);
            babe.findNextView();
        });
    },
    "key_press": function (config, CT, babe, answer_container_generator, startingTime) {

        $(".babe-view").append(answer_container_generator(config, CT));

        const handleKeyPress = function(e) {
            const keyPressed = String.fromCharCode(
                e.which
            ).toLowerCase();

            if (keyPressed === config.data[CT].key1 || keyPressed === config.data[CT].key2) {
                let correctness;
                const RT = Date.now() - startingTime; // measure RT before anything else

                if (
                    config.data[CT].expected ===
                    config.data[CT][keyPressed.toLowerCase()]
                ) {
                    correctness = "correct";
                } else {
                    correctness = "incorrect";
                }

                let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    key_pressed: keyPressed,
                    correctness: correctness,
                    RT: RT
                };

                trial_data[config.data[CT].key1] =
                    config.data[CT][config.data[CT].key1];
                trial_data[config.data[CT].key2] =
                    config.data[CT][config.data[CT].key2];

                trial_data = save_config_trial_data(config.data[CT], trial_data);

                babe.trial_data.push(trial_data);
                $("body").off("keydown", handleKeyPress);
                babe.findNextView();
            }
        };

        $("body").on("keydown", handleKeyPress);
    },
    "intro": function(config, CT, babe, answer_container_generator, startingTime) {

        $(".babe-view").append(answer_container_generator(config, CT));

        let prolificId;
        const prolificForm = `<p id="prolific-id-form">
                    <label for="prolific-id">Please, enter your Prolific ID</label>
                    <input type="text" id="prolific-id" />
                </p>`;

        const next = $("#next");

        function showNextBtn() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("babe-nodisplay");
            } else {
                next.addClass("babe-nodisplay");
            }
        }

        if (babe.deploy.deployMethod === "Prolific") {
            $(".babe-text-container").append(prolificForm);
            next.addClass("babe-nodisplay");
            prolificId = $("#prolific-id");

            prolificId.on("keyup", function() {
                showNextBtn();
            });

            prolificId.on("focus", function() {
                showNextBtn();
            });
        }

        // moves to the next view
        next.on("click", function() {
            if (babe.deploy.deployMethod === "Prolific") {
                babe.global_data.prolific_id = prolificId.val().trim();
            }

            babe.findNextView();
        });
    },
    "one_click": function(config, CT, babe, answer_container_generator, startingTime) {

        $(".babe-view").append(answer_container_generator(config, CT));

        $("#next").on("click", function() {
            babe.findNextView();
        });
    }
};

const view_info_dict = {
    "intro": {
        type: "wrapping",
        default_title: "Welcome!",
        default_button_text: "Next",
        default_view_temp: view_temp_dict.fixed_text,
        default_answer_temp: answer_contain_dict.one_button,
        default_handle_response: enable_response_dict.intro
    },
    "instructions": {
        type: "wrapping",
        default_title: "Instructions",
        default_button_text: "Next",
        default_view_temp: view_temp_dict.fixed_text,
        default_answer_temp: answer_contain_dict.one_button,
        default_handle_response: enable_response_dict.one_click
    },
    "begin": {
        type: "wrapping",
        default_title: "Begin",
        default_button_text: "Next",
        default_view_temp: view_temp_dict.fixed_text,
        default_answer_temp: answer_contain_dict.one_button,
        default_handle_response: enable_response_dict.one_click
    },
    "forced_choice": {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: view_temp_dict.basic_stimulus,
        default_answer_temp: answer_contain_dict.button_choice,
        default_handle_response: enable_response_dict.button_choice
    },
    "key_press": {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: view_temp_dict.key_press,
        default_answer_temp: answer_contain_dict.question,
        default_handle_response: enable_response_dict.key_press
    },

};


// This is the generic trial type view, which will be moved to babe-views.js and replace all current trial type views there
// Every trial_type_view needs a trial_type and a config dict as input
// In addition you can pass an optional dict with custom (or from other trial_types) view_template,
// answer_container and enable_response generators,
// if you don't pass this dict, it will use the default generators for this trial_type
// With this options you can customize views,
// otherwise you could create full custom views
// (you do everything you own, the "only" constraints are that you have a render function
// and you have to call babe.findNextView(), e.g. you don't need to use babeUtils.view.createTrialDOM)
const trial_type_view = function(trial_type, config,
                                 {
                                     view_template_generator=view_info_dict[trial_type].default_view_temp,
                                     answer_container_element_generator=view_info_dict[trial_type].default_answer_temp,
                                     enable_response_generator=view_info_dict[trial_type].default_handle_response
                                 } = {}
) {
    // First it will inspect, if the parameters and the config dict passed are correct
    if (view_info_dict[trial_type].type === "trial") {
        babeUtils.view.inspector.missingData(config, trial_type);
    }
    babeUtils.view.inspector.params(config, trial_type);
    // Now, it will set the title of the view to the default title if no title is set and the button
    // (otherwise we would get a Undefined error in the view_template)
    config.title = babeUtils.view.setter.title(config.title, view_info_dict[trial_type].default_title);
    config.button = babeUtils.view.setter.buttonText(config.buttonText);

    // Here, the view gets constructed, every view has a name, CT (current trial in view counter),
    // trials (number of trials of this view) and a render function
    const view = {
        name: config.name,
        CT: 0,
        trials: config.trials,
        // The render function gets the babe object as well as the current trial in view counter as input
        render: function(CT, babe){

            // If no data is passed (e.g. wrapping views), generate empty config.data[CT] objects
            if (typeof config.data === 'undefined'){
                config.data = _.fill(Array(config.trials), {});
            }

            // First we will set the question and the QUD to "", to avoid Undefined
            config.data[CT].question = babeUtils.view.setter.question(config.data[CT].question);
            config.data[CT].QUD = babeUtils.view.setter.QUD(config.data[CT].QUD);

            // Now we will display the view template
            $("#main").html(view_template_generator(config, CT));

            // And measure the starting time
            let startingTime = Date.now();

            // Finally we create the TrialDOM (including the trial life cycle and hooks)
            babeUtils.view.createTrialDOM(
                {
                    pause: config.pause,
                    fix_duration: config.fix_duration,
                    stim_duration: config.stim_duration,
                    data: config.data[CT],
                    evts: config.hook,
                    view: trial_type
                },
                // After the first three steps of the trial view lifecycle (can all be empty)
                // We call the following function and interactions are now enabled
                function() {
                    enable_response_generator(config, CT, babe, answer_container_element_generator, startingTime)
                }
            );
        }
    };
    // We return the created view, so that it can be used in 05_views.js
    return view;
};
