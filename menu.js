var CT = "CT"
var MenuCard = Get('menu');
//This is lunch menu functions which search through every live sync data from web
function finder(id){
    daynumber = new Date().getDate();
    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    daynumber = daynumber + " " + month[new Date().getMonth()];
    for (var i = 0; i < MenuCard.menu.length;i++){
        var date = MenuCard.menu[i];
        if (date['date'] === daynumber) {
            if (id === 'TS') {
                console.log(date['todaysSpecial'])
                output(date['t1'] + ", " + date['t2'],CT);
                run()
                return 0;
            }
            else if (id === "Today") {
                var menu_list = date['m1'] + ", " + date['m2'] + ", " + date['m3'] + ", " + date['m4'] + ", " + date['m5']
                output(menu_list,CT);
                run()
                return 0;
            }
        }
        else if (id === "Month") {
            window.open("https://www.fountainheadschools.org/helpdesk/school-menu/");
            run()
            return 0;
        }
    }
    output("Sorry The Menu Card was updated yet",CT);
    window.open("https://www.fountainheadschools.org/helpdesk/school-menu/");
    $('.form-control').removeAttr('disabled');
    $('.form-control').prop('placeholder','Type the options instead...');
    run()
}
