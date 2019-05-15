// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can flip a coin for your experiment here
// Declare your variables here



/* Helper functions
*
*
*/


/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    window.timeout.push(setTimeout(function(){
          $('#reminder').text('Please answer more quickly!');
    }, 5000));
    next();
};

let stimShown;
let howLong;

const myEvents = {
    timeShown: function(data, next) {
        stimShown = Date.now();
        next();
    },

    timeHidden: function(data, next) {
        howLong = Date.now() - stimShown;
        alert('You have been looking at the image for '.concat(howLong).concat('ms'));
        next();
    }
};

// Declare your hooks here


/* Generators for custom view templates, answer container elements and enable response functions
*
*
*/

// Here, we will define some generator functions for a multi-dropdown view
const multi_dropdown_gens = {
    // A generator for our view template
    stimulus_container_gen: function(config, CT){
        return `<div class='babe-view'>
                <h1 class='babe-view-title'>${config.title}</h1>
                <p class='babe-view-question babe-view-qud'>${config.data[CT].QUD}</p>
                <p class='babe-response-keypress-header' id = 'reminder'></p>
                </div>`;
    },
    // A generator for the answer container
    answer_container_gen: function (config, CT) {
        return `<div class='babe-view-answer-container babe-response-dropdown'>
                ${config.data[CT].sentence_chunk_1}
                <select id='response1' name='answer_1'>
                    <option disabled selected></option>
                    <option value=${config.data[CT].choice_options_1[0]}>${config.data[CT].choice_options_1[0]}</option>
                    <option value=${config.data[CT].choice_options_1[1]}>${config.data[CT].choice_options_1[1]}</option>
                </select>
                ${config.data[CT].sentence_chunk_2}
                <select id='response2' name='answer_2'>
                    <option disabled selected></option>
                    <option value=${config.data[CT].choice_options_2[0]}>${config.data[CT].choice_options_2[0]}</option>
                    <option value=${config.data[CT].choice_options_2[1]}>${config.data[CT].choice_options_2[1]}</option>
                    <option value=${config.data[CT].choice_options_2[2]}>${config.data[CT].choice_options_2[2]}</option>
                </select>
                ${config.data[CT].sentence_chunk_3}
                </p>
                <button id='next' class='babe-view-button babe-nodisplay'>Next</button>
            </div>`;
    },
    // A generator for the enable response function
    handle_response_function: function (config, CT, babe, answer_container_generator, startingTime) {
        let response1;
        let response2;

        $(".babe-view").append(answer_container_generator(config, CT));

        response1 = $("#response1");
        response2 = $("#response2");

        // flags to check if dropdown menus have been used
        let response_flags = [0, 0];

        const display_button_checker = function(response_number) {
            response_flags[response_number] = 1;
            if (_.min(response_flags) === 1) {
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
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                sentence_frame: config.data[CT].sentence_chunk_1
                    .concat("...")
                    .concat(config.data[CT].sentence_chunk_2)
                    .concat("...")
                    .concat(config.data[CT].sentence_chunk_3),
                response_1: $(response1).val(),
                response_2: $(response2).val(),
                RT: RT
            };

            trial_data = babeUtils.view.save_config_trial_data(config.data[CT], trial_data);

            babe.trial_data.push(trial_data);
            babe.findNextView();
        });
    }

};
