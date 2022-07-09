const get = async (sheet) => await fetch(
    'https://script.google.com/macros/s/AKfycbyrZWIv3LmVhcnf_BGNxKBNUIefKBY-R8zq2XSJQZSI5Mb94g/exec?sheet=' + sheet)
.then(r => r.json())
.then(j => j)
.catch(e => {
    loadNow(1);
    boxes({isbot: true,Message: "There has been a error\nError:n"+e,})
});

//Store all the important data
let menucard= get('menu').then(d => menucard = d);
let route = get('route').then(d => route = d);

function loadNow(opacity) {
    if (opacity <= 0) {
    document.getElementById('loader').remove();
    document.getElementsByClassName('bot')[0].style.display = 'block';
    } else {
        document.getElementById('loader').style.opacity = opacity;
        setTimeout(()=>{loadNow(opacity - 0.05)}, 50);
    }
}

const openurl = (url,ran=true) => {
    boxes({Message: "Redirect me to the link"})
    window.open(url);
    boxes({
        Message: `Ok, I have tried redirecting you to the link. If failed click <a href="${url}" target="_blank">here</a>!!`,
        isbot: true
    })
    if(ran) run();
}

function changeall(elem, atrribute, value) {
    let element = document.querySelectorAll(elem);
    element.forEach(e => {
        e.setAttribute(atrribute, value);
    })
}

const run = () => {
    setTimeout(function() {
        boxes({
            back: true,
            Type: "Button",
            isbot:true,
            Message: "What can I help you with today??",
            Options: dlist
        })
    }, 3000);
}
// Check If all the links have been fetched and then load everything
Promise.allSettled([menucard, route]).then(values => {
    loadNow(1);
    boxes({
        Type: "Button",
        isbot: true,
        Message: "What can I help you with today??",
        Options: dlist
    })
    document.querySelector('.container').setAttribute('back','true')
    console.info('All the data has been fetched and the ChatBot is up and running');
})

const back = ()=>{
    let container = document.querySelectorAll('[back="true"]');
    container = container[container.length-2].cloneNode(true);
    container.querySelectorAll('[class="Button disable"]').forEach(e=>{
        e.setAttribute('class','Button');
        e.removeAttribute('disabled');
    })
    document.getElementById('Textbox').appendChild(container);
    container.scrollIntoView({behavior: "smooth"})
}