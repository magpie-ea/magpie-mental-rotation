// In this file you can create your own custom view templates

// First we create a custom_views object
const custom_views = {};

// We can now add view templates to our custom_views object
custom_views.multiple_dropdown = function(config) {
    const multi_dropdown_function = {
        name: config.name,
        title: babeUtils.view.setter.title(config.title, ""),
        render: function(CT, babe) {
            let startingTime;
            const QUD = babeUtils.view.setter.QUD(config.QUD);
            const sentence_chunk_1 = config.data[CT].sentence_chunk_1;
            const sentence_chunk_2 = config.data[CT].sentence_chunk_2;
            const sentence_chunk_3 = config.data[CT].sentence_chunk_3;
            const answer_option_1_1 = config.data[CT].choice_options_1[0];
            const answer_option_1_2 = config.data[CT].choice_options_1[1];
            const answer_option_2_1 = config.data[CT].choice_options_2[0];
            const answer_option_2_2 = config.data[CT].choice_options_2[1];
            const answer_option_2_3 = config.data[CT].choice_options_2[2];
            const viewTemplate = `<div class='babe-view'>
                <h1 class='babe-view-title'>${this.title}</h1>
                <p class='babe-view-question babe-view-qud'>${QUD}</p>
                <p class='babe-response-keypress-header' id = 'reminder'></p>
                </div>`;

            const answerContainerElem = `<div class='babe-view-answer-container babe-response-dropdown'>
                ${sentence_chunk_1}
                <select id='response1' name='answer_1'>
                    <option disabled selected></option>
                    <option value=${answer_option_1_1}>${answer_option_1_1}</option>
                    <option value=${answer_option_1_2}>${answer_option_1_2}</option>
                </select>
                ${sentence_chunk_2}
                <select id='response2' name='answer_2'>
                    <option disabled selected></option>
                    <option value=${answer_option_2_1}>${answer_option_2_1}</option>
                    <option value=${answer_option_2_2}>${answer_option_2_2}</option>
                    <option value=${answer_option_2_3}>${answer_option_2_3}</option>
                </select>
                ${sentence_chunk_3}
                </p>
                <button id='next' class='babe-view-button babe-nodisplay'>Next</button>
            </div>`;

            $("#main").html(viewTemplate);

            const enableResponse = function() {
                let response1;
                let response2;

                $(".babe-view").append(answerContainerElem);

                response1 = $("#response1");
                response2 = $("#response2");

                // flags to check if dropdown menus have been used 
                var response_flags = [0, 0];

                const display_button_checker = function(response_number) {
                    response_flags[response_number] = 1;
                    if (_.min(response_flags) == 1) {
                        $("#next").removeClass("babe-nodisplay");
                    }
                };

                response1.on("change", function() {
                    response_flags[0] = 1;
                    display_button_checker(0);
                });
                response2.on("change", function() {
                    response_flags[1] = 1;
                    display_button_checker(1);
                });

                $("#next").on("click", function() {
                    const RT = Date.now() - startingTime; // measure RT before anything else
                    // clear old timeouts and remove them from the timeout array
                    clearTimeout(window.timeout[0]);
                    window.timeout.shift();
                    const trial_data = {
                        trial_type: config.trial_type,
                        trial_number: CT + 1,
                         sentence_frame: sentence_chunk_1
                            .concat("...")
                            .concat(sentence_chunk_2)
                            .concat("...")
                            .concat(sentence_chunk_3),
                        response_1: $(response1).val(),
                        response_2: $(response2).val(),
                        RT: RT
                    };

                    for (let prop in config.data[CT]) {
                        if (config.data[CT].hasOwnProperty(prop)) {
                            trial_data[prop] = config.data[CT][prop];
                        }
                    }

                    babe.trial_data.push(trial_data);
                    babe.findNextView();
                });
            };

            startingTime = Date.now();

            // creates the DOM of the trial view
            babeUtils.view.createTrialDOM(
                {
                    pause: config.pause,
                    fix_duration: config.fix_duration,
                    stim_duration: config.stim_duration,
                    data: config.data[CT],
                    evts: config.hook,
                    view: "multi_dropdown"
                },
                enableResponse
            );
        },
        CT: 0,
        trials: config.trials
    };

    return multi_dropdown_function;
};
