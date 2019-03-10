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
}

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
}

// random shuffling of trial information
part_one_trial_info.multi_dropdown = _.shuffle(part_one_trial_info.multi_dropdown)
