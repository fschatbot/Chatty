const Slist = ["Menu", "Today's Special", "Transport Route", "Date and Time", "Contact List/ Intercom", "Utilities"];
const flist = ["chatty('lunch')", "chatty('TS')", "chatty('TR')", "chatty('date')", "chatty('CL')", "chatty('Utli')"];
const get = async (sheet) => await fetch(
    'https://script.google.com/macros/s/AKfycbyrZWIv3LmVhcnf_BGNxKBNUIefKBY-R8zq2XSJQZSI5Mb94g/exec?sheet=' + sheet)
.then((response) => response.json())
.then(json => json)
.catch(err => console.log(err))

function loadNow(opacity) {
    if (opacity <= 0) {
    document.getElementById('loader').remove();
    document.getElementsByClassName('bot')[0].style.display = 'block';
    } else {
        document.getElementById('loader').style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.05);
        }, 50);
    }
}

const openurl = (url) =>{
    append(new TextClass(`Redirect me to the link`).createClientSide());
    window.open(url)
    append(new TextClass(`Ok, I have tried redirecting you to the link. If failed click <a href="${url}" target="_blank">here</a>!!`).createBotSide());
    run()
}
function filterFunction() {
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
const disableall = function() {
    changeall('.Button', 'disabled', true);
    changeall('.Button', 'class', 'disable');
    changeall('#myInput', 'disabled', true);
}

function changeall(elem, atrribute, value) {
    var time = document.querySelectorAll(elem).length
    while (time > 0) {
        time--;
        document.querySelectorAll(elem)[time].setAttribute(atrribute, value)
    }
}

const run = () => {
    var run = setTimeout(function() {
        append(new OptionClass(Slist, flist));
    }, 3000);
}