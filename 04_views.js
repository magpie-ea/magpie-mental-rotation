// In this file you can instantiate your views
// First instantiate your wrapping views, then you can instantiate your trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

* More about the properties and functions of the wrapping views - https://github.com/babe-project/babe-project/blob/master/docs/views.md#wrapping-views-properties

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = babeViews.intro({
    trials: 1,
    name: 'intro',
    // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
    text:   `This is a sample introduction view.
            <br />
            <br />
            The introduction view welcomes the participant and gives general information
            about the experiment. You are in the <strong>${coin}</strong> group.
            <br />
            <br />
            This is a minimal experiment with two views, one template, one custom made. It can serve as a starting point for programming your own experiment.`,
   buttonText: 'Begin the experiment'    
});

// For most tasks, you need instructions views
const instructions = babeViews.instructions({
    trials: 1,
    name: 'instrucions',
    title: 'General Instructions',
    text:  `This is a sample instructions view.
            <br />
            <br />
            Tell your participants what they are to do here.`,
    buttonText: 'go to trials'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = babeViews.postTest({
    trials: 1,
    name: 'post_test',
    title: 'Additional information',
    text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

    // You can change much of what appears here, e.g., to present it in a different language, as follows:
    // buttonText: 'Weiter',
    // age_question: 'Alter',
    // gender_question: 'Geschlecht',
    // gender_male: 'männlich',
    // gender_female: 'weiblich',
    // gender_other: 'divers',
    // edu_question: 'Höchster Bildungsabschluss',
    // edu_graduated_high_school: 'Abitur',
    // edu_graduated_college: 'Hochschulabschluss',
    // edu_higher_degree: 'Universitärer Abschluss',
    // languages_question: 'Muttersprache',
    // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = babeViews.thanks({
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** trial (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _babe (e.g. for use with a progress bar)
    - trial_type: string - the name of the trial type as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
        More about trial life cycle - https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-lifecycle

    - hook: object - option to hook and add custom functions to the view
        More about hooks - https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-hooks

* All about the properties of trial - https://github.com/babe-project/babe-project/blob/master/docs/views.md#properties-of-trial
*/


// Here, we initialize a forcedChoice view
const forced_choice_2A = babeViews.forcedChoice({
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: part_one_trial_info.forced_choice.length, 
    // name and trial_type should be identical to the variable name
    name: 'forced_choice_2A',
    trial_type: 'forced_choice_2A',
    data: part_one_trial_info.forced_choice
});

// Here, we initialize a keyPress task
const key_press = babeViews.keyPress({
    trials: 2,
    name: 'key_press',
    trial_type: 'key_press',
    // We can also make use of the trial life cycles, e.g. to introduce a blank screen and a fixation point
    pause: 1000,
    fix_duration: 1500,
    // It is also possiblle, to define the trial data here, but this quickly gets confusing
    // The trial data is an array and every entry is an object with all necessary information for one trial
    data: [{key1: "f",
           key2: "j",
           f: "circle",
           j: "square",
           expected: "circle",
           // You can make use of our canvas API to create some stimuli
           canvas: {
               focalColor: 'blue',
               focalShape: 'circle',
               focalNumber: 1,
               sort: 'random',
               elemSize: 100,
               total: 1
          }},
       {key1: "f",
           key2: "j",
           f: "circle",
           j: "square",
           expected: "circle",
           canvas: {
               focalColor: 'yellow',
               focalShape: 'square',
               focalNumber: 10,
               sort: 'random',
               elemSize: 30,
               total: 10
          }}]
});

// There are many more templates available: 
// forcedChoice, sliderRating, dropdownChoice, testboxInput, ratingScale, imageSelection, sentenceChoice, keyPress, selfPacedReading and selfPacedReading_ratingScale

// If the provided templates are not enough, we can just create custom view templates in 02_custom_views_templates.js and use them here
// Here, we initialize our multi-dropdown custom view
const sentence_completion = custom_views.multiple_dropdown({
    trials: part_two_trial_info.multi_dropdown.length,
    title: "Complete the sentence",
    QUD: "Choose one option for each missing word in this sentence.",
    name: 'sentence_completion',
    trial_type: 'sentence_completion',
    // You can also randomize (shuffle) the trials of a view
    data: _.shuffle(part_two_trial_info.multi_dropdown),
    // There is the possibility to add hooks after different events in the trials life cycle
    // after_pause, after_fix_point, after_stim_shown, after_stim_hidden, after_response_enabled
    hook: {after_response_enabled: time_limit}
});



