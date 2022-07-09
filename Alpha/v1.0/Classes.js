const TextClass = class {
    constructor(Text) {
        this.text = String(Text).replace(/\n/g, '<br>');
    }
    createBotSide() {
        return new TextClass(this.text).createClientSide('chatty', '', '');
    }
    createClientSide(a = 'user', b = 'right', c = 'darker') {
        disableall();
        var container = document.createElement('div');
        container.setAttribute("class", `container ${c}`);
        var img = document.createElement("img");
        img.setAttribute("class", `${b}`);
        img.setAttribute("alt", "Avatar");
        img.setAttribute("src", `img/${a}.png`);
        container.appendChild(img);
        var val = document.createElement("p");
        val.innerHTML = this.text;
        val.setAttribute("class", 'CT');
        container.appendChild(val);
        return container;
    }
}

const OptionClass = class {
    constructor(options, OptionFunction) {
        var container = new TextClass('Please Choose from options Below!!').createBotSide();
        for (var i = 0; i != options.length; i++) {
            var btn = document.createElement("button");
            btn.innerHTML = options[i];
            btn.setAttribute("onclick", OptionFunction[i]);
            btn.setAttribute("class", "Button");
            container.appendChild(btn);
        }
        return container;
    }
}

const Dropdown = class {
    constructor(option) {
        var container = new TextClass('Choose your Transport route!!').createBotSide();
        var search = document.createElement('input');
        search.setAttribute('id', 'myInput');
        search.setAttribute('onkeyup', 'filterFunction();');
        search.setAttribute('placeholder', 'Search..');
        container.appendChild(search);
        var form = document.createElement('div');
        form.setAttribute('class', 'dropdown-content')
        container.appendChild(form);
        for (var i = 0; i != option.length; i++) {
            var options = document.createElement('a');
            options.setAttribute('onclick', 'route(this.innerText)')
            options.innerHTML = option[i];
            form.appendChild(options)
        }
        return container;
    }
}