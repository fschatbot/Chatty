//A Function to run the chatbot
function chatty(choose, CFS) {
    if (CFS) {
        choose = document.getElementById("option-typer").value.toLowerCase();
        choose = choose.split(' ').reduce((a,c)=>(a.push(autoCorrect(c)),a),[]).join(' ')
    }
    if (choose === 'Utli') {
        boxes({Message:'Utilitys'})
        boxes({
            Message:'Here are some Extra Stuff That You may want to use',
            back:true,
            side:'bot',
            Type:'Button',
            Options:{
                "Form's Link":"chatty('FL')",
                "Policy PDF":"chatty('PDF')",
                "About Me":"chatty('About_me')"
            }
        })
    } else if (choose === 'About_me') {
        boxes({Message:'Tell Me something About your Self'})
        boxes({Message:`Hello there, I am chatty! The purpose of my life is to make your life easier.
My creator found it a bit hard to navigate through fsapps so he made me.
Now you can get all the basic school information like the teachers' timetable, or the canteen menu or  the bus routes just by asking me.
I am happy to help you - don't get lost in the myriad of fsapps, use me instead!&#128515;
`,side:'bot'})
        run()
    } else if (choose === 'FL' || choose === "form's link") {
        boxes({Message:"Form's Link"});
        boxes({
            Message:'Here are All the Forms!',
            side:'bot',
            Type:'Button',
            Options:{
                "Exigency reporting form":"openurl('https://bit.ly/2TRb5qG')",
                "Dressing Feedback to Individual":"openurl('https://bit.ly/37wh2NC')",
                "PYP School Counselor Intervention Form":"openurl('https://bit.ly/36nKyUp')",
                "Event Feedback form":"openurl('https://bit.ly/3awMWMd')",
                "Field Trip / Outstation Event Requisition Form":"openurl('https://bit.ly/2Gcm2LB')",
                "Event Requisition/Students Calendar Entry Form 2019-20":"openurl('http://bit.ly/3c8YMNi')"
            }
        })
    } else if (choose === 'PDF' || choose === 'pdf') {
        generatePDF();
    } else if (choose === 'date' || choose === "time" || choose === 'day') {
        boxes({Message:'Date & Time'});
        boxes({Message:new Date(),side:'bot'});
        run();
    } else if (choose === 'CL' || choose === 'contact list') {
        boxes({Message:"Contact List"});
        window.open('https://bit.ly/2Nl0a4m');
        boxes({Message:'Opened Contact List',side:'bot'});
        run()
    } else if (choose === "lunch" || choose === 'menu') {
        changeall('#option-typer', 'disabled', true);
        changeall('#option-typer', 'placeholder', 'choose from options above');
        boxes({Message:'Menu'});
        let f = {'Today':'finder("Menu Of The Day")','This month':'finder("Menu Of The Month")','Search for a food date':'chatty("foodsearch")'};
        boxes({Message:'You Can Choose From Here...',side:'bot',Type:'Button',Options:f});
    } else if (choose === "TS" || choose === "today's special") {
        finder("Today's Special");
    } else if (choose === "TR" || choose === "transport route") {
        boxes({Message:'Transport Route'});
        let obj = {};
        route.forEach(response => {obj[response.stopName] = 'routeofstop(this.innerText)'})
        boxes({Message:'Choose From the Bellow',side:'bot',Type:"List",Options:obj});
    } else if(choose == "foodsearch"){
        boxes({Message:"I want to search for a foood"});
        generateFoodList()
    }
    else {
        console.info('The command term ' + choose + ' is not defined');
        boxes({Message:"I don't Understand What You mean by - "+choose,side:'bot'});
    }
}

const generatePDF = (CN) => {
    if(!CN){
        let j = {};
        for(const e in PDF){
            j[e] = `generatePDF('${e}')`;
        }
        boxes({Message:'Choose Catergory for the PDF you are looking for',back:true,side:'bot',Type:'Button',Options:j});
    } else {
        let a = PDF[CN]
        let j = {};
        for(const e in a){
            j[e] = `openurl('${a[e]}')`;
        }
        boxes({Message:'Choose the PDF',back:true,side:'bot',Type:'Button',Options:j});
    }
}