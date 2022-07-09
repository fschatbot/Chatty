var CT = "CT"
var UT = "UT"
var NC = Get('normalChat');
var Route = Get('route');
//This will do the bus Route task
function keycode(SC){
    // SC = "b"
    Routenumber = SC.toUpperCase() + String(route.sn['route' + SC.toUpperCase()])
    H = String(route.sn[SC + "h"])
    M = String(route.sn[SC + "m"])
    if(M.length === 1){
	   M = "0" + M
    }
    Time = H + ":" + M;
    output("The route number is: " + Routenumber);
    AddToLast("The Time is: " + Time)
}

function route(Stopname){
    changeall('select','disabled',true);
    document.querySelector('#option-typer').removeAttribute('disabled');
    changeall('#option-typer','placeholder','Type the options instead...');
    for (var i = 0; i != Route.route.length; i++){
    	var SN = Route.route[i];
        console.log(SN['stopName']);
        if (SN['stopName'] === Stopname){
        	route.sn = Route.route[i];
        	keycode('a');
            keycode('b');
            keycode('d');
            keycode('e');
            run()
            return 0;
        }
    }
    output("Sorry, That's not a route check your spellings or mistakes");
    run()
}