var TR = Get("route").route,
    obj;
//A Function to run the chatbot
function chatty(choose, CalledFromSearch) {
    if (CalledFromSearch == true) {
        choose = document.getElementById("option-typer").value.toLowerCase();
    }
    if (choose === 'Utli') {
        append(new TextClass('Utilitys').createClientSide())
        append(new OptionClass(["Form's Link", "Policy PDF", "About Me"], ["chatty('FL')", "chatty('PDF')", "chatty('About_me')"]));
    } else if (choose === 'About_me') {
        append(new TextClass('Under Process...').createBotSide());
        run()
    } else if (choose === 'FL' || choose === "form's link") {
        append(new TextClass("Form's Link").createClientSide())
        append(new OptionClass("Please choose what links you want to acess", ["Exigency reporting form", "Dressing Feedback to Individual", "PYP School Counselor Intervention Form", "Event Feedback form", "Field Trip / Outstation Event Requisition Form", "Event Requisition/Students Calendar Entry Form 2019-20"], ["window.open('https://bit.ly/2TRb5qG');run()", "window.open('https://bit.ly/37wh2NC');run()", "window.open('https://bit.ly/36nKyUp');run()", "window.open('https://bit.ly/3awMWMd');run()", "window.open('https://bit.ly/2Gcm2LB');run()", "window.open('http://bit.ly/3c8YMNi');run()"]));
    } else if (choose === 'PDF' || choose === 'pdf') {
        append(new TextClass('Under Process...').createBotSide());
        run()
    } else if (choose === 'date' || choose === "time" || choose === 'day') {
        append(new TextClass('Date And Time').createClientSide())
        append(new TextClass(new Date()).createBotSide());
        run();
    } else if (choose === 'CL' || choose === 'contact list') {
        append(new TextClass('Contact List').createClientSide());
        window.open('https://bit.ly/2Nl0a4m');
        append(new TextClass('opened Contact List').createBotSide());
        run()
    } else if (choose === "lunch" || choose === 'menu') {
        changeall('#option-typer', 'disabled', true);
        changeall('#option-typer', 'placeholder', 'choose from options above');
        append(new TextClass('Menu').createClientSide());
        append(new OptionClass(['Today', 'This month'], ['finder("Today")', 'finder("Month")']));
        //print2("What do you you want", ["lunch menu","Today's Special"],['menu("menuOfMonth")','menu("todaysSpecial")'])
    } else if (choose === "TS" || choose === "today's special") {
        append(new TextClass("Today's Special").createClientSide());
        finder('TS');
        run();
    } else if (choose === "TR" || choose === "transport route") {
        append(new TextClass("Transport Route").createClientSide());
        //Transport route
        var obj = [];
        for (var i = 0; i != TR.length; i++) {
            obj.push(TR[i]["stopName"]);
        }
        append(new Dropdown(obj));
    } else {
        console.info('The command term ' + choose + ' is not defined')
    }
}