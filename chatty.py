import requests
import random
import json
import datetime
import os


#This loads all the live sync data
SD = json.loads(requests.get('https://v2-api.sheety.co/9a12bc0f9230b39275673e809fbca912/chattyApi/studentDetails').text)
NC = json.loads(requests.get('https://v2-api.sheety.co/9a12bc0f9230b39275673e809fbca912/chattyApi/normalChat').text)
MenuCard = json.loads(requests.get('https://v2-api.sheety.co/9a12bc0f9230b39275673e809fbca912/chattyApi/menu/').text)
Route = json.loads(requests.get('https://v2-api.sheety.co/9a12bc0f9230b39275673e809fbca912/chattyApi/route').text)

#This saves Your information
def info_find():
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    print(time + "Please enter your First Name Only")
    Uinput = input(time + ">>> ")
    for info in SD['studentDetails']:
        if info['name'] == Uinput:
            info_find.FSKID = info['fskid']
            info_find.Name = info['name']
            info_find.Surname = info['surname']
            os.system('cls' if os.name == 'nt' else "printf '\033c'")
            print(time + "Hello " + info_find.Name + " " + info_find.Surname + ", I am Chatty how may I help you today!\n")
            #default message
            print("Please type lowercase English language to start a conversation. Type quit to leave\n\n\n")
            chatty()
            while True:
                print(time + "I didn't understand what you said\n")
                chatty()
        #Find a way that only after searching evry object and student then ask the thing again
    info_find()

#This is lunch menu functions which search through every live sync data from web
def menu(id):
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    print("\n" + time + "What day do you want from:")
    daynumber = str(input(time + ">>>"))
    daynumber = daynumber + " October"
    for date in MenuCard['menu']:
        if date['date'] == daynumber:
            if id == 'todaysSpecial':
                print(time + date[id] + "\n")
            elif id == 'menuOfMonth':
                print(time + date[id])
                print(time + date[''] + "\n")

def ask():
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    print(time + "1 stands for Today's Special and 2 stands for menu")
    di = int(input(time + ">>>"))
    if di == 1:
        menu('todaysSpecial')
    elif di == 2:
        menu('menuOfMonth')
    else:
        ask()

#This will do the bus Route task
def keycode():
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    # stopcode = "b"
    print("\n" + time + "What is the key code")
    keycode.stopcode = str(input(time + ">>>")).lower()
    SC = keycode.stopcode
    if SC == "a" or SC == "b" or SC == "d" or SC == "e":
        pass
    else:
        time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
        print("\n" + time + "Wrong key code enter again")
        keycode()

def route():
    printed = False
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    # Stopname = "Opp.Someshwar Enclave Main Gate"
    print(time + "What is the stop name")
    Stopname = str(input(time + ">>>")).lower()
    Stopname = Stopname.title()
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    for SN in Route['route']:
        if SN['stopName'] == Stopname:
            keycode()
            time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
            Routenumber = keycode.stopcode.capitalize() + str(SN['route'])
            H = str(SN[keycode.stopcode + "h"])
            M = str(SN[keycode.stopcode + "m"])
            figure = len(M)
            if figure == 1:
                M = "0" + M
            else:
                pass
            Time = H + ":" + M
            print("\n" + time + "The route number is " + Routenumber)
            print(time + "The time is " + Time)
            printed = True
            pass
    if printed == False:
        print("Sorry That's not a route check your spellings or mistakes")
        route()

#A Function to run the chatbot
def chatty():
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    userinput = str(input(time + ">>> "))
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "| "
    if userinput == "quit" or userinput == "exit":
        print(time + random.choice(['bye','See You :(', ':/']))
        exit()
    elif userinput == "lunch":
        ask()
        chatty()
    elif userinput == "time":
        print(time + "The time is " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n")
        chatty()
    elif userinput == "fskid":
        print(time + info_find.FSKID + "\n")
        chatty()
    elif userinput == "full name":
        print(time + info_find.Name + " " + info_find.Surname + "\n")
        chatty()
    elif userinput == "transport":
        route()
        chatty()
    else: 
        output = random.choice(['response1','response2','response3'])
        for respond in NC['normalChat']:
            if respond['input'] == userinput:
                print(time + respond[output]+"\n")
                chatty()

#Run Chatty
info_find()