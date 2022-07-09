//This will do the bus Route task
function keycode(sc) {
    let b = sc.toUpperCase() + String(route.sn['route' + sc.toUpperCase()])
    let a = String(route.sn[sc + "h"]) + ":" + ("0" + String(route.sn[sc + "m"])).slice(-2);
    boxes({Message:`The route number is: ${a}\nThe Time is: ${b}`,side:'bot'})
}

function routeofstop(e) {
    changeall('#myInput', 'disabled', true);
    document.getElementsByClassName('dropdown-content')[0].remove()
    document.querySelector('#option-typer').removeAttribute('disabled');
    changeall('#option-typer', 'placeholder', 'Type the options instead...');
    boxes({Message: "Give me the information about" + e,side: 'client'});
    route.forEach(SN => {if (SN.stopName == e) {route.sn = SN;}})
    keycode('a');
    keycode('b');
    keycode('d');
    keycode('e');
    run();
}