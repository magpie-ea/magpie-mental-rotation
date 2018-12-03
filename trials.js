const practice_trials = {
    forcedChoice: [
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
}

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
            picture: "images/question_mark_02.png",
            question: "Today I feel",
            optionLeft: "fine",
            optionRight: "great"
        },
        {
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
    keyPress: [
        {
            picture: "images/question_mark_02.png",
            key1: "f",
            key2: "j",
            f: "fine",
            j: "great",
            expected: "great"
        },
        {
            key1: "f",
            key2: "j",
            f: "squares",
            j: "circles",
            expected: "circles",
            question: "What's on the picture?",
            canvas: {
                focalColor: 'blue',
                focalShape: 'circle',
                focalNumber: 5,
                otherShape: 'circle',
                otherColor: 'red',
                sort: 'random',
                elemSize: 30,
                total: 15
            }
        }
    ],
    spr: [
        {
            QUD: "Johnny says: 'I want you to bring me the box where ...",
            question: "Should you bring Johnny this box or not?",
            help_text: 'SPACEEEE',
            sentence: "all | of the | yellow marbles | are | inside | the case.'",
            picture: "images/all-false3.png",
            option1: "Bring it",
            option2: "Leave it"
        },
        {
            QUD: "Johnny says: 'I want you to bring me the box where ...",
            sentence: "some | of the | black marbles | are | inside | the case.'",
            option1: "Bring it",
            helpText: 'Press Space',
            option2: "Leave it"
        },
        {
            QUD: "Johnny says:: 'I want you to bring me the box where ...",
            sentence: "some | of the | black marbles | are | inside | the case.'",
            option1: "Bring it",
            picture: "images/all-false3.png",
            option2: "Leave it"
        },
        {
            question: "Should you bring Johnny this box or not?",
            QUD: "Johnny says: 'I want you to bring me the box where ...",
            sentence: "some | of the | yellow marbles | are | inside | the case.'",
            option1: "Bring it",
            option2: "Leave it",
            canvas: {
                focalColor: 'black',
                focalShape: 'circle',
                focalNumber: 13,
                otherShape: 'square',
                otherColor: 'red',
                sort: 'random',
                elemSize: 30,
                total: 20
            }
        }
    ],
    spr_rs: [
        {
            QUD: "cjdbvhdfjsays: 'I want you to bring me the box where ...",
            sentence: "some | of the | black marbles | are | inside | the case.'",
            optionLeft: "Bring it",
            picture: "images/all-false3.png",
            optionRight: "Leave it"
        },
        {
            question: "Should you bring Johnny this box or not?",
            QUD: "Johnny says: 'I want you to bring me the box where ...",
            sentence: "some | of the | yellow marbles | are | inside | the case.'",
            optionLeft: "Bring it",
            optionRight: "Leave it",
            canvas: {
                focalColor: 'black',
                focalShape: 'circle',
                focalNumber: 23,
                otherShape: 'square',
                otherColor: 'red',
                sort: 'random',
                elemSize: 30,
                total: 20
            }
        },
        {
            question: "Should you bring Johnny this box or not?",
            QUD: "Johnny says: 'I want you to bring me the box where ...",
            sentence: "all | of the | black marbles | are | inside | the case.'",
            option1: "Bring it",
            option2: "Leave it",
            picture: "images/all-unbias3.png"
        }
    ],
}