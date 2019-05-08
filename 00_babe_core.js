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

// Fill defaults post_test
fill_defaults_post_test = function(config) {
    return {
        age: {
            title: babeUtils.view.setter.prop(config.age_question, "Age")
        },
        gender: {
            title: babeUtils.view.setter.prop(config.gender_question, "Gender"),
            male: babeUtils.view.setter.prop(config.gender_male, "male"),
            female: babeUtils.view.setter.prop(config.gender_female, "female"),
            other: babeUtils.view.setter.prop(config.gender_other, "other")
        },
        edu: {
            title: babeUtils.view.setter.prop(config.edu_question, "Level of Education"),
            graduated_high_school: babeUtils.view.setter.prop(config.edu_graduated_high_school,
                "Graduated High School"),
            graduated_college: babeUtils.view.setter.prop(config.edu_graduated_college, "Graduated College"),
            higher_degree: babeUtils.view.setter.prop(config.edu_higher_degree, "Higher Degree")
        },
        langs: {
            title: babeUtils.view.setter.prop(config.languages_question, "Native Languages"),
            text: babeUtils.view.setter.prop(config.languages_more,
                "(i.e. the language(s) spoken at home when you were a child)")
        },
        comments: {
            title: babeUtils.view.setter.prop(config.comments_question, "Further Comments")
        }
    };
};


// The following 3 dicts will be moved to babe-templates.js or something similar

// The view template dict contains a generator function for every view type we support
// The generator gets the config dict and CT as input and will generate the babe-view HTML code
// (Some view templates are the same, e.g. forced_choice and sliderRating)
const stimulus_container_generators = {
    basic_stimulus: function (config, CT) {
        return `<div class='babe-view'>
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <p class='babe-view-question babe-view-qud'>${config.data[CT].QUD}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;
    },
    key_press: function(config, CT) {
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
    fixed_text: function(config, CT) {
        return `<div class='babe-view'>
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <section class="babe-text-container">
                        <p class="babe-view-text">${config.text}</p>
                    </section>
                </div>`;
    },
    post_test: function(config, CT) {
        return `<div class='babe-view babe-post-test-view'>
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <section class="babe-text-container">
                        <p class="babe-view-text">${config.text}</p>
                    </section>
                </div>`;
    },
    empty: function(config, CT) {
        return ``;
    },
    self_paced_reading: function(config, CT) {
        const helpText = config.data[CT].help_text !== undefined ?
            config.data[CT].help_text : "Press the SPACE bar to reveal the words";
        return `<div class='babe-view'>
                    <h1 class='babe-view-title'>${config.title}</h1>
                    <p class='babe-view-question babe-view-qud'>${config.data[CT].QUD}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                    <p class='babe-help-text babe-nodisplay'>${helpText}</p>
                    <p class='babe-spr-sentence'></p>
                </div>`;
    }
};

// The answer container dict contains a generator function for every view type we support
// The generator gets the config dict and CT as input and will generate the babe-view-answer-container HTML code
// (Some answer container elements should be the same, e.g. slider rating and SPR-slider rating)
const answer_container_generators = {
    button_choice: function (config, CT) {
        return `<div class='babe-view-answer-container'>
                    <p class='babe-view-question'>${config.data[CT].question}</p>
                    <label for='o1' class='babe-response-buttons'>${config.data[CT].option1}</label>
                    <input type='radio' name='answer' id='o1' value=${config.data[CT].option1} />
                    <input type='radio' name='answer' id='o2' value=${config.data[CT].option2} />
                    <label for='o2' class='babe-response-buttons'>${config.data[CT].option2}</label>
                </div>`;
    },
    question: function(config, CT) {
        return `<div class='babe-view-answer-container'>
                        <p class='babe-view-question'>${config.data[CT].question}</p>`;
    },
    one_button: function (config, CT) {
        return `<button id="next" class='babe-view-button' class="babe-nodisplay">${
                        config.button
                    }</button>`
    },
    post_test: function(config, CT) {
        const quest = fill_defaults_post_test(config);
        return `<form>
                    <p class='babe-view-text'>
                        <label for="age">${quest.age.title}:</label>
                        <input type="number" name="age" min="18" max="110" id="age" />
                    </p>
                    <p class='babe-view-text'>
                        <label for="gender">${quest.gender.title}:</label>
                        <select id="gender" name="gender">
                            <option></option>
                            <option value="${quest.gender.male}">${quest.gender.male}</option>
                            <option value="${quest.gender.female}">${quest.gender.female}</option>
                            <option value="${quest.gender.other}">${quest.gender.other}</option>
                        </select>
                    </p>
                    <p class='babe-view-text'>
                        <label for="education">${quest.edu.title}:</label>
                        <select id="education" name="education">
                            <option></option>
                            <option value="${quest.edu.graduated_high_school}">${quest.edu.graduated_high_school}</option>
                            <option value="${quest.edu.graduated_college}">${quest.edu.graduated_college}</option>
                            <option value="${quest.edu.higher_degree}">${quest.edu.higher_degree}</option>
                        </select>
                    </p>
                    <p class='babe-view-text'>
                        <label for="languages" name="languages">${quest.langs.title}:<br /><span>${quest.langs.text}</</span></label>
                        <input type="text" id="languages"/>
                    </p>
                    <p class="babe-view-text">
                        <label for="comments">${quest.comments.title}</label>
                        <textarea name="comments" id="comments" rows="6" cols="40"></textarea>
                    </p>
                    <button id="next" class='babe-view-button'>${config.button}</button>
            </form>`
    },
    empty: function(config, CT) {
        return ``;
    },
    slider_rating: function(config, CT) {
        const option1 = config.data[CT].optionLeft;
        const option2 = config.data[CT].optionRight;
        return `<p class='babe-view-question'>${config.data[CT].question}</p>
                <div class='babe-view-answer-container'>
                    <span class='babe-response-slider-option'>${option1}</span>
                    <input type='range' id='response' class='babe-response-slider' min='0' max='100' value='50'/>
                    <span class='babe-response-slider-option'>${option2}</span>
                </div>
                <button id="next" class='babe-view-button babe-nodisplay'>Next</button>`;
    },
    textbox_input: function(config, CT) {
        return `<p class='babe-view-question'>${config.data[CT].question}</p>
                    <div class='babe-view-answer-container'>
                        <textarea name='textbox-input' rows=10 cols=50 class='babe-response-text' />
                    </div>
                    <button id='next' class='babe-view-button babe-nodisplay'>next</button>`;
    },
    dropdown_choice: function(config, CT) {
        const question_left_part =
            config.data[CT].question_left_part === undefined ? "" : config.data[CT].question_left_part;
        const question_right_part =
            config.data[CT].question_right_part === undefined ? "" : config.data[CT].question_right_part;
        const option1 = config.data[CT].option1;
        const option2 = config.data[CT].option2;
        return `<div class='babe-view-answer-container babe-response-dropdown'>
                    ${question_left_part}
                    <select id='response' name='answer'>
                        <option disabled selected></option>
                        <option value=${option1}>${option1}</option>
                        <option value=${option2}>${option2}</option>
                    </select>
                    ${question_right_part}
                    </p>
                    <button id='next' class='babe-view-button babe-nodisplay'>Next</button>
                </div>`;

    },
    rating_scale: function(config, CT) {
        return `<p class='babe-view-question'>${config.data[CT].question}</p>
                <div class='babe-view-answer-container'>
                    <strong class='babe-response-rating-option babe-view-text'>${config.data[CT].optionLeft}</strong>
                    <label for="1" class='babe-response-rating'>1</label>
                    <input type="radio" name="answer" id="1" value="1" />
                    <label for="2" class='babe-response-rating'>2</label>
                    <input type="radio" name="answer" id="2" value="2" />
                    <label for="3" class='babe-response-rating'>3</label>
                    <input type="radio" name="answer" id="3" value="3" />
                    <label for="4" class='babe-response-rating'>4</label>
                    <input type="radio" name="answer" id="4" value="4" />
                    <label for="5" class='babe-response-rating'>5</label>
                    <input type="radio" name="answer" id="5" value="5" />
                    <label for="6" class='babe-response-rating'>6</label>
                    <input type="radio" name="answer" id="6" value="6" />
                    <label for="7" class='babe-response-rating'>7</label>
                    <input type="radio" name="answer" id="7" value="7" />
                    <strong class='babe-response-rating-option babe-view-text'>${config.data[CT].optionRight}</strong>
                </div>`;
    },
    sentence_choice: function(config, CT) {
        return `<div class='babe-view-answer-container'>
                    <p class='babe-view-question'>${config.data[CT].question}</p>
                    <label for='s1' class='babe-response-sentence'>${config.data[CT].option1}</label>
                    <input type='radio' name='answer' id='s1' value="${config.data[CT].option1}" />
                    <label for='s2' class='babe-response-sentence'>${config.data[CT].option2}</label>
                    <input type='radio' name='answer' id='s2' value="${config.data[CT].option2}" />
                </div>`;
    },
    image_selection: function(config, CT) {
        $(".babe-view-stimulus-container").addClass("babe-nodisplay");
        return    `<div class='babe-view-answer-container'>
                        <p class='babe-view-question'>${config.data[CT].question}</p>
                        <label for="img1" class='babe-view-picture babe-response-picture'><img src=${config.data[CT].picture1}></label>
                        <input type="radio" name="answer" id="img1" value="${config.data[CT].option1}" />
                        <input type="radio" name="answer" id="img2" value="${config.data[CT].option2}" />
                        <label for="img2" class='babe-view-picture babe-response-picture'><img src=${config.data[CT].picture2}></label>
                    </div>`;
    }
};

// The enable response dict contains a generator function for every view type we support
// The generator gets the config dict, CT, the answer_container_generator and the startingTime as input
const handle_response_functions = {
    button_choice: function(config, CT, babe, answer_container_generator, startingTime) {
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
    key_press: function (config, CT, babe, answer_container_generator, startingTime) {

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
    intro: function(config, CT, babe, answer_container_generator, startingTime) {

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
    one_click: function(config, CT, babe, answer_container_generator, startingTime) {

        $(".babe-view").append(answer_container_generator(config, CT));

        $("#next").on("click", function() {
            babe.findNextView();
        });
    },
    post_test: function(config, CT, babe, answer_container_generator, startingTime) {
        $(".babe-view").append(answer_container_generator(config, CT));

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            babe.global_data.age = $("#age").val();
            babe.global_data.gender = $("#gender").val();
            babe.global_data.education = $("#education").val();
            babe.global_data.languages = $("#languages").val();
            babe.global_data.comments = $("#comments")
                .val()
                .trim();
            babe.global_data.endTime = Date.now();
            babe.global_data.timeSpent =
                (babe.global_data.endTime -
                    babe.global_data.startTime) /
                60000;

            // moves to the next view
            babe.findNextView();
        });
    },
    thanks: function(config, CT, babe, answer_container_generator, startingTime) {
        const prolificConfirmText = babeUtils.view.setter.prolificConfirmText(config.prolificConfirmText,
            "Please press the button below to confirm that you completed the experiment with Prolific");
        if (
            babe.deploy.is_MTurk ||
            babe.deploy.deployMethod === "directLink" ||
            babe.deploy.deployMethod === "localServer"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                `<div class='babe-view babe-thanks-view'>
                            <h2 id='warning-message' class='babe-warning'>Submitting the data
                                <p class='babe-view-text'>please do not close the tab</p>
                                <div class='babe-loader'></div>
                            </h2>
                            <h1 id='thanks-message' class='babe-thanks babe-nodisplay'>${
                    config.title
                    }</h1>
                        </div>`
            );
        } else if (babe.deploy.deployMethod === "Prolific") {
            $("#main").html(
                `<div class='babe-view babe-thanks-view'>
                            <h2 id='warning-message' class='babe-warning'>Submitting the data
                                <p class='babe-view-text'>please do not close the tab</p>
                                <div class='babe-loader'></div>
                            </h2>
                            <h1 id='thanks-message' class='babe-thanks babe-nodisplay'>${
                    config.title
                    }</h1>
                            <p id='extra-message' class='babe-view-text babe-nodisplay'>
                                ${prolificConfirmText}
                                <a href="${
                    babe.deploy.prolificURL
                    }" class="babe-view-button prolific-url">Confirm</a>
                            </p>
                        </div>`
            );
        } else if (babe.deploy.deployMethod === "debug") {
            $("main").html(
                `<div id='babe-debug-table-container' class='babe-view babe-thanks-view'>
                            <h1 class='babe-view-title'>Debug Mode</h1>
                        </div>`
            );
        } else {
            console.error("No such babe.deploy.deployMethod");
        }

        babe.submission.submit(babe);
    },
    slider_rating: function(config, CT, babe, answer_container_generator, startingTime){
        let response;

        $(".babe-view").append(answer_container_generator(config, CT));

        response = $("#response");
        // checks if the slider has been changed
        response.on("change", function() {
            $("#next").removeClass("babe-nodisplay");
        });
        response.on("click", function() {
            $("#next").removeClass("babe-nodisplay");
        });

        $("#next").on("click", function() {
            const RT = Date.now() - startingTime; // measure RT before anything else
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                response: response.val(),
                RT: RT
            };

            trial_data = save_config_trial_data(config.data[CT], trial_data);

            babe.trial_data.push(trial_data);
            babe.findNextView();
        });
    },
    textbox_input: function(config, CT, babe, answer_container_generator, startingTime) {
        let next;
        let textInput;
        const minChars = config.data[CT].min_chars === undefined ? 10 : config.data[CT].min_chars;

        $(".babe-view").append(answer_container_generator(config, CT));

        next = $("#next");
        textInput = $("textarea");

        // attaches an event listener to the textbox input
        textInput.on("keyup", function() {
            // if the text is longer than (in this case) 10 characters without the spaces
            // the 'next' button appears
            if (textInput.val().trim().length > minChars) {
                next.removeClass("babe-nodisplay");
            } else {
                next.addClass("babe-nodisplay");
            }
        });

        // the trial data gets added to the trial object
        next.on("click", function() {
            const RT = Date.now() - startingTime; // measure RT before anything else
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                response: textInput.val().trim(),
                RT: RT
            };

            trial_data = save_config_trial_data(config.data[CT], trial_data);

            babe.trial_data.push(trial_data);
            babe.findNextView();
        });
    },
    dropdown_choice: function(config, CT, babe, answer_container_generator, startingTime){
        let response;

        const question_left_part =
            config.data[CT].question_left_part === undefined ? "" : config.data[CT].question_left_part;
        const question_right_part =
            config.data[CT].question_right_part === undefined ? "" : config.data[CT].question_right_part;

        $(".babe-view").append(answer_container_generator(config, CT));

        response = $("#response");

        response.on("change", function() {
            $("#next").removeClass("babe-nodisplay");
        });


        $("#next").on("click", function() {
            const RT = Date.now() - startingTime; // measure RT before anything else
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                question: question_left_part.concat("...answer here...").concat(question_right_part),
                response: response.val(),
                RT: RT
            };

            trial_data = save_config_trial_data(config.data[CT], trial_data);

            babe.trial_data.push(trial_data);
            babe.findNextView();
        });
    },
    self_paced_reading: function(config, CT, babe, answer_container_generator, startingTime){

        const sentenceList = config.data[CT].sentence.trim().split(" | ");
        let spaceCounter = 0;
        let wordList;
        let readingTimes = [];

        // shows the sentence word by word on SPACE press
        const handle_key_press = function(e) {

            if (e.which === 32 && spaceCounter < wordList.length) {
                wordList[spaceCounter].classList.remove(
                    "spr-word-hidden"
                );

                if (spaceCounter === 0) {
                    $(".babe-help-text").addClass("babe-invisible");
                }

                if (spaceCounter > 0) {
                    wordList[spaceCounter - 1].classList.add(
                        "spr-word-hidden"
                    );
                }

                readingTimes.push(Date.now());
                spaceCounter++;
            } else if (
                e.which === 32 &&
                spaceCounter === wordList.length
            ) {
                wordList[spaceCounter - 1].classList.add(
                    "spr-word-hidden"
                );

                $(".babe-view").append(answer_container_generator(config, CT));

                $("input[name=answer]").on("change", function() {
                    const RT = Date.now() - startingTime;
                    let reactionTimes = readingTimes
                        .reduce((result, current, idx) => {
                            return result.concat(
                                readingTimes[idx + 1] - readingTimes[idx]
                            );
                        }, [])
                        .filter((item) => isNaN(item) === false);
                    let trial_data = {
                        trial_name: config.name,
                        trial_number: CT + 1,
                        response: $("input[name=answer]:checked").val(),
                        reaction_times: reactionTimes,
                        time_spent: RT
                    };

                    trial_data = save_config_trial_data(config.data[CT], trial_data);

                    babe.trial_data.push(trial_data);
                    babe.findNextView();
                });
                readingTimes.push(Date.now());
                spaceCounter++;
            }
        };
        // shows the help text
        $(".babe-help-text").removeClass("babe-nodisplay");

        // creates the sentence
        sentenceList.map((word) => {
            $(".babe-spr-sentence").append(
                `<span class='spr-word spr-word-hidden'>${word}</span>`
            );
        });

        // creates an array of spr word elements
        wordList = $(".spr-word").toArray();

        // attaches an eventListener to the body for space
        $("body").on("keydown", handle_key_press);

    }
};

const view_info_dict = {
    intro: {
        type: "wrapping",
        default_title: "Welcome!",
        default_button_text: "Next",
        default_view_temp: stimulus_container_generators.fixed_text,
        default_answer_temp: answer_container_generators.one_button,
        default_handle_response: handle_response_functions.intro
    },
    instructions: {
        type: "wrapping",
        default_title: "Instructions",
        default_button_text: "Next",
        default_view_temp: stimulus_container_generators.fixed_text,
        default_answer_temp: answer_container_generators.one_button,
        default_handle_response: handle_response_functions.one_click
    },
    begin: {
        type: "wrapping",
        default_title: "Begin",
        default_button_text: "Next",
        default_view_temp: stimulus_container_generators.fixed_text,
        default_answer_temp: answer_container_generators.one_button,
        default_handle_response: handle_response_functions.one_click
    },
    post_test: {
        type: "wrapping",
        default_title: "Additional Information",
        default_button_text: "Next",
        default_view_temp: stimulus_container_generators.post_test,
        default_answer_temp: answer_container_generators.post_test,
        default_handle_response: handle_response_functions.post_test
    },
    thanks: {
        type: "wrapping",
        default_title: "Thank you for taking part in this experiment!",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.empty,
        default_answer_temp: answer_container_generators.empty,
        default_handle_response: handle_response_functions.thanks
    },
    forced_choice: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.button_choice,
        default_handle_response: handle_response_functions.button_choice
    },
    key_press: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.key_press,
        default_answer_temp: answer_container_generators.question,
        default_handle_response: handle_response_functions.key_press
    },
    slider_rating: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.slider_rating,
        default_handle_response: handle_response_functions.slider_rating
    },
    textbox_input: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.textbox_input,
        default_handle_response: handle_response_functions.textbox_input
    },
    dropdown_choice: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.dropdown_choice,
        default_handle_response: handle_response_functions.dropdown_choice
    },
    rating_scale: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.rating_scale,
        default_handle_response: handle_response_functions.button_choice
    },
    sentence_choice: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.sentence_choice,
        default_handle_response: handle_response_functions.button_choice
    },
    image_selection: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.basic_stimulus,
        default_answer_temp: answer_container_generators.image_selection,
        default_handle_response: handle_response_functions.button_choice
    },
    self_paced_reading: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.self_paced_reading,
        default_answer_temp: answer_container_generators.button_choice,
        default_handle_response: handle_response_functions.self_paced_reading
    },
    self_paced_reading_rating_scale: {
        type: "trial",
        default_title: "",
        default_button_text: "",
        default_view_temp: stimulus_container_generators.self_paced_reading,
        default_answer_temp: answer_container_generators.rating_scale,
        default_handle_response: handle_response_functions.self_paced_reading
    }


};


// This is the generic view, which will be moved to babe-views.js and replace all current views there
// Every view_generator needs a view_type and a config dict as input
// In addition you can pass an optional dict with custom (or from other trial_types) view_template,
// answer_container and enable_response generators,
// if you don't pass this dict, it will use the default generators for this trial_type
// With this options you can customize views,
// otherwise you could create full custom views
// (you do everything you own, the "only" constraints are that you have a render function
// and you have to call babe.findNextView(), e.g. you don't need to use babeUtils.view.createTrialDOM)
const view_generator = function(view_type, config,
                                {
                                     stimulus_container_generator=view_info_dict[view_type].default_view_temp,
                                     answer_container_generator=view_info_dict[view_type].default_answer_temp,
                                     handle_response_function=view_info_dict[view_type].default_handle_response
                                 } = {}
) {
    // First it will inspect, if the parameters and the config dict passed are correct
    if (view_info_dict[view_type].type === "trial") {
        babeUtils.view.inspector.missingData(config, view_type);
    }
    babeUtils.view.inspector.params(config, view_type);
    // Now, it will set the title of the view to the default title if no title is set and the button
    // (otherwise we would get a Undefined error in the view_template)
    config.title = babeUtils.view.setter.title(config.title, view_info_dict[view_type].default_title);
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
            if (view_info_dict[view_type].type === "trial") {
                config.data[CT].question = babeUtils.view.setter.question(config.data[CT].question);
                config.data[CT].QUD = babeUtils.view.setter.QUD(config.data[CT].QUD);
            }


            // Now we will display the view template
            $("#main").html(stimulus_container_generator(config, CT));

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
                    view: view_type
                },
                // After the first three steps of the trial view lifecycle (can all be empty)
                // We call the following function and interactions are now enabled
                function() {
                    handle_response_function(config, CT, babe, answer_container_generator, startingTime)
                }
            );
        }
    };
    // We return the created view, so that it can be used in 05_views.js
    return view;
};
