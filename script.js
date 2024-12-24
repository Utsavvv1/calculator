const buttons = document.querySelectorAll('.key');
let state = false;
const display = document.getElementById('display');



const buttonClickSound = new Audio('/sounds/SFX_PRESS_AB1.wav');
function changeImg(){
    if(state){
        display.style.backgroundImage = "url(/images/pikachurun_00001.png)";
    }
    else{
        display.style.backgroundImage = "url(/images/pikachurun_00000.png)";
    }
}



for (const button of buttons) {
    button.addEventListener('click', function() {
       state = !(state);
    //    alert(`state is ${state}`);
       changeImg();
       buttonClickSound.play();
    });
}