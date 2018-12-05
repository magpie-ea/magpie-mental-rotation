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