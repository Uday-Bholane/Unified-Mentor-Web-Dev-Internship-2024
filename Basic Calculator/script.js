let string = ""
let currentValue = document.querySelector("#currentValue");
let previousOperation = document.querySelector("#previousOperation");

previousOperation.addEventListener('click',()=>{
    currentValue.value = previousOperation.value;
    string = previousOperation.value;
    previousOperation.value = "";
})

document.addEventListener('keydown', (e) =>{{
    const key = e.key;
     if(!isNaN(key) || key === "+" || key === "-"|| key === "*"|| key === "/"|| key === "%"|| key === "Enter" || key === "="|| key === " "|| key === "." || key === "Backspace" || key === "Escape"){
         e.preventDefault();
         if(key === "Enter" || key === "="){
            evaluateValue();
         }
         else if(key === "Backspace"){
            deleteValue();
         }
         else if(key === "Escape"){
            clearAll();
         }
         else if(key === "%"){
            evaluatePercentage();
         }
         else{
            updateValue(key);
         }
     }
}})

const evaluatePercentage = () =>{
    try {
        previousOperation.value = string;
        string = eval(string) / 100;
        currentValue.value = string 
    } catch (error) {
        currentValue.value = 'Error';
        string = ''; 
    }
}

const updateValue = (val) => {
    string += val;
    currentValue.value = string;
}
const deleteValue = () => {
    string = string.slice(0, -1);
    currentValue.value = string;
}
const evaluateValue = () => {
    previousOperation.value = string;
    try {
        string = eval(string);
        currentValue.value = string;
    }
    catch {
        currentValue.value = "Error";
        string = "";
    }
}
const clearAll = () => {
    string = "";
    currentValue.value = "";
    previousOperation.value = "";
}
