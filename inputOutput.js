let calcString = "";

function handleClick(value){
    calcString += value;
    document.getElementById("display").innerText = calcString;
}


function calculate(){
    calcString = parseString(calcString);
    document.getElementById("display").innerText = calcString;
}

function clearDisplay(){
    calcString = "";
    document.getElementById("display").innerText = calcString;
}