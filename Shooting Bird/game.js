window.addEventListener('load', function () {
  let timer = document.querySelector('#timeText');
  let storedname = localStorage.getItem("name");
  let nameWelcome = document.getElementById("userName");
  let greeting = document.querySelector('#greating');
  let DateText = document.querySelector('#DateText');
  let start = document.querySelector('#start');
  let container4 = document.querySelector('.container4');
  let playAgain = document.querySelector('#playAgain');
  let result = document.querySelector('#container5');
  left = window.innerWidth;
  top = window.innerHeight;
  let killedBirds = 0;
  let score = 0;
  let minute = 60;
  let imagList = [
    "./assets/images/blue.gif",
    "./assets/images/black.gif",
    "./assets/images/white.gif"
  ]

  //______________Getting the user data__________________//

  nameWelcome.innerHTML += `${storedname}`;
  DateText.innerHTML = new Date().toLocaleString();


  //______________Greating the user __________________//

  greeting.innerHTML += `Welcome  ${storedname}`;
  //____________________BOUNS_______________________//

  let date = localStorage.getItem('date');
  document.querySelector("#LastVist").innerText = `your last date :${date}`;

  let lastScore = localStorage.getItem("score");
  console.log(lastScore);
  document.querySelector('.UserScore').innerText = `your last score : ${lastScore}`;
  if (lastScore != null) {
    document.querySelector(".UserScore").innerText = ` your last score :${lastScore}`;
  }
  else {
    document.querySelector(".UserScore").innerText = `0`;
  }
  //________________Start The Game______________//

  start.addEventListener("click", function () {
    container4.style.display = "none";
    secPass();
    createBird();
    createBomb();

  });
  //_____________Setting the timer____________________//

  function secPass() {
    let countDown = setInterval(function () {
      let remainingSec = minute % 60;

      if (remainingSec < 1) {

        remainingSec = + remainingSec;

      }
      if (minute < 1) {

        minute = + minute;

      }
      timer.innerHTML = "Time : " + '0' + ":" + remainingSec;

      if (minute > 0) {

        minute = minute - 1;

      } else if (minute == 0) {



        clearInterval(countDown);


        console.log(minute);
        timer.innerHTML = "Time:" + 'Time Out!';

        let bird = document.querySelectorAll('.bird');
        bird.forEach(bird => { document.querySelector('body').removeChild(bird); });
        if (score > 50) {
          document.querySelector('div h2[name=winner]').innerText = "YOU WIN!";
          document.querySelector('div img[name=winnerimg]').src = "./assets/images/happybird.png";
          result.classList.remove('hidden');
        }
        else {
          document.querySelector('div h2[name=winner]').innerText = "YOU LOSED";
          document.querySelector('div img[name=winnerimg]').src = "./assets/images/sadbird.png";
          result.classList.remove('hidden');
        }
      }
      localStorage.setItem("score", score.toLocaleString());
      localStorage.setItem("date", new Date().toLocaleString());

    }, 1000);

  };

  //________________Bomb Falling Down _____________________//

  let fallingBomb = function (bomb, top) {
    let random = Math.floor(Math.random() * (window.innerWidth - bomb.width)) + 'px';
    let movementTime = setInterval(() => {
      top += 10;
      if (top < (window.innerHeight - bomb.height)) {

        bomb.style.top = top + 'px';
        bomb.style.left = random + 'px;'
      }
      else {

        clearInterval(movementTime);
        createBomb();

        if (document.querySelector('body').contains(bomb) || minute == 0) {
          document.querySelector('body').removeChild(bomb);
        }
      }
    }, 50);
    if (minute == 0) {
      clearInterval(movementTime);
      document.querySelector('body').removeChild(bomb);
    }

  }
  //_________________Creating the bomb________________//

  const createBomb = () => {
    let bomb = document.createElement('img');
    bomb.src = "./assets/images/bomb.png";
    bomb.classList.add('bomb');
    document.querySelector('body').append(bomb);
    bomb.style.left = Math.floor(Math.random() * (window.innerWidth - bomb.width)) + 'px';
    fallingBomb(bomb, 0);
    bomb.addEventListener('click', function () {
      bomb.src = "./assets/images/fire.png";

      let birds = document.querySelectorAll('.bird');
      birds.forEach(bird => {
        let bombLeft = 150 + bird.offsetLeft + bird.offsetWidth > bomb.offsetLeft && bird.offsetLeft + bird.offsetWidth < bomb.offsetLeft + bomb.offsetWidth + 410;
        let bombTop = 150 + bird.offsetTop + bird.offsetWidth > bomb.offsetTop && bird.offsetTop + bird.offsetWidth < bomb.offsetTop + bomb.offsetWidth + 410;

        if (bombLeft && bombTop) {
          cuurentScore(bird);
          killedBirds++;
          bird.remove();
          bomb.remove();
        }
        document.querySelector('#userScore').innerHTML = `${score}`;

        document.querySelector('#userkilletbird').innerHTML = `${killedBirds}`;

      });
      setTimeout(() => {
        if (document.querySelector('body').contains(bomb)) {
          document.querySelector('body').removeChild(bomb);
        }
      }, 500);
    })
  };

  //_______________Moving The Bird In The Page___________________//

  const moveRight = function (imageObject, left) {
    let id = setInterval(function () {
      left += 10;
      let random = Math.floor(Math.random() * (window.innerHeight - 200)) + 'px';
      if (left < (innerWidth - imageObject.width)) {

        imageObject.style.left = left + 'px';
        imageObject.style.top = random + 'px;'

      }
      else {
        if (minute == 0) {
          clearInterval(id);

        }


        if (document.querySelector('body').contains(imageObject)) {
          document.querySelector('body').removeChild(imageObject);
        }
      }
    }, 30);
  }

  //_____________Creating the Bird and its movement_____________//

  let createBird = function () {
    let randombirds = setInterval(function () {
      let imageObject = document.createElement('img');
      imageObject.src = imagList[Math.floor(Math.random() * 3)];
      imageObject.classList.add("bird");
      imageObject.style.top = Math.floor(Math.random() * (window.innerHeight - 200)) + 'px';
      document.querySelector('body').append(imageObject);

      moveRight(imageObject, 0);
      if (minute == 0) {
        clearInterval(randombirds);

      }

    }, 1000);
  }
  // ________________________Geting The Score____________________//

  const cuurentScore = (bird) => {

    if (bird.src.slice(21) == '/assets/images/white.gif') {
      score += 5;

    }
    else if (bird.src.slice(21) == '/assets/images/black.gif') {
      score += 10;

    }
    else if (bird.src.slice(21) == '/assets/images/blue.gif') {
      score -= 10;

    }

  }
  playAgain.onclick = () => {
    result.classList.add('hidden');
    location.reload();
  }

});



