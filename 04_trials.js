// In this file you can specify the trial data for your experiment


const part_one_trial_info = {
    forced_choice: [
        {
            question: "What's on the bread?",
            picture: "images/question_mark_02.png",
            option1: 'jam',
            option2: 'ham'
        },
        {
            question: "What's the weather like?",
            picture: "images/weather.jpg",
            option1: "shiny",
            option2: "rainbow"
        }
    ],
};

const part_two_trial_info = {
    multi_dropdown: [
        {
            sentence_chunk_1: "Some of the",
            sentence_chunk_2: "are",
            sentence_chunk_3: "today.",
            choice_options_1: ["cats", "dogs"],
            choice_options_2: ["happy", "hungry", "sad"]
        },
        {
            sentence_chunk_1: "All of the",
            sentence_chunk_2: "will be",
            sentence_chunk_3: "tomorrow.",
            choice_options_1: ["cats", "dogs"],
            choice_options_2: ["happy", "hungry", "sad"]
        }
    ]
};


const main_trials = {
    dropdownChoice: [
        {
            question_left_part: "Some circles are",
            option1: "red",
            option2: "green",
            canvas: {
                focalColor: 'blue',
                focalShape: 'circle',
                focalNumber: 23,
                otherShape: 'circle',
                otherColor: 'red',
                sort: 'random',
                elemSize: 15,
                total: 30
            }
        },
        {
            question_right_part: "squares are black",
            option1: "all",
            option2: "some",
            canvas: {
                canvasSettings: {
                    background: 'grey'
                },
                focalColor: 'black',
                focalShape: 'square',
                focalNumber: 4,
                otherShape: 'square',
                otherColor: 'white',
                sort: 'random',
                elemSize: 30,
                total: 10
            }
        },
        {
            question_left_part: "All",
            question_right_part: "in the picture are blue",
            option1: "circles",
            option2: "triangles",
            canvas: {
                focalColor: 'red',
                focalShape: 'circle',
                focalNumber: 8,
                otherShape: 'triangle',
                otherColor: 'blue',
                sort: 'split_grid',
                start_with: 'other',
                rows: 2,
                direction: 'side_row',
                elemSize: 30,
                total: 16
            }
        }
    ],
    textboxInput: [
        {
            QUD: 'Press SPACE when you finish looking at the image.',
            picture: "images/question_mark_02.png",
            question: "How are you today?"
        },
        {
            QUD: 'Press SPACE when you finish looking at the image.',
            picture: "images/question_mark_01.png",
            question: "What's the weather like?",
            min_chars: 30
        }
    ],
    sliderRating: [
        {
            picture: "images/question_mark_02.png",
            question: "How are you today?",
            optionLeft: "fine",
            optionRight: "great"
        },
        {
            picture: "images/question_mark_01.png",
            question: "What's the weather like?",
            optionLeft: "shiny",
            optionRight: "rainbow"
        },
        {
            QUD: "Here is a sentence that stays on the screen from the very beginning",
            picture: "images/question_mark_03.jpg",
            question: "What's on the bread?",
            optionLeft: "ham",
            optionRight: "jam"
        }
    ],
    sentenceChoice: [
        {
            QUD: "sentence selection - loop: 1, trial: 1",
            picture: "images/question_mark_02.png",
            question: "What's on the bread?",
            option1: "ham",
            option2: "jam"
        },
        {
            QUD: "sentence selection - loop: 1, trial: 2",
            question: "What's the weather like?",
            option1: "rainbow",
            option2: "shiny"
        },
        {
            QUD: "sentence selection - loop: 2, trial: 1",
            picture: "images/question_mark_01.png",
            question: "How are you today?",
            option1: "fine",
            option2: "great"
        },
        {
            QUD: "sentence selection - loop: 2, trial: 2",
            question: "Jam or Ham?",
            option1: "ham",
            option2: "jam"
        }
    ],
    ratingScale: [
        {
            QUD: 'Press SPACE when you finish looking at the image.',
            picture: "images/question_mark_02.png",
            question: "Today I feel",
            optionLeft: "fine",
            optionRight: "great"
        },
        {
            QUD: 'Press SPACE when you finish looking at the image.',
            optionLeft: "shiny",
            optionRight: "rainbow",
            picture: "images/question_mark_02.png"
        }
    ],
    imageSelection: [
        {
            QUD: "image selection - loop: 1, trial: 1",
            question: "How are you today?",
            option1: "fine",
            picture1: "images/question_mark_02.png",
            option2: "great",
            picture2: "images/question_mark_01.png"
        },
        {
            QUD: "image selection - loop: 1, trial: 2",
            option1: "shiny",
            picture1: "images/question_mark_03.jpg",
            option2: "rainbow",
            picture2: "images/question_mark_04.png"
        },
        {
            QUD: "image selection - loop: 2, trial: 1",
            question: "How are you today?",
            option1: "fine",
            picture1: "images/question_mark_03.jpg",
            option2: "great",
            picture2: "images/question_mark_01.png"
        },
        {
            QUD: "image selection - loop: 2, trial: 2",
            option1: "shiny",
            picture1: "images/question_mark_02.png",
            option2: "rainbow",
            picture2: "images/question_mark_04.png"
        }
    ],
    spr: [
        {
            question: "Does the sentence correctly describe the image?",
            sentence: "all | the squares | are | red | the in the picture.",
            option1: "Yes",
            option2: "No",
            canvas: {
                focalColor: 'blue',
                focalShape: 'circle',
                focalNumber: 13,
                otherShape: 'square',
                otherColor: 'red',
                sort: 'random',
                elemSize: 20,
                total: 30
            }
        },
        {
            question: "Does the sentence correctly describe the image?",
            sentence: "all | the triangles | are | green | in the picture.",
            option1: "Yes",
            helpText: 'Press Space (this text can be set)',
            option2: "No",
            canvas: {
                focalColor: 'green',
                focalShape: 'triangle',
                focalNumber: 10,
                otherShape: 'square',
                otherColor: 'green',
                sort: 'random',
                elemSize: 30,
                total: 30
            }
        },
        {
            question: "Does the sentence correctly describe the image?",
            sentence: "some | squares | are | red | in the picture.",
            option1: "Yes",
            helpText: 'Press Space (this text can be changed)',
            option2: "No",
            canvas: {
                focalColor: 'green',
                focalShape: 'square',
                focalNumber: 35,
                otherShape: 'square',
                otherColor: 'red',
                sort: 'random',
                elemSize: 20,
                total: 40
            }
        },
        {
            QUD: "You can have some text here",
            question: "Does the sentence correctly describe the image?",
            sentence: "some | squares | are | red | in the picture.",
            option1: "Yes",
            option2: "No",
            canvas: {
                focalColor: 'green',
                focalShape: 'square',
                focalNumber: 5,
                otherShape: 'circle',
                otherColor: 'red',
                sort: 'random',
                elemSize: 40,
                total: 10
            }
        },
    ],
    spr_rs: [
        {
            sentence: "Today | I | feel | great.",
            optionLeft: "Yes",
            picture: "images/question_mark_02.png",
            optionRight: "No"
        },
        {
            sentence: "The weather | is | shiny | today.",
            optionLeft: "True",
            optionRight: "False",
            picture2: "images/question_mark_01.png"
        }
    ],
};