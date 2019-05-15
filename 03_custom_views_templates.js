// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the babe-object as input
// and has to call babe.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call babe.trial_data.push(trial_data) to save the trial information

// In this view the user can click on one of two buttons
const custom_press_a_button = function(config) {
    const view = {
        name: config.name,
        CT: 0,
        trials: config.trials,
        // The render functions gets the babe object as well as the current trial in view counter as input
        render: function (CT, babe) {
            // Here, you can do whatever you want, eventually you should call babe.findNextView()
            // to proceed to the next view and if it is an trial type view,
            // you should save the trial information with babe.trial_data.push(trial_data)

            // Normally, you want to display some kind of html, to do this you append your html to the main element
            // You could use one of our predefined html-templates, with (babe.)stimulus_container_generators["<view_name>"](config, CT)
            $("main").html(`<div class='babe-view'>
                <h1 class='babe-view-title'>Click on one of the buttons!</h1>
                <button id="first" class='babe-view-button'>First Button</button>
                <button id="second" class='babe-view-button'>Second Button</button>
                </div>`);

            // This function will handle  the response
            const handle_click = function(e) {
                // We will just save the response and continue to the next view
                let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    response: e.target.id
                };
                // Often it makes sense to also save the config information
                // trial_data = babeUtils.view.save_config_trial_data(config.data[CT], trial_data);

                // Here, we save the trial_data
                babe.trial_data.push(trial_data);

                // Now, we will continue with the next view
                babe.findNextView();
            };

            // We will add the handle_click functions to both buttons
            $('#first').on("click", handle_click);
            $('#second').on("click", handle_click);

            // That's everything for this view
        }
    };
    // We have to return the view, so that it can be used in 05_views.js
    return view;
};

// In this view, every trial will loop until the correct button is pressed
const custom_press_correct_button = function(config) {
    const view = {
        name: config.name,
        CT: 0,
        trials: config.trials,
        // The render functions gets the babe object as well as the current trial in view counter as input
        render: function (CT, babe) {
            // In this view, we will loop every trial until the correct response is made
            const loop_trial = function(times){
                $("main").html(`<div class='babe-view'>
                <h1 class='babe-view-title'>Click on one of the buttons!</h1>
                <section class="babe-text-container">
                        <p class="babe-view-text">You already tried ${times} times!</p>
                    </section>
                <button id="first" class='babe-view-button'>First Button</button>
                <button id="second" class='babe-view-button'>Second Button</button>
                </div>`);


                // This function will handle  the response
                const handle_click = function(e) {

                    // We will check if the correct button is clicked, if yes, we will save the response and continue
                    // Otherwise we will redo the trial
                    if (e.target.id === config.data[CT].target){
                        // We will just save the response and continue to the next view
                        let trial_data = {
                            trial_name: config.name,
                            trial_number: CT + 1,
                            response: e.target.id,
                            // How long did it take?
                            repetitions: times
                        };
                        // Often it makes sense to also save the config information
                        // trial_data = babeUtils.view.save_config_trial_data(config.data[CT], trial_data);

                        // Here, we save the trial_data
                        babe.trial_data.push(trial_data);

                        // Now, we will continue with the next view
                        babe.findNextView();
                    } else {
                        // Redo the trial
                        loop_trial(times+1);
                    }

                };

                // We will add the handle_click functions to both buttons
                $('#first').on("click", handle_click);
                $('#second').on("click", handle_click);

                // You could make use of the TrialDOM (including trial life cycles and hooks)
                // See here fore more details:
                // https://babe-project.github.io/babe-docs/01_designing_experiments/04_lifecycles_hooks/
                // babeUtils.view.createTrialDOM(...);
            };

            // We have to start the first loop of this trial
            loop_trial(0);

        }
    };
    // We have to return the view, so that it can be used in 05_views.js
    return view;
};


