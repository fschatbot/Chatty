var tempconfig = {
    returnobj: false, // Boolean
    back: false, // Boolean
    Type: "Normal", // Normal || Button || List
    side: "client", // client || bot
    Message: "This is a test message", // String
    Options: {} // {Dispay:Behind the hood function}
}
var dlist = {
    "Menu": "chatty('lunch')",
    "Today's Special": "chatty('TS')",
    "Transport Route": "chatty('TR')",
    "Date and Time": "chatty('date')",
    "Contact List/ Intercom": "chatty('CL')",
    "Utilities": "chatty('Utli')"
}
//Main Function to create Class
const boxes = (tconfig) => {
    var config = {
        returnobj: tconfig.returnobj || false,
        back: tconfig.back || false,
        Type: tconfig.Type || "Normal",
        side: tconfig.side || "client",
        Message: tconfig.Message || "This is a test message",
        Options: tconfig.Options || {}
    }
    //creating a default container depending on the side and also adding message in it
    var container = document.createElement('div');
    container.setAttribute('back', config.back)
    var img = document.createElement("img");
    img.setAttribute("alt", "Avatar");
    if (config.side == 'client') {
        container.setAttribute("class", `container darker`);
        img.setAttribute("src", `img/user.png`);
    } else if (config.side == 'bot') {
        container.setAttribute("class", `container`);
        img.setAttribute("src", `img/Bot.jpg`);
    }
    container.appendChild(img);
    var message = document.createElement("p");
    message.innerHTML = config.Message.replaceAll('\n','<br>');
    container.appendChild(message);
    // Creating Respective Stuff According to Button / List
    if (config.Type == 'Button') {
        for (const key in config.Options) {
            var btn = document.createElement("button");
            btn.innerHTML = key;
            btn.setAttribute("onclick", config.Options[key]);
            btn.setAttribute("class", "Button");
            container.appendChild(btn);
        }
    } else if (config.Type == 'List') {
        var search = document.createElement('input');
        search.setAttribute('id', 'myInput');
        search.setAttribute('onkeyup', 'filterFunction();');
        search.setAttribute('placeholder', 'Search..');
        container.appendChild(search);
        var form = document.createElement('div');
        form.setAttribute('class', 'dropdown-content')
        for (const key in config.Options) {
            var options = document.createElement('a');
            options.setAttribute('onclick', config.Options[key])
            options.innerHTML = key;
            form.appendChild(options)
        }
        container.appendChild(form);
    }
    //Adding the back button
    if (config.back) {
        var back = document.createElement('button');
        back.innerHTML = 'Go Back';
        back.setAttribute('onclick', 'back()')
        back.setAttribute('Class', 'btn btn-primary btn-jelly');
        container.appendChild(back);
    }
    //checking on what to do with the final container when created
    if (config.returnobj) {     
    //printing the config for debugging
    console.log(config)
        return container;
    } else {
        changeall('.Button', 'disabled', true);
        changeall('.Button', 'class', 'disable');
        changeall('#myInput', 'disabled', true);
        document.getElementById('Textbox').appendChild(container);
        container.scrollIntoView({behavior: "smooth"})
    }
}

const filterFunction = () => {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName('dropdown-content')[0]
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().search(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}