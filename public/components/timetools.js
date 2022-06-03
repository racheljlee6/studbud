// STOPWATCH JS //

//added hour to stopwatch based on user feedback
let [secs, mins, hr] = [0, 0, 0];
//where default time is 00:00:00
let defaultTime = document.querySelector('.stopwatchDisplay');
//where int is time intervals
let int = null;

// referred to js timing events from https://www.w3schools.com/js/js_timing.asp 
document.getElementById('startTimer').addEventListener('click', () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(cycleStopwatch, 10);
});

document.getElementById('stopTimer').addEventListener('click', () => {
  clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(int);
  [secs, mins, hr] = [0, 0, 0];
  defaultTime.innerHTML = '00 : 00 : 00';
});

//cycle through time
function cycleStopwatch() {
  secs++;
  if (secs >= 60) {
    secs = 0;
      mins++;
      if (mins >= 60) {
          mins = 0;
          hr++;
      }
  }
  
  // conditional operatation
  let h = hr < 10 ? "0" + hr : hr;
  let m = mins < 10 ? "0" + mins : mins;
  let s = secs < 10 ? "0" + secs : secs;

  // modify content of HTML element through innerhtml
  defaultTime.innerHTML = `${h} : ${m} : ${s}`;
}



// POMODORO JS //

// variables for timer based on each feature time period
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 30,
  //longBreakInterval: 4,
};

let interval;

const startStop = document.getElementById('pomoButton');

startStop.addEventListener('click', () => {
  const { action } = startStop.dataset;
  if (action === 'start') {
    startPomo();
  } 
  
  else {
    stopPomo();
  }});


// function to update countdown with clicked time 
const pomodoroModes = document.querySelector('#pomodoro-modes');

pomodoroModes.addEventListener('click' , handleMode);

// function to find diff between current time and end time and return in milliseconds
function getTimeLeft(endT) {

  //retriveve exact time of current moment
  // where currentT = current time the clock is at
  const currentT = Date.parse(new Date());
  const diff = endT - currentT;

  // converting to base 10
  // where t = total, m = minutes and s= seconds.
  const t = Number.parseInt(diff / 1000, 10);
  const minute = Number.parseInt((t / 60) % 60, 10);
  const second = Number.parseInt(t % 60, 10);

  return {
    t, minute, second,
  };
}


// start time by count down to 0
function startPomo() {
  let { t } = timer.remainingTime;
  // where endT = time the clock will end
  const endT = Date.parse(new Date()) + t * 1000;

  startStop.dataset.action = 'stop';
  startStop.textContent = 'stop';
  startStop.classList.add('active');

  interval = setInterval(function() {
    // update clock time with new time
    timer.remainingTime = getTimeLeft(endT);
    clockUpdate();

    //stop timer when reach 0 
    t = timer.remainingTime.t;

    if (t <= 0) {
      clearInterval(interval);
    }
  }, 
  1000);
}   


// stop timer when clicked
function stopPomo() {
  clearInterval(interval);

  startStop.dataset.action = 'start';
  startStop.textContent = 'start';
  startStop.classList.remove('active');
}


//update countdown clock
function clockUpdate() {
  const { remainingTime } = timer;
  // https://www.w3schools.com/js/js_string_methods.asp
  // pads a string withh another string
  const minute = `${remainingTime.minute}`.padStart(2, '0');
  const second = `${remainingTime.second}`.padStart(2, '0');

  const min = document.getElementById('pomoMins');
  const sec = document.getElementById('pomoSecs');
  // return text content of specified element
  min.textContent = minute;
  sec.textContent = second;
}

// change betwwen modes
function changeMode(mode) {
  timer.mode = mode;
  timer.remainingTime = 
  {
    t: timer[mode] * 60,
    minute: timer[mode],
    second: 0,
  };

    //remove active from mode buttons and set for clicked button.
  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  clockUpdate();
}


// retrieve data-mode attribute value 
//if data-mode attribute doesnt exisit the target was not one of the buttons and the function ends 
function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  changeMode(mode);
  
  stopPomo();
}

// make default mode to be pomodoro and reset values
document.addEventListener('DOMContentLoaded', () => {
  changeMode('pomodoro');
});





