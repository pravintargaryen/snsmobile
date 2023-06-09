import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js'
import {getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js'


const appSettings = {
    databaseURL : "https://snapnsnap-c7e72-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsements = ref(database, "messages")

const input = document.querySelector(".input-text")
const button = document.querySelector(".send")
const success = document.querySelector(".success-text")
const chat = document.querySelector(".chat")

import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";

const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const run = () => {
  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    );
  }, 250);
};


button.addEventListener("click", function() {
    if (input.value.length > 0) {
        let inputValue = input.value 

        push(endorsements, inputValue)
        input.value = ""
        chat.style.display = "none"
        input.style.display = "none"
        button.style.display = "none"
        run();
        window.stop();

    }
    

})

onValue(endorsements, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    success.innerHTML = ""
    for (let i=0; i< itemsArray.length; i++) {
        success.innerHTML += `<p class="resultlist">${itemsArray[i]}</p>`
    }
})





