const btnAdd = document.getElementById("btnAdd");
const app = document.getElementById("app");
const btnStartAll = document.getElementById("startAll");
const btnStopAll = document.getElementById("stopAll");
const btnResetAll = document.getElementById("resetAll");
const min = "00";
const sec = "00";
let index = 1;
let listTimer = [];

btnAdd.addEventListener(`click`, () => {
    const myClock = new Clock();
    myClock.render(app, index);
    index++;
    listTimer.push(myClock);
    console.log(listTimer);
});

class Clock {

    timeClock = null;
    countUp = 0;
    btnStart = null;
    btnStop = null;
    btnReset = null;
    change = 0;

    constructor() {
        this.timeClock = document.createElement("span");
        this.btnStart = document.createElement("button");
        this.btnStop = document.createElement("button");
        this.btnReset = document.createElement("button");

        this.countUp = 0; 
        this.change = 0;
        this.timeClock.innerHTML = `00:00:00`;  
        this.btnStart.innerHTML = `Start`;
        this.btnStop.innerHTML = `Stop`;
        this.btnReset.innerHTML = `Reset`;
        
        this.btnStop.style.display = "none";

        this.btnStart.addEventListener(`click`, () => {
            this.startTime();
        });
        this.btnStop.addEventListener(`click`, () => {
            this.stopTime();
        });
        this.btnReset.addEventListener(`click`, () => {
            this.resetTime();
        });
    };
    
    render = (container, index) => {
        const div = document.createElement("div");
        div.insertAdjacentHTML(`beforeend`, `<span>${index}.<span>`);
        div.appendChild(this.timeClock);
        div.appendChild(this.btnStart);
        div.appendChild(this.btnStop);
        div.appendChild(this.btnReset);
        container.appendChild(div);
        this.timeClock.classList.add("timeclock");
        div.classList.add("player")
    }

    startTime() {
        if(this.change === 0) {
            this.change = 1;
            this.btnStart.style.display = "none";
            this.btnStop.style.display = "inline-block";
            this.timeInterval = setInterval(() => {
                this.countUp++;
                let min = Math.floor(this.countUp/6000);
                let sec = (Math.floor(this.countUp/100))%60;
                let persec = this.countUp%100;
                if(persec < 10) {
                    persec = `0${persec}`;
                };
                if (sec < 10) {
                    sec = `0${sec}`;
                };               
                if(min < 10) {
                    min = `0${min}`;
                };
                this.timeClock.innerHTML = `${min}:${sec}:${persec}`;
            },10);
        };
    };
    stopTime() {
        this.change = 0;
        this.btnStart.style.display = "inline-block";
        this.btnStop.style.display = "none";
        clearInterval(this.timeInterval);
    };
    resetTime() {
        clearInterval(this.timeInterval);
        this.timeClock.innerHTML = `00:00:00`;
        this.btnStart.style.display = "inline-block";
        this.btnStop.style.display = "none";
        this.change = 0;
        this.countUp = 0;
    };

};


startAll = function() {
    for(let i = 0; i < listTimer.length; i++) {
        listTimer[i].startTime();
    };
};
stopAll= function() {
    for(let i = 0; i < listTimer.length; i++) {
        listTimer[i].stopTime();
    };
};
resetAll = function() {
    for(let i = 0; i < listTimer.length; i++) {
        listTimer[i].resetTime();
    };
};

btnStartAll.addEventListener(`click`, startAll);
btnStopAll.addEventListener(`click`, stopAll);
btnResetAll.addEventListener(`click`, resetAll);

