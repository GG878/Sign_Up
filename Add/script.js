var socket = io();
function validateEmail(email) 
{
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePassword(password)
{
    let va = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return va.test(password);
}
var button              =   document.getElementById("button");

button.onclick = print;
function print() 
{
    var name            =   document.getElementById("name");
    var Lname           =   document.getElementById("Lname");
    var mail            =   document.getElementById("mail");
    var password        =   document.getElementById("password");
    var PhoneNumber     =   document.getElementById("PhoneNumber");
    var date            =   document.getElementById("date");
    var BkColor         =   document.getElementById("BkColor");
    var MailStatus      =   document.getElementById("MailStatus");
    // var passwordStatus  =   document.getElementById("PasswordStatus");
    var PsId            =   document.getElementById("PsId");
    var adress          =   document.getElementById("address");
    var male            =   document.getElementById("male");
    var results         =   [];


    
    if (name.value == "") 
    {
        alert("please enter the Name");
        return
    }
    if (mail.value == "") 
    {
        alert("please enter the mail");
        return
    }
    if (password.value == "") 
    {
        alert("please enter the Password");
        return
    }

    
    if (!validateEmail(mail.value)) 
    {
        MailStatus.innerText = mail.value + " is not valid :("
        return
    }
    else{
        MailStatus.innerText = "";
    }
    // if (!validatePassword(password.value))
    // {
    //     passwordStatus.innerText = password.value + " is not valid :("
    //     return
    // }
    // else{
    //     passwordStatus.innerText = "";
    // }
    document.body.style.backgroundColor = BkColor.value;
    results.push(name.value,Lname.value,PhoneNumber.value,BkColor.value,PsId.value,mail.value,password.value,date.value,adress.value)
    socket.emit("print",results)
/*
    console.log("name --------->"  + name.value);
    console.log("Lname -------->"  + Lname.value);
    console.log("PhoneNumber--->"  + PhoneNumber.value);
    console.log("BkColor------->"  + BkColor.value);
    console.log("PsId---------->"  + PsId.value);
    console.log("mail ---------> " + mail.value);
    console.log("password -----> " + password.value);
    console.log("Date ---------> " + date.value);
*/
}