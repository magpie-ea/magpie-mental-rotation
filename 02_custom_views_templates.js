// In this file you can create your own custom view templates


// The following 3 dicts will be moved to babe-templates.js or something similar

// The view template dict contains a generator function for every view type we support
// The generator gets the config dict and CT as input and will generate the babe-view HTML code
// (Some view templates are the same, e.g. forced_choice and sliderRating)
const view_temp_dict = {
    "forced_choice": function (config, CT) {
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
    }
};

// The answer container dict contains a generator function for every view type we support
// The generator gets the config dict and CT as input and will generate the babe-view-answer-container HTML code
// (Some answer container elements should be the same, e.g. slider rating and SPR-slider rating)
const answer_contain_dict = {
    "forced_choice": function (config, CT) {
      return `<div class='babe-view-answer-container'>
                    <p class='babe-view-question'>${config.data[CT].question}</p>
                    <label for='o1' class='babe-response-buttons'>${config.data[CT].option1}</label>
                    <input type='radio' name='answer' id='o1' value=${config.data[CT].option1} />
                    <input type='radio' name='answer' id='o2' value=${config.data[CT].option2} />
                    <label for='o2' class='babe-response-buttons'>${config.data[CT].option2}</label>
                </div>`;
      },
    "key_press": function(config, CT) {
        return `<div class='babe-view-answer-container'>
                        <p class='babe-view-question'>${config.data[CT].question}</p>`;
    }
};

// The enable response dict contains a generator function for every view type we support
// The generator gets the config dict, CT, the answer_container_generator and the startingTime as input
const enable_response_dict = {
    "forced_choice": function(config, CT, babe, answer_container_generator, startingTime) {
        $(".babe-view").append(answer_container_generator(config, CT));

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal
        // to the answer is added to the trial object
        // as well as a readingTimes property with value
        $("input[name=answer]").on("change", function() {
            const RT = Date.now() - startingTime;
            let trial_data = {
                trial_type: config.trial_type,
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
                    trial_type: config.trial_type,
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
    }
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
                                     view_template_generator=view_temp_dict[trial_type],
                                     answer_container_element_generator=answer_contain_dict[trial_type],
                                     enable_response_generator=enable_response_dict[trial_type]
                                 } = {}
                                 ) {
    // First it will inspect, if the parameters and the config dict passed are correct
    babeUtils.view.inspector.missingData(config, trial_type);
    babeUtils.view.inspector.params(config, trial_type);
    // Now, it will set the title of the view to "" if no title is set
    // (otherwise we would get a Undefined error in the view_template)
    config.title = babeUtils.view.setter.title(config.title, "");

    // Here, the view gets constructed, every view has a name, CT (current trial in view counter),
    // trials (number of trials of this view) and a render function
    const view = {
        name: config.name,
        CT: 0,
        trials: config.trials,
        // The render function gets the babe object as well as the current trial in view counter as input
        render: function(CT, babe){

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
    // We return the created view, so that it can be used in 04_views.js
    return view;
};
