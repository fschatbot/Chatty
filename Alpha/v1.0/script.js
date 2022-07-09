var Route = Get('route');
//This will do the bus Route task
function keycode(SC) {
    // SC = "b"
    Routenumber = SC.toUpperCase() + String(route.sn['route' + SC.toUpperCase()])
    H = String(route.sn[SC + "h"])
    M = String(route.sn[SC + "m"])
    if (M.length === 1) {
        M = "0" + M
    }
    Time = H + ":" + M;
    append(new TextClass("The route number is: " + Routenumber).createClientSide());
    AddToLast("The Time is: " + Time)
}

function route(Stopname) {
    for (var i = 0; i != Route.route.length; i++) {
        var SN = Route.route[i];
        if (SN['stopName'] === Stopname) {
            changeall('#myInput', 'disabled', true);
            document.getElementsByClassName('dropdown-content')[0].remove()
            document.querySelector('#option-typer').removeAttribute('disabled');
            changeall('#option-typer', 'placeholder', 'Type the options instead...');
            route.sn = Route.route[i];
            keycode('a');
            keycode('b');
            keycode('d');
            keycode('e');
            run()
            return 0;
        }
    }
}