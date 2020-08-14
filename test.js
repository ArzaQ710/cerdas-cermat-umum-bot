// const fetch = require("node-fetch");

// let gamestart = false;
// let nocorrectanswer = 0;

// const getRandomQuestion = () => {
//   return new Promise((resolve, reject) => {
//     fetch("http://azmiarzaq.000webhostapp.com/ccu_tbot/api/question/")
//       .then((response) => response.json())
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((err) => reject(err));
//   });
// };

// const sendQuestion = () => {
//   return new Promise((resolve) => {
//     getRandomQuestion().then((question) => {
//       console.log(question.question.question);
//       nocorrectanswer++;
//     });

//     resolve(true);
//   });
// };

// const startGame = () => {
//   console.log("Game started");

//   if (nocorrectanswer > 4) {
//     gamestart = false;
//   }

//   if (gamestart) {
//     sendQuestion().then(() => {
//       setTimeout(() => {
//         startGame();
//       }, 3000);
//     });
//   }
// };

// gamestart = true;
// startGame();

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Used like so
var arr = [2, 11, 37, 42];
shuffle(arr);
console.log(arr);
