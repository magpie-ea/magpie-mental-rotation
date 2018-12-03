const myEvents = {
    showPopup: function(data, next) {
        window.alert("This is a custom event that hooks after the fixation point is hidden. Are you ready to see the image?")
        next();
    },
    sayHello: function(data, next) {
        jQuery('<h1/>', {
            text: `Hello from the local events!`,
        }).appendTo($('.babe-view'));

        next();
    }
};