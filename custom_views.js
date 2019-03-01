const sayHello = function(config) {
    const _sayHello = {
        name: config.name,
        title: config.title,
        render(CT, babe) {
            const viewTemplate =
                  `<div class='view'>
                <h1 class="title">${this.title}</h1>
                <button id="hello-button">Hello back!</button>
            </div>`;

            $("#main").html(viewTemplate);

            $('#hello-button').on('click', function(e) {
                babe.findNextView();
            });
        },
        CT: 0,
        trials: config.trials
    };

    return _sayHello;
};

const hello = sayHello({
    name: 'buttonPress',
    title: 'Hello!?',
    trials: 1
});
