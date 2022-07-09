let menucard= get('menu').then(d => menucard = d)

//This is lunch menu functions which search through every live sync data from web
function finder(id) {
    var found;
    append(new TextClass(id).createClientSide());
    daynumber = `${new Date().getFullYear()}-${("0" + new Date().getMonth()).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
    menucard.forEach(data => {
        if (data.date.split('T')[0]===daynumber) {
            if (id==="Today's Special") {
                append(new TextClass(data['t1'] + ", "+ data['t2']).createBotSide());
            }

            else if (id==="Menu Of The Day") {
                var menu_list=data['m1']+", "+data['m2']+", "+data['m3']+", "+data['m4']+", "+data['m5'];
                append(new TextClass(menu_list).createBotSide());;
            }
            found = true;
        }

        else if (id==="Menu Of The Month") {
            window.open("https://www.fountainheadschools.org/helpdesk/school-menu/");
            append(new TextClass('The Menu Of the Month has requested to be opened to the browser').createBotSide());
            found = true;
        }
    })
    if (!found) {
        append(new TextClass(`Sorry The Database Has not been updated to the latest menu ! ! You may use this <a href='https://www.fountainheadschools.org/helpdesk/school-menu/'>link<a/> for the time being`).createBotSide());
    }
    document.querySelector('#option-typer').removeAttribute('disabled');
    document.querySelector('#option-typer').placeholder='Type the options instead...';
    run()
}


//TimeTable("1,9F,6/8/10E,9D,2,9E,10E,2/2,9F,2,9S,2/8/10E,9D,9E,2,9S,2")
//This function searches warps any thing in slash with <tr></tr> and comma with <th></th>
const TimeTable=function(str) {
    var results;
    days=0;
    const figureToControl=(h)=> {
        var g='';
        if ( !Number.isNaN(+h)===true) {
            Number(h);
            for(h > 0; h--; ) {
                g+='<th></th>';
            }
        }
        else {
            g=`<th>${h}</th>`;
        }
        return g
    }
    const operate=(a, c)=> {
        days++;
        results=a.push(`<tr><th>Day ${days}</th><th></th>${
                c.split(',').reduce((g, h)=>(g.push(figureToControl(h)), g), []).join('')
            }</tr>`) 
        return results
    }
    var tableText=`<table><tr><th></th><th>Settling Time</th><th>1</th><th>2</th><th>3</th><th>Meal Break</th><th>4</th><th>5</th><th>6</th><th>7</th></tr>`;
    tableText+=str.split('/').reduce((a, c)=> (operate(a, c), a), []).join('');
    return tableText+"</table>";
}


const generateFoodList = (food) => {
    var found;
    if (!food) {
        var foodlist = [];
        menucard.forEach(response => {
            if (response.m1){foodlist.push(response.m1)}
            if (response.m2){foodlist.push(response.m2)}
            if (response.m3){foodlist.push(response.m3)}
            if (response.m4){foodlist.push(response.m4)}
            if (response.m5){foodlist.push(response.m5)}
        })
        foodlist = [...new Set(foodlist.sort())];
        append(new dropdown(foodlist, 'generateFoodList(this.innerText)'));
    } else {
        changeall('#myInput', 'disabled', true);
        document.getElementsByClassName('dropdown-content')[0].remove()
        document.querySelector('#option-typer').removeAttribute('disabled');
        changeall('#option-typer', 'placeholder', 'Type the options instead...');
        append(new TextClass(`Give me the information about ${food}`).createClientSide())
        menucard.forEach(response => {
            if(response.m1 == food) {found = true;}
            else if (response.m2 == food) {found = true;}
            else if (response.m3 == food) {found = true;}
            else if (response.m4 == food) {found = true;}
            else if (response.m5 == food) {found = true;}
            if(found == true){
                append(new TextClass(`The food can appear on your plate on ${response.date.split('T')[0].split('-')[2]}(th)`).createBotSide());
            }
            found = false;
        })
        run()
    }
}