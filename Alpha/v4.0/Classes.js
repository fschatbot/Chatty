//This is an example config for the boxes function
var tempconfig = {
    returnobj: false, // Boolean
    back: false, // Boolean
    Type: "Normal", // Normal || Button || List
    isClient: true, // Boolean
    Message: "This is a test message", // String
    Options: {} // {Dispay:Behind the hood function}
}
var dlist = {
    "Menu": "chatty('lunch')",
    "Today's Special": `finder("Today's Special");`,
    "Transport Route": "chatty('TR')",
    "Date and Time": "chatty('date')",
    "Contact List/ Intercom": "chatty('CL')",
    "Utilities": "chatty('Utli')"
}
//Main Function to create Class
const boxes = (tconfig) => {
    const config = {
        returnobj: tconfig.returnobj || false,
        back: tconfig.back || false,
        Type: tconfig.Type || "Normal",
        isbot: tconfig.isbot || false,
        Message: tconfig.Message || "This is a test message",
        Options: tconfig.Options || {}
    }
    //Geneate Container
    let container = elementGenerator('div',{back:config.back,class:`container${config.isbot ? '':' darker'}`});
    //Generate the Profile Picture
    container.appendChild(elementGenerator('img',{alt:"Avatar",src:`Media/${config.isbot ? 'Bot.jpg':'User.png'}`}));
    //Generate the text
    container.appendChild(elementGenerator('p',{},config.Message.replaceAll('\n','<br>')));
    //Generate the list with the type
    if (config.Type == 'Button') {
        for (const key in config.Options) {
            container.appendChild(elementGenerator('button',{onclick:config.Options[key],class:'Button'},key));
        }
    } else if (config.Type == 'List') {
        container.appendChild(elementGenerator('input',{id:'myInput',onkeyup:'filterFunction()',placeholder:'Search...'}));
        let form = elementGenerator('div',{class:'dropdown-content'});
        for (const key in config.Options) {
            form.appendChild(elementGenerator('a',{onclick:config.Options[key]},key))
        }
        container.appendChild(form);
    }
    //Generate the Back button
    if (config.back) container.appendChild(elementGenerator('button',{class:'back',onclick:'back()'},'Go Back'));
    if (config.returnobj) {
    //printing the config for debugging
    console.log('The Input that was given');
    console.log(tconfig);
    console.log('The config that was generated');
    console.log(config);
    console.log(tconfig.isClient || true)
        return container;
    } else {
        changeall('.Button', 'disabled', true);
        changeall('.Button', 'class', 'Button disable');
        changeall('#myInput', 'disabled', true);
        document.getElementById('Textbox').appendChild(container);
        container.scrollIntoView({behavior: "smooth"})
    }
}

const filterFunction = () => {
    var filter, a, i;
    filter = document.getElementById("myInput").value.toUpperCase();
    a = document.querySelector('.dropdown-content').getElementsByTagName('a')
    for (i=0; i < a.length; i++) {
        (a[i].textContent.toUpperCase().search(filter) > -1) ? a[i].style.display = "" : a[i].style.display = "none";
    }
}

const elementGenerator = (elementName,config,innerhtml) => {
    //This function quickly generates a element
    let element = document.createElement(elementName);
    if(!config) return element;
    for (const key in config){
        element.setAttribute(key,config[key])
    }
    element.innerHTML = innerhtml||'';
    return element
}