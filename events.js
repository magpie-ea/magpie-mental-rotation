const myEvents = {
    sayHello: function(data, next) {
        console.log(data);

        window.alert("Hello from the local events! I come after the fixation point hides")

        next();
    }
};