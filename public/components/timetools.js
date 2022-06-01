//added hour to stopwatch based on user feedback
let [sec, min, hr] = [0, 0, 0];
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
  [sec, min, hr] = [0, 0, 0];
  defaultTime.innerHTML = '00 : 00 : 00';
});

//cycle through time
function cycleStopwatch() {
  sec++;
  if (sec >= 60) {
      sec = 0;
      min++;
      if (min >= 60) {
          min = 0;
          hr++;
      }
  }
  
  let h = hr < 10 ? "0" + hr : hr;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;

  defaultTime.innerHTML = `${h} : ${m} : ${s}`;
}