let [sec, min] = [0, 0];
//where default time is 00:00
let defaultTime = document.querySelector('.stopwatchDisplay');
//where int is time intervals
let int = null;

// referred to js timing events from https://www.w3schools.com/js/js_timing.asp 
document.getElementById('startTimer').addEventListener('click', () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(showStopwatch, 10);
});

document.getElementById('stopTimer').addEventListener('click', () => {
  clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(int);
  [sec, min] = [0, 0];
  defaultTime.innerHTML = '00 : 00';
});

function showStopwatch() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;

  defaultTime.innerHTML = `${m} : ${s}`;
}