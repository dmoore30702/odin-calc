function parseString(str){
    //mult + div first
    for(let i=0; i < str.length; i++){

        //Make sure no invalid characters
        if (!/[0-9+\-*/.]/.test(str[i])) {
            console.error(`Invalid character detected: ${str[i]}`);
            return null; // Handle the error or exit the function
        }


        if(str[i] == '*' || str[i] == '/'){
            const { left, right, leftIndex, rightIndex} = extractOperands(str,i);

            //Determine function to run
            let newValue = 0;
            if(str[i] == '*'){
                newValue = mult(left,right);
                if (newValue === null){
                    return "NULL"
                }
            }
            if(str[i] == '/'){
                newValue = div(left,right);
                if (newValue === null){
                    return "NULL"
                }
            }

            let newString = replaceStringSection(str,leftIndex,rightIndex,newValue.toString());
            
            return parseString(newString);
        }
    }

    //Then Add and Sub
    for(let i=0; i < str.length; i++){
        if(str[i] == '+' || str[i] == '-'){
            
            const { left, right, leftIndex, rightIndex} = extractOperands(str,i);

            //Determine function to run
            let newValue = 0;
            if(str[i] == '+'){
                newValue = add(left,right);
                if (newValue === null){
                    return "NULL"
                }
            }
            if(str[i] == '-'){
                newValue = sub(left,right);
                if (newValue === null){
                    return "NULL"
                }
            }

            let newString = replaceStringSection(str,leftIndex,rightIndex,newValue.toString());
            return parseString(newString);
        }
    }
    
    return str;
}

function extractOperands(str, i){
    let leftIndex = i - 1;
    while (leftIndex >= 0 && (!isNaN(str[leftIndex]) || str[leftIndex] === '.') && str[leftIndex] !== ' ') {
        leftIndex--;
    }
    let left = parseFloat(str.slice(leftIndex + 1, i)); // Extract the number to the left

    // Extract the right operand
    let rightIndex = i + 1;
    while (rightIndex < str.length && (!isNaN(str[rightIndex]) || str[rightIndex] === '.') && str[rightIndex] !== ' ') {
        rightIndex++;
    }
    let right = parseFloat(str.slice(i + 1, rightIndex)); // Extract the number to the right

    return{ left,right,leftIndex,rightIndex};
}

function replaceStringSection(str, startIndex, endIndex, newValue){
    return str.slice(0,startIndex+1) + newValue + str.slice(endIndex, str.length);
}

function mult(a,b){
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
        console.error("There was an error in your calculation: Trying to multiply a non-number");
        return null; // Return null to indicate an error
    }
    return a * b;
}

function div(a,b){
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
        console.error("There was an error in your calculation: Trying to divide a non-number");
        return null; // Return null to indicate an error
    }
    if (b == 0){
        console.error("Can not divide a number by 0.");
        return null; // Return null to indicate an error
    }
    return a / b;
}

function add(a,b){
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
        console.error("There was an error in your calculation: Trying to add a non-number");
        return null; // Return null to indicate an error
    }
    return a + b;
}

function sub(a,b){
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
        console.error("There was an error in your calculation: Trying to subtract a non-number");
        return null; // Return null to indicate an error
    }
    return a - b;
}