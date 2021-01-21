'use strict';
const messageEl = document.getElementById('msg');

const randomNumber = Math.trunc(Math.random() * 100) + 1;

console.log('Number :', randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and gam
recognition.start();

// Capture user speak
const onSpeak = function (e) {
  const message = e.results[0][0].transcript;

  writeMessage(message);
  checkNumber(message);
};

// Write what users speak
const writeMessage = function (message) {
  messageEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${message}</span> 
    `;
};

// Check message against Number
const checkNumber = function (message) {
  const num = +message;

  // Check if valid number
  if (Number.isNaN(num))
    messageEl.innerHTML += '<div>That is not a valid number</div>';

  // Check in range
  if (num > 100 || num < 1)
    messageEl.innerHTML += '<div>Number must be between 1 and 100</div>';

  // Check number
  if (num === randomNumber)
    document.body.innerHTML = `<h2>Congrats you have guessed the number! <br><br>
     It was ${num}</h2>
      <button class="btn--play__again">Play again</button> 
     `;

  if (num > randomNumber) messageEl.innerHTML += '<div>Go Lower</div>';
  if (num < randomNumber) messageEl.innerHTML += '<div>Go Higher</div>';
};

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', function () {
  recognition.start();
});

document.body.addEventListener('click', function (e) {
  if (e.target.className === 'btn--play__again') window.location.reload();
});
