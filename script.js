const mainBnt = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const time = document.querySelector('#pomodoro-time');
const pomodoroModeBtn = document.querySelector('#pomodoro');
const restModeBtn = document.querySelector('#break');
let timerId;

function clickButton() {

    if (mainBnt.textContent == 'start') {
        timerId = setInterval(tick, 10);
        mainBnt.textContent = 'stop';
    }
    else if (mainBnt.textContent == 'stop') {
        clearInterval(timerId);
        mainBnt.textContent = 'start';
    }

}

function tick() {

    let timeData = time.textContent;
    let min = +timeData.substring(0, 2);
    let sec = +timeData.substring(3, 5);
    let amountTime = min * 60 + sec;

    amountTime--;
    let remainMin = Math.floor(amountTime / 60);
    let remainSec = amountTime % 60;

    if (remainMin < 10) {
        remainMin = "0" + remainMin;
    }

    if (remainSec < 10) {
        remainSec = "0" + remainSec;
    }


    if (remainSec <= 0 && remainMin <= 0) {
        if(pomodoroModeBtn.classList.contains('active')){
            remainMin = '25';
            remainSec = '00';
        } 
        else {
            remainMin = '05';
            remainSec = '00';
        }
        
        mainBnt.textContent = 'start';
        clearInterval(timerId);
    }

    time.textContent = `${remainMin}:${remainSec}`;

}

function setPomodoroTimer() {
    clearInterval(timerId);
    restModeBtn.classList.remove('active');
    pomodoroModeBtn.classList.add('active');
    time.textContent = '25:00'
}

function setRestTimer(){
    clearInterval(timerId);
    restModeBtn.classList.add('active');
    pomodoroModeBtn.classList.remove('active');
    time.textContent = '05:00';
}

function resetTimer() {
    if(pomodoroModeBtn.classList.contains('active'))
        {
            setPomodoroTimer();
            mainBnt.textContent = 'start';

        }
        else if(restModeBtn.classList.contains('active')){
            setRestTimer();
            mainBnt.textContent = 'start';
        }
}


mainBnt.addEventListener('click', () => clickButton());

pomodoroModeBtn.addEventListener('click', () => setPomodoroTimer());

restModeBtn.addEventListener('click', () => setRestTimer());

resetBtn.addEventListener('click', ()=>resetTimer());
