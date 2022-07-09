var TR = Get("route").route,obj,CT = "CT",UT = "UT";
var util_slist = ["Form's Link", "Policy PDF","About Me"];
var util_flist = ["chatty('FL')","chatty('PDF')","chatty('About_me')"];
//A Function to run the chatbot
function chatty(choose){
    if (choose === 'Utli'){
        output("Utility",UT);
        print2("What Utility do you want?", util_slist,util_flist);
    }
    else if (choose === 'About_me'){
        output('Under Process...')
        run()
    }
    else if (choose === 'FL'||choose === "form's link"){
        output("Form's Link",UT);
        print2("Please choose what links you want to acess",["Exigency reporting form","Dressing Feedback to Individual","PYP School Counselor Intervention Form","Event Feedback form","Field Trip / Outstation Event Requisition Form","Event Requisition/Students Calendar Entry Form 2019-20"],["window.open('https://bit.ly/2TRb5qG');run()","window.open('https://bit.ly/37wh2NC');run()","window.open('https://bit.ly/36nKyUp');run()","window.open('https://bit.ly/3awMWMd');run()","window.open('https://bit.ly/2Gcm2LB');run()","window.open('http://bit.ly/3c8YMNi');run()"]);
    }
    else if (choose === 'PDF'||choose === 'pdf'){
        output('Under Process...');
        run()
    }
    else if (choose === 'date'||choose === "time"||choose === 'day'){
        output("Date And Time",UT);
        output(new Date());
        run();
    }
    else if (choose === 'CL'||choose === 'contact list'){
        output("Contact List",UT);
        window.open('https://bit.ly/2Nl0a4m');
        run()
    }
    else if (choose === "lunch"||choose === 'menu'){
        changeall('#option-typer','disabled',true);
        changeall('#option-typer','placeholder','Please choose options given above');
        output("Menu",UT);
        print2(" ", ['Today','This month'], ['finder("Today")','finder("Month")']);
        //print2("What do you you want", ["lunch menu","Today's Special"],['menu("menuOfMonth")','menu("todaysSpecial")'])
    }
    else if (choose === "TS"||choose === "today's special") {
        output("Today's Special",UT);
        finder('TS');
        run();
    }
    else if (choose === "TR"||choose === "transport route"){
        output("Transport Route",UT);
         //Transport route
         var obj = [];
            for (var i = 0; i != TR.length; i++) {
                obj.push(TR[i]["stopName"]);
         }
         print3("Choose your Transport route", obj);
        }
    else {
    	console.info('The command term ' + choose + ' is not defined')
    }
}