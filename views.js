/** OTV (babe's Other Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string

* All about the properties of OTV views - https://github.com/babe-project/babe-project/blob/master/docs/views.md#properties-of-otv

*/

// welcomes the participant
const intro = babeViews.intro({
    trials: 1,
    name: 'intro',
    text:   `This is a sample introduction view.
            <br />
            <br />
            The introduction view welcomes the participant and gives general information
            about the experiment.
            <br />
            <br />
            This template is a showcase of the functionality of babe.`,
    buttonText: 'begin the experiment'
});

// gives instructions about the experiment
const instructions = babeViews.instructions({
    trials: 1,
    name: 'instrucions',
    title: 'General Instructions',
    text:  `This is a sample instructions view.
            <br />
            <br />
            First you will go through a pracice trial session which consists of two trials.
            The practice trial view uses babe's <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_fc.png'>forced choice trial view</a>.
            <br />
            <br />
            All the views that you see in this template are initialised in 'views.js'. The trial data in can be found in 'trials.js'`,
    buttonText: 'to the practice trial'
});

// warns the real experiment will begin
const instructionsCanvas = babeViews.begin({
    trials: 1,
    name: 'instructions_canvas',
    title: 'Generate shapes',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see a sample of a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_dc.png'>dropwon choice view</a>
            with 3 trials that has a picture of shapes created with <a href='https://github.com/babe-project/babe-project/blob/master/docs/canvas.md'>babe canvas</a>
            <br />
            <br />`,
    buttonText: 'Start the experiment'
});

// warns the real experiment will begin
const instructionsLoop = babeViews.instructions({
    trials: 1,
    name: 'instructions_loop',
    title: 'Loop through the views',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see a sample of looping through <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_ss.png'>sentence choice</a>
            and <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_ss.png'>image seleciton</a> views twice.
            <br />
            <br />`,
    buttonText: 'Start the loop sample'
});

// warns the real experiment will begin
const instructionsProcedure = babeViews.instructions({
    trials: 1,
    name: 'instructions_procedure',
    title: 'TTV procedure',
    text:   `This is another instructions view.
            <br />
            <br />
            All the TTV so far showed the stimulus (if there were such), the question and expected the response from the participant at the moment of creation.
            However, there is also an option to have a <b>pause</b> before the TTV shows, to <b>hide the stimulus</b> after certain amount of time and to have a <b>fixation point</b>
            in the middle of the screen before the stimulus appears.
            <br />
            <br />
            Next you will see a slider rating task
            that has a pause, fixation point and a hiding stimulus
            <br />
            and a textbox input task
            that hides the stimulus on SPACE.`,
    buttonText: 'Start TTV procedure sample'
});

// warns the real experiment will begin
const instructionsHooks = babeViews.instructions({
    trials: 1,
    name: 'instructions_hooks',
    title: 'Hooks and Custom Events',
    text:   `This is another instructions view.
            <br />
            <br />
            So far all the TTV ran functions that came with the babe package. However, there
            is also an option to use custom events (defined by you) and hook them
            to a TTV.
            <br />
            <br />
            Next you will see a sample of a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_rc.png'>Rating Scale task</a>
            that uses a custom event to tell the participant how they answered after the interactions with the view are enabled.
            <br />
            <br />
            <a href='https://github.com/babe-project/babe-project/blob/master/docs/hooks.md'>babe hooks</a>`,
    buttonText: 'Start hooks sample'
});

// warns the real experiment will begin
const instructionsProgressbar = babeViews.instructions({
    trials: 1,
    name: 'instructions_pb',
    title: 'Progres Bar',
    text:   `This is another instructions view.
            <br />
            <br />
            You can <a href='https://github.com/babe-project/babe-project#progress-bar'>
            use a progress bar</a> in your experiment with a simple configuration.
            <br />
            <br />
            Next you will see a sample Key Press task with progress bars in the top right corner.`,
    buttonText: 'Start progress bar sample'
});


// warns the real experiment will begin
const instructionsSPR = babeViews.instructions({
    trials: 1,
    name: 'instructions_spr',
    title: 'Self-paced reading tasks',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see two sample Self-paced reading task
            <br />
            1. self-paced reading with forced choice response field.
            <br />
            2. self-paced reading with rating scale response field.`,
    buttonText: 'Start the SPR tasks'
});

// the post questionnaire can be translated
const postTest = babeViews.postTest({
    trials: 1,
    name: 'post_test',
    title: 'Weitere Angaben',
    text: 'Die Beantwortung der folgenden Fragen ist optional, aber es kann bei der Auswirkung hilfreich sein, damit wir Ihre Antowrten besser verstehen.',
    buttonText: 'Weiter',
    age_question: 'Alter',
    gender_question: 'Geschlecht',
    gender_male: 'männlich',
    gender_female: 'weiblich',
    edu_question: 'Höchster Bildungsabschluss',
    edu_graduated_high_school: 'Abitur',
    edu_graduated_college: 'Hochschulabschluss',
    edu_higher_degree: 'Universitärer Abschluss',
    languages_question: 'Muttersprache',
    languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    comments_question: 'Weitere Kommentare'
});

// submits the results
const thanks = babeViews.thanks({
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** TTV (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string
    - trial_type: string - the name of the trial type as you want it to appear in the submitted data
    - data: array - an array of trial objects


* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
        More about TTV procedure - https://github.com/babe-project/babe-project/blob/master/docs/canvas.md

    - hook: object - option to hook and add custom functions to the view   
        More about hooks - https://github.com/babe-project/babe-project/blob/master/docs/hooks.md

* All about the properties of TTV - https://github.com/babe-project/babe-project/blob/master/docs/views.md#properties-of-ttv

*/

// part of the practice sample
const practiceForcedChoice = babeViews.forcedChoice({
    trials: 2,
    name: 'practice_trial',
    trial_type: 'forced_choice_practice',
    data: practice_trials.forcedChoice
});

// this view is part of the canvas sample
const dropdownChoice = babeViews.dropdownChoice({
    trials: 3,
    name: 'dropdown_choice',
    trial_type: 'dropdown_choice_main',
    data: main_trials.dropdownChoice
});

// this view is part of the loop sample
const sentenceChoice = babeViews.sentenceChoice({
    trials: 2,
    name: 'sentence_selection',
    trial_type: 'sentence_selection_main',
    data: main_trials.sentenceChoice
});

// this view is part of the loop sample
const imageSelection = babeViews.imageSelection({
    trials: 2,
    name: 'image_selection',
    trial_type: 'image_selection_main',
    data: main_trials.imageSelection
});

const textboxInput = babeViews.textboxInput({
    trials: 2,
    name: 'textbox_input',
    trial_type: 'textbox_input_main',
    data: main_trials.textboxInput,
    stim_duration: 'space'
});

// part of the TTV flow sample
const sliderRating = babeViews.sliderRating({
    trials: 3,
    name: 'slider_rating',
    trial_type: 'slider_rating_main',
    data: main_trials.sliderRating,
    pause: 500,
    fix_duration: 1000,
    stim_duration: 1500
});

// part of the hooks and custom events sample
const ratingScale = babeViews.ratingScale({
    trials: 2,
    name: 'rating_scale',
    trial_type: 'rating_scale_main',
    data: main_trials.ratingScale,
    pause: 500,
    fix_duration: 1000,
    stim_duration: 1000,
    hook: {
        after_fix_point: myEvents.sayHello
    }
});

const keyPress = babeViews.keyPress({
    trials: 4,
    name: 'key_press',
    trial_type: 'key_press_main',
    data: main_trials.keyPress,
});

const spr = babeViews.selfPacedReading({
    trials: 4,
    name: 'spr',
    trial_type: 'spr_main',
    data: main_trials.spr
});

const sprRatingScale = babeViews.selfPacedReading_ratingScale({
    trials: 2,
    name: 'spr_rs',
    trial_type: 'spr_rs_main',
    data: main_trials.spr_rs,
});