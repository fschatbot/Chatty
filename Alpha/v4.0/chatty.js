document.querySelector('#option-typer').addEventListener('keyup',(e)=>{
    if(e.keyCode == 13){
        let search = e.target
        if(!search.value) return;
        chatty(search.value.toLowerCase().split(' ').reduce((a,c)=>(a.push(autoCorrect(c)),a),[]).join(' '));
        search.value = '';
    }
})
document.querySelector('.sub').addEventListener('click',(e)=>{
    let search = document.querySelector('#option-typer');
    if(!search.value) return;
    chatty(search.value.toLowerCase().split(' ').reduce((a,c)=>(a.push(autoCorrect(c)),a),[]).join(' '));
    search.value = '';
})

//A Function to run the chatbot
function chatty(choose) {
    if (choose == 'Utli') {
        boxes({Message:'Utilitys'})
        boxes({
            Message:'Here are some Extra Stuff That You may want to use',
            back:true,
            isbot:true,
            Type:'Button',
            Options:{"Form's Link":"chatty('FL')","Policy PDF":"chatty('PDF')","About Me":"chatty('About_me')"}
        })

    } else if (choose == 'About_me') {
        boxes({Message:'Tell Me something About your Self'})
        boxes({Message:`Hello there, I am chatty! The purpose of my life is to make your life easier.
My creator found it a bit hard to navigate through fsapps so he made me.
Now you can get all the basic school information like the teachers' timetable, or the canteen menu or  the bus routes just by asking me.
I am happy to help you - don't get lost in the myriad of fsapps, use me instead!&#128515;
`,isbot:true});
        run();

    } else if (choose == ('FL'||'form\'s link')) {
        boxes({Message:"Form's Link"});
        boxes({Message:'Here are All the Forms!',isbot:true,Type:'Button',back:true,
            Options:{
                "Exigency reporting form":"openurl('https://bit.ly/2TRb5qG')",
                "Dressing Feedback to Individual":"openurl('https://bit.ly/37wh2NC')",
                "PYP School Counselor Intervention Form":"openurl('https://bit.ly/36nKyUp')",
                "Event Feedback form":"openurl('https://bit.ly/3awMWMd')",
                "Field Trip / Outstation Event Requisition Form":"openurl('https://bit.ly/2Gcm2LB')",
                "Event Requisition/Students Calendar Entry Form 2019-20":"openurl('http://bit.ly/3c8YMNi')"
            }
        })
    } else if (choose == ('PDF' ||'pdf')) {
        generatePDF();
    } else if (choose == 'date' || choose == "time" || choose == 'day') {
        boxes({Message:'Date & Time'});
        boxes({Message:new Date()+'',isbot:true});
        run();
    } else if (choose == ('CL'||'contact list')) {
        boxes({Message:"Contact List"});
        openurl('https://bit.ly/2Nl0a4m')
    } else if (choose == ("lunch" || 'menu')) {
        changeall('#option-typer', 'disabled', true);
        changeall('#option-typer', 'placeholder', 'choose from options above');
        boxes({Message:'Menu'});
        let f = {'Today':'finder("Menu Of The Day")','This month':'finder("Menu Of The Month")','Search for a food date':'generateFoodList()'};
        boxes({Message:'You Can Choose From Here...',isbot:true,back:true,Type:'Button',Options:f});
    } else if (choose == "today's special") {
        finder("Today's Special");
    } else if (choose == ("TR"||"transport route")) {
        boxes({Message:'Transport Route'});
        let obj = {};
        route.forEach(response => {obj[response.stopName] = 'stopinfo(this.innerText)'})
        boxes({Message:'Choose From the Bellow',isbot:true,Type:"List",Options:obj});
    } else if(choose == "food search"){
        generateFoodList();
    }
    else {
        console.info('The command term ' + choose + ' is not defined');
        boxes({Message:"I don't Understand What You mean by - "+choose,isbot:true});
    }
}

const generatePDF = (CN) => {
    if(CN){
        let a = PDF[CN]
        let j = {};
        for(const e in a){
            j[e] = `openurl('${a[e]}')`;
        }
        boxes({Message:'Choose the PDF',back:true,isbot:true,Type:'Button',Options:j});
    } else {
        let j = {};
        for(const e in PDF){
            j[e] = `generatePDF('${e}')`;
        }
        boxes({Message:'Choose Catergory for the PDF you are looking for',back:true,isbot:true,Type:'Button',Options:j});
    }
}
const generateFoodList = (food) => {
    if (!food) {
        let foodlist = [];
        menucard.forEach(a => {
            foodlist.push(a.m1);
            foodlist.push(a.m2);
            foodlist.push(a.m3);
            foodlist.push(a.m4);
            foodlist.push(a.m5);
        })
        foodlist = [...new Set(foodlist.sort())].slice(0,-1);
        let sorted = {};
        foodlist.forEach(a => {sorted[a] = 'generateFoodList(this.innerText)'})
        boxes({Options: sorted,Message: "Choose From the Given",isbot: true,Type: "List"})
    } else {
        changeall('#myInput', 'disabled', true);
        document.getElementsByClassName('dropdown-content')[0].remove()
        document.querySelector('#option-typer').removeAttribute('disabled');
        changeall('#option-typer', 'placeholder', 'Type the options instead...');
        boxes({Message: `Give me the information about ${food}`});
        menucard.forEach(b => {
            if ([b.m1, b.m2, b.m3, b.m4, b.m5].some((a) => a == food)) {
                boxes({Message: `The food can appear on your plate on ${b.date.split('T')[0].split('-')[2]}(th)`,isbot: true});
            }
        })
        run();
    }
}
const PDF = {
    "Academic-policy": {
        "Academic Integrity Policy": "https://docs.google.com/document/u/1/d/e/2PACX-1vTM6G9rs2Uys1mUZCsvvrNHBKi01RzRe79Me_mIa7xIsKmASwjpLhLR6PPHSGEW6V_D6FfQWTpq5-sG/pub?embedded=true",
        "Assessment Policy": "https://docs.google.com/document/d/e/2PACX-1vRoJ74u5ZypafZBC4WKPidG85fBQ_HTWWnav-Tvgs2QB7OOGAiLDzlP10Us9goBxCcxet-j5LZADQqi/pub?embedded=true",
        "Language Policy": "https://docs.google.com/document/d/e/2PACX-1vRfsu2BcVQ0Hs6AoHGmYgYTaA_h8N084QAyuRg0dAvHERBqcM91Bxrrlv4RO-364_FHyNihPHHHprLW/pub?embedded=true",
        "Learning Diversity Policy": "https://docs.google.com/document/d/e/2PACX-1vTTsghu_whknx5bu8ErMe9h0lfNQmNjz0Yjv_z8Kow0_bRFQN8qAU8MAiXTk96CWo9S2FgD962BHjaz/pub?embedded=true",
        "No Tuition Policy – Our Beliefs": "https://docs.google.com/document/d/e/2PACX-1vTn8LTL9ve3j8cal_A9lBil15dwZOQdj8TtFKd4fwdW6AzpxBVFo5wJcbiHu0KcrV7VkxdxMfkPdItt/pub?embedded=true",
        "Parent Role in Education": "https://docs.google.com/document/d/e/2PACX-1vTM6G9rs2Uys1mUZCsvvrNHBKi01RzRe79Me_mIa7xIsKmASwjpLhLR6PPHSGEW6V_D6FfQWTpq5-sG/pub?embedded=true"
    },
    "Code of Conduct": {
        "Attendance Policy": "https://docs.google.com/document/d/e/2PACX-1vRr-uauDXeU8pgwinMHVLH_HdavqKEE1xXVm8g5WSnHeE4jSIrIYr8BD7DnD-HvIM9ut_rorY-h1icx/pub?embedded=true",
        "Celebration and Gift guidelines": "https://docs.google.com/document/d/e/2PACX-1vS9C2h6cLpREDVMQQbnimnAERqjMzaYuN960Hus51xRFUa4mcWT-HY6FVy2_6X43AfVETdz3xaQ6Rc5/pub?embedded=true",
        "Code of Conduct for Parents": "https://docs.google.com/document/d/e/2PACX-1vT5021umQS-7GPgcdTNKJfyy0Anwa8YHbwgSZzCebzxayp3J4sI4hz_Ps4FCnY3oKzBk3FjsCDh4t_R/pub?embedded=true",
        "Damage & Loss of School Property": "https://docs.google.com/document/d/e/2PACX-1vSUBzLSfplZZ_q9GX8j1amQ2clozHR1ynUzgiaOkqS1wLNZ-6BHT6ZLOT_kdIXEF4jELD7Z8ae9M2SO/pub?embedded=true",
        "Discipline Policy": "https://docs.google.com/document/d/e/2PACX-1vT4pFVj6LYiYPWWdfO1mejbD0OvPmmywQOW7kdLJwvGpmEMcIa-F6WMxPgvgkLgyFZKLcqrKucd9PST/pub?embedded=true",
        "Policy for Interaction on Social Media (Staff, Parents & Students)": "https://docs.google.com/document/d/e/2PACX-1vQKtcCIt29q7bNBCl2Ec3rv5pQZXxThx1IB1MTScc0xbae-X96NaPuK6JozWak58-1Z6kKcmXAMmz4W/pub?embedded=true",
        "Transport & related Behavior Policy": "https://docs.google.com/document/d/e/2PACX-1vTlgYYX_i7I-9Fiu3nnKuhlBpZG1gA6LmmKdTkDsLDccavyc2BtGU7GnaQJ6IB5dwTLASEc3a29AhWD/pub?embedded=true",
        "Uniform Policy": "https://docs.google.com/document/d/e/2PACX-1vTN017uZidjRFotKSLtVwrzgzETJP65YRHcqbC2y-AKw0EWBqdTJ6P9ltoz2qrYVq_pYd6s93BEwhua/pub?embedded=true"
    },
    "General Policies": {
        "Announcing Student Achievement Policy": "https://docs.google.com/document/d/e/2PACX-1vQ6LtM_SlKZ-ZBeIiXX8CqCMMkj58btrTWqSkTrCIFp5iRwdyN4lDk2_3GxtXCfcQ21h8A3aga8R4ct/pub?embedded=true",
        "Canteen/Pantry Usage Guidelines": "https://docs.google.com/document/d/e/2PACX-1vTmf2c41RQVHb6S0TRKVImEIGlohJ4WVBrOtoBIjZTo1qOWItIcAHq-zDA_Y7tuZ5YyNMnZYh9nNSwE/pub?embedded=true",
        "Guidelines for School-Parent Communication": "https://docs.google.com/document/d/e/2PACX-1vQBtEBKHR0tnn20Taw6oQLfu5K6VJLI4NFOTvfJ-LqwOchnc0zQ8Zjn3ECYbq3pqv_esmmrtA1elOT7/pub?embedded=true",
        "Intellectual property and copyright policy": "https://docs.google.com/a/fountainheadschools.org/document/d/1pdP_IYOSE0DX6viJPZqbThBiBxzaOlOXqyoCMNbagsk/preview",
        "Library Policy": "https://docs.google.com/document/d/e/2PACX-1vSv8u8I5oHYbvJbx-9D53f6tJYo-7_Su0NKr62MNatWitZ41TsUgLKZLHVKiRwDCYy6py395yhvQgDF/pub?embedded=true",
        "Locker Policy": "https://docs.google.com/document/d/e/2PACX-1vSxFWe0_sUspksmSITL1fEHA4ebODdUeqbBEoFye3Ajvk0M5WvYJwqp8v7I8o-4TL5zGWC5p641HcCe/pub?embedded=true",
        "Play Guidelines": "https://docs.google.com/document/d/e/2PACX-1vRcvT0G1USMNK2C7flYXm7W1Casgw55Pj55k1HVBHSHoOrHqWfXaqwzEpN1OZCtAivdwq0febQlb2vq/pub?embedded=true",
        "School Timing and Duration": "https://docs.google.com/document/d/e/2PACX-1vRe4RWPVK9SPqxtxV_Tj7NKiIItCJ5WsKD2yWa57eHgRB0NpOfxielg0XjZ8Pc1xyuDHVifg4alwDKe/pub?embedded=true"
    },
    "Events": {
        "Consent for Student Led Event": "https://docs.google.com/document/d/e/2PACX-1vSmT5helY10ZSTZ9fxGefVnftG-s-KHsAgAO9fwrNov-QiVp8HAxgh_8M9uFGPDhzx4GkNzxBCld7MX/pub?embedded=true",
        "Nature Camp, Educational Trips & Field Trips": "https://docs.google.com/document/d/e/2PACX-1vT-yU8ywk1aey7b6BnqiW1dOjfoEQyCa9MlU_00NPZZZSyVzWQmj0ImrsT_4_zw_tckGIHbwVlS2v4H/pub?embedded=true",
        "Nightout Guidelines": "https://docs.google.com/document/d/e/2PACX-1vThlqs4Lw2RczvsLI7NiwG23KQaypTU59rG1gLN4OH2i5EkzVyEkV9LjwGtDt0MXpS_W5A8f7npSkMn/pub?embedded=true"
    },
    "Health and Safety": {
        "Cyber Policy": "https://docs.google.com/document/d/e/2PACX-1vRm6VDz1iPTk-YfbOgxugcT5wgNuwFq7hEtQNnoga9GWWpxp9bCponvrykHsa5RmbNyKbFt3heV8OhR/pub?embedded=true",
        "Food Policy": "https://docs.google.com/a/fountainheadschools.org/document/d/1_a3ozNJ877ISZpD_QQNKoHsE0s_FdCCUNwbNHmT7CW8/preview",
        "Health Exclusion Policy": "https://docs.google.com/document/d/e/2PACX-1vR05Fzkg6m1xCWN-c2kyZ8mO5rVUcjMgegf-n3RtkW25vtTI07r6zUQuOTk_Ns13Rir9eVdGHNonGZv/pub?embedded=true",
        "Prevention of Abuse & Harassment": "https://docs.google.com/document/d/e/2PACX-1vTKEad2wATnP8ENWLfiAJJRNBFvd9MmnLmFq2GIwBHWVZY0sWc_7FAz0y0ppPegZGlxgilZh6ZlDF8V/pub?embedded=true",
        "Safety Policy": "https://docs.google.com/document/d/e/2PACX-1vTp-QithKCnHaA_IO0n5OGOIIF0nCRF9Y3141Mmzpw4C4PN3bo8wxHDrUtbq0O48DVVbx9Cz9tAy9BW/pub?embedded=true",
        "Sickbay Policy": "https://docs.google.com/document/d/e/2PACX-1vQZVyX-b6Uk-LNAhCQkL7etIvvAdu5IaDior1H0OsxUfS5ByeKyuWc6f-pRdzlcAk_0QjM2Npd1g98C/pub?embedded=true"
    }
}
function stopinfo(e) {
    changeall('#myInput', 'disabled', true);
    document.querySelector('.dropdown-content').remove();
    document.querySelector('#option-typer').removeAttribute('disabled');
    changeall('#option-typer', 'placeholder', 'Type the options instead...');
    boxes({Message: "Give me the information about "+e,side: 'client'});
    //Just A small Function to create the message
    const g = (l,f) => `The Route Number is: ${l.toUpperCase()+f[`route${l.toUpperCase()}`]}
    The Time is: ${f[l+`h`]}:${('0'+f[l+`m`]).slice(-2)}\n`
    route.forEach(d => {
        if (d.stopName == e) {
            boxes({Message:g('a',d),isbot:true});
            boxes({Message:g('b',d),isbot:true});
            boxes({Message:g('d',d),isbot:true});
            boxes({Message:g('e',d),isbot:true});
        }
    })
    run();
}