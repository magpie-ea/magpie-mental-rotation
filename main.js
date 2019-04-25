// initialises a babe experiment with babeInit
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };

    // calls babeInit
    // in debug mode this returns the babe-object, which you can access in the console of your browser
    // in all other modes null will be returned
    window.babe_monitor = babeInit({
        views_seq: [
            intro,
            instructions,
            task_one_2AFC,
            task_two_sentence_completion,
            instructionsPostTest,
            post_test,
            thanks,
        ],
        deploy: {
            experimentID: "INSERT_A_NUMBER",
            serverAppURL: "https://babe-demo.herokuapp.com/api/submit_experiment/",
            deployMethod: "debug",
            contact_email: "YOUREMAIL@wherelifeisgreat.you",
            prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
        },
        progress_bar: {
            in: [
                // list the view-names of the views for which you want a progress bar
                task_one_2AFC.name,
                task_two_sentence_completion.name
            ],
            style: "separate",
            width: 100
        }
    });
});
