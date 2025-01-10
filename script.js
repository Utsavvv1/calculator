const buttons = document.querySelectorAll('.key');
let state = false;
const display = document.getElementById('display');
let disp = "";
display.innerText = disp;
let decimalFlag = false;


const buttonClickSound = new Audio('./sounds/SFX_PRESS_AB1.wav');
function changeImg(){
    if(state){
        display.style.backgroundImage = "url(./images/pikachurun_00001.png)";
    }
    else{
        display.style.backgroundImage = "url(./images/pikachurun_00000.png)";
    }
}


function checkSyntax(expArr) {
    if (/[\+\-\*\/]{2,}/.test(expArr) || /^[\+\-\*\/]/.test(expArr) || /[\+\-\*\/]$/.test(expArr)) {
        return false;
    }
    return true;
}

function calculateVal(exp) {
    if (!(checkSyntax(exp))) {
        disp = 'error';
    } else {
        let result = exp.split(/\s*(\+|\-|\*|\/)\s*/);
        let temp = [];

        for (let i = 0; i < result.length; i++) {
            if (result[i] === '*' || result[i] === '/') {
                let num1 = parseFloat(temp.pop());  
                let num2 = parseFloat(result[i + 1]); 
                let op = result[i];

                if (op === '*') {
                    temp.push(num1 * num2);
                }
                else if (num2 === 0) {
                    disp = 'error';
                    display.innerText = disp;
                    return;
                }
                else {
                    temp.push(num1/num2);
                }
                i++;
            } 
            else {
                temp.push(result[i]);
            }
        }

        let final = parseFloat(temp[0]);  

        for (let i = 1; i < temp.length; i += 2) {
            let operator = temp[i];
            let nextNumber = parseFloat(temp[i + 1]); 

            if (operator === '+') {
                final += nextNumber;
            } else if (operator === '-') {
                final -= nextNumber;
            }
        }
        let a = Math.round(final * 100000000000) / 100000000000;
        disp = a;
    }

    display.innerText = disp;
}


for (const button of buttons) {
    button.addEventListener('click', function() {
        state = !(state);
        changeImg();
        buttonClickSound.play();
        
        const dataAction = button.getAttribute('data-action');
        if (disp === 'error'){
            disp = "";
            display.textContent =  disp;
        }
        if (!isNaN(dataAction)) {
            disp += dataAction;
        } else {
            if (dataAction === '=') {
                calculateVal(disp);
            } else if (dataAction === '.' && disp.includes('.')) {
                disp = disp;
            } else if(dataAction === 'delete'){
                disp= disp.slice(0, -1);
                display.innerText = disp;
            }
            else if(dataAction === 'clear'){
                disp = "";
                display.innerText = disp;
            }
            else {
                disp += dataAction;
            }
        }
        
        display.innerText = disp;
    });
}


const clearbtn = document.getElementById('clear');
const delbtn = document.getElementById('delete');







