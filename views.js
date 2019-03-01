/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

* More about the properties and functions of the wrapping views - https://github.com/babe-project/babe-project/blob/master/docs/views.md#wrapping-views-properties

*/

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
            This mock up experiment is a showcase of the functionality of babe.`,
    buttonText: 'begin the experiment'
});

const instructions = babeViews.instructions({
    trials: 1,
    name: 'instrucions',
    title: 'General Instructions',
    text:  `This is a sample instructions view.
            <br />
            <br />
            First you will go through two practice trials.
            The practice trial view uses babe's <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_fc.png'>forced choice trial view</a>.`,
    buttonText: 'to the practice trial'
});

const instructionsCanvas = babeViews.begin({
    trials: 1,
    name: 'instructions_canvas',
    title: 'Generate Shapes',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see a sample of a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_dc.png'>dropdown choice view</a>
            with 3 trials that have pictures of shapes created with <a href='https://github.com/babe-project/babe-project/blob/master/docs/canvas.md'>babe canvas</a>.
            <br />
            <br />`,
    buttonText: 'Start the experiment'
});

const instructionsLoop = babeViews.instructions({
    trials: 1,
    name: 'instructions_loop',
    title: 'Loop through several views',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see a sample of looping through <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_ss.png'>sentence choice</a>
            and <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_ss.png'>image seleciton</a> task twice.
            <br />
            <br />`,
    buttonText: 'Start the loop sample'
});

const instructionsLifecycle = babeViews.instructions({
    trials: 1,
    name: 'instructions_lifecycle',
    title: 'Trial Life Cycle',
    text:   `This is another instructions view.
            <br />
            <br />
            All the views so far showed the stimulus (if there was such), the question and expected a response at the moment of creation.
            However, in the background all trial views in babe, go through a life cycle with the following stages:
            <br />
            <br />
            <b>pause</b>
            <br />
            <b>fixation point</b>
            <br />
            <b>stimulus shown</b>
            <br />
            <b>stimulus hidden (or not)</b>
            <br />
            <b>interactions enabled</b>
            <br />
            <br />
            The views that you saw so far also went through these steps using the default life cycle settings and everything in the trial views was shown at once.
            <br />
            <br />
            Next you will see a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_sr.png'>Slider Rating task</a>
            that has a pause of 500 ms, fixation point of 1000 ms and the stimulus appears on the screen for 1500 ms. After the stimulus hides, the response
            form appears and the participant can answer the question.
            <br />
            <br />
            After the rating scale task you will see a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_ti.png'>Textbox Input task</a>
            that has a pause of 500 ms and a stimulus that hides when 'SPACE' is pressed.`,
    buttonText: 'Start trial life cycle sample'
});

const instructionsHooks = babeViews.instructions({
    trials: 1,
    name: 'instructions_hooks',
    title: 'Hooks and Local Functions',
    text:   `This is another instructions view.
            <br />
            <br />
            So far all the trial views called functions that came with the babe package. However, there
            is also an option to use local functions (defined by you) and hook them
            to a trial view.
            <br />
            <br />
            Next you will see a sample of a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_rc.png'>Rating Scale task</a>
            that uses a locally defined function to tell the participant how long they looked at the stimulus.
            <br />
            <br />
            First, a function is hooked after the stimulus appears to timestamp the time the stimulus appears.
            <br />
            <br />
            Then, a function is hooked after the stimulus hides to record the time when the stimulus disappears, calculate the time spent and
            show the participant the calculation.`,
    buttonText: 'Start hooks sample'
});

// warns the real experiment will begin
const instructionsProgressBar = babeViews.instructions({
    trials: 1,
    name: 'instructions_progress_bar',
    title: 'Self-paced reading tasks with a Progress Bar',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see two examples of a Self-Paced Reading task
            <br />
            1. <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md#self-paced-reading-with-forced-choice-response'>
            Self-Paced Reading with Forced Choice response task</a>
            <br />
            2. <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md#self-paced-reading-task-with-rating-scale-response'>
            Self-Paced Reading with Rating Scale task</a>
            <br />
            <br />
            The trial views have a progress bar in the top right corner of the screen. You can <a href='https://github.com/babe-project/babe-project#progress-bar'>
            use a progress bar</a> in your experiment with a simple configuration.`,
    buttonText: 'Start the SPR tasks'
});

const instructionsExperiment = babeViews.instructions({
    trials: 1,
    name: 'instructions_experiment',
    title: 'Key Press',
    text:   `This is another instructions view.
            <br />
            <br />
            Next you will see a small <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_kp.png'>Key Press task</a> experiment sample.
            <br />
            <br />
            The experiment will start with practice trials, followed by a view informing the participant when the practice is finished followed by
            another Key Press task functioning as the 'real' main trial.
            <br />
            <br />
            On the screen you will see a square or a circle on a random position (generated with babe's canvas). Your task is to press:
            <br />
            <br />
            <b>F</b> for <b>circle</b>
            <br />
            <b>J</b> for <b>square</b>`,
    buttonText: 'Start the key press task'
});

const beginRealKeyPress = babeViews.begin({
    trials: 1,
    name: 'begin_key_press',
    title: 'Begin the real experiment',
    text: 'This was the practice trial for the key press task. Now the real experiment will begin.',
    buttonText: 'Begin'
});

const instructionsPostTest = babeViews.instructions({
    trials: 1,
    name: 'instructions_post_test',
    title: 'Post Questionnaire',
    text: `Next you will see a sample <a href='/'>Post Test view</a>. 
    The default questions and answer options are in English, however, the whole questionnaire can be translated. In the following Post Test
    sample the questions are in German.`
});

// the post questionnaire can be translated
const postTest = babeViews.postTest({
    trials: 1,
    name: 'post_test',
    title: 'Weitere Angaben',
    text: 'Die Beantwortung der folgenden Fragen ist optional, aber es kann bei der Auswertung hilfreich sein, damit wir Ihre Antworten besser verstehen.',
    buttonText: 'Weiter',
    age_question: 'Alter',
    gender_question: 'Geschlecht',
    gender_male: 'männlich',
    gender_female: 'weiblich',
    gender_other: 'divers',
    edu_question: 'Höchster Bildungsabschluss',
    edu_graduated_high_school: 'Abitur',
    edu_graduated_college: 'Hochschulabschluss',
    edu_higher_degree: 'Universitärer Abschluss',
    languages_question: 'Muttersprache',
    languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    comments_question: 'Weitere Kommentare'
});

const links = babeViews.instructions({
    trials: 1,
    name: 'links',
    title: 'Further information',
    text: `This was a short presentation of babe's funcionality.
        <br />
        <br />
        This sample's file organisation:
        <br />
        <b>views.js</b> - all the views are created here.
        <br />
        <b>trials.js</b> - contains the trial information used in the trial views.
        <br />
        <b>events.js</b> - the local functions are created here.
        <br />
        <b>main.js</b> - the experiment is initialized here.
        <br />
        <br />
        Babe's documentation:
        <br />
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md'>all about the views</a>
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/canvas.md'>babe canvas</a>
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-lifecycle'>view life cycle</a>
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-hooks'>hooks</a>
        <br />
        <a href='/'>loops</a>
        <br />
        <a href='https://github.com/babe-project/babe-project#progress-bar'>progress bars</a>
        <br />
        <br />
        This sample ran in Debug mode. Next you will see a results table with your answers.`
})

// submits the results
const thanks = babeViews.thanks({
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** trial (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string
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
    pause: 500,
    stim_duration: 'space'
});

// part of the trial flow sample
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
    fix_duration: 500,
    stim_duration: 'space',
    hook: {
        after_stim_shown: myEvents.timeShown,
        after_stim_hidden: myEvents.timeHidden
    }
});

const keyPressPractice = babeViews.keyPress({
    trials: 3,
    name: 'key_press',
    trial_type: 'key_press_practice',
    data: main_trials.keyPress.practice,
});

const keyPressMain = babeViews.keyPress({
    trials: 5,
    name: 'key_press',
    trial_type: 'key_press_main',
    data: main_trials.keyPress.main,
});

const spr = babeViews.selfPacedReading({
    trials: 4,
    name: 'spr',
    trial_type: 'spr_main',
    data: main_trials.spr,
    pause: 300,
    fix_duration: 500,
    stim_duration: 1000
});

const sprRatingScale = babeViews.selfPacedReading_ratingScale({
    trials: 2,
    name: 'spr_rating_scale',
    trial_type: 'spr_rs_main',
    data: main_trials.spr_rs,
});
