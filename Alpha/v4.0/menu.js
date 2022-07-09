function finder(id) {
    let found;
    boxes({Message: id,side: 'client'})
    daynumber = ("0" + new Date().getMonth()).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    if (id == "Menu Of The Month") {
        openurl("https://www.fountainheadschools.org/helpdesk/school-menu/",false);
        found = true;
    } else {
        menucard.forEach(data => {
            if (data.date.includes(daynumber)) {
                found = true;
                if (id == "Today's Special") {
                    boxes({Message: data['t1'] + ", " + data['t2']})
                } else if (id == "Menu Of The Day") {
                    boxes({Message: `${data.m1}, ${data.m2}, ${data.m3}, ${data.m4}, ${data.m5}`,isbot:true});
                }
            }
        })
    }
    if (!found) {
        boxes({
            Message: `Sorry The Database Has not been updated to the latest menu ! ! You may use this <a href='https://www.fountainheadschools.org/helpdesk/school-menu/'>link<a/> for the time being`,
            isbot: true
        });
    }
    document.querySelector('#option-typer').removeAttribute('disabled');
    document.querySelector('#option-typer').placeholder = 'Type the options instead...';
    run();
}