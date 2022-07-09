var CT = "CT"
var UT = "UT"
var NC = Get('normalChat');
var Route = Get('route');

function test(input) {
	var data = Get('studentDetails');
	for(var i = 0; i < data.studentDetails.length; i++) {
    	var obj = data.studentDetails[i];
    	if (obj['name'] === input) {
    		console.log("Hi " + obj['name'] + " " + obj['surname'] + ". How may I help you today")
    	}
	}
}
function info_find(){
    Uinput = input()
    for(var i = 0; i < SD.studentDetails.length; i++) {
    	var info = SD.studentDetails[i];
        if (info['name'] === Uinput){
            info_find.FSKID = info['fskid'];
            info_find.Name = info['name'];
            info_find.Surname = info['surname'];
            info_find.Grade = info['grade'];
            info_find.Section = info['section'];
            output("Hello " + info_find.Name + " " + info_find.Surname + ", I am Chatty how may I help you today!", CT);
            output("If you need help with the commands type help. Type quit to leave\n\n\n",CT);
            print2("hi",['Menu','Todays Special'],['lol()','dude()'])
            change("chatty()");
            return 0;
        }
    }
    output("Please enter your first name only",CT)
}

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
    output("The route number is: " + Routenumber,CT);
    AddToLast("The Time is: " + Time)
}

function route(Stopname){
    // Stopname = "Opp.Someshwar Enclave Main Gate"
    $('select').prop('disabled', true);
    $('.form-control').removeAttr('disabled');
    $('.form-control').prop('placeholder','Type the options instead...');
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
    output("Sorry, That's not a route check your spellings or mistakes",CT);
    run()
}