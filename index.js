const { Composer, Markup, Stage, Scene, session } = require("micro-bot");
const fetch = require("node-fetch");

const ccu_tbot = new Composer();

const gameStartScene = new Scene("GAME_START_SCENE");

const stage = new Stage();
stage.register(gameStartScene);

ccu_tbot.use(session());
ccu_tbot.use(stage);

const nextQuestionDelay = 5;
let gamestart = false;
let nocorrectanswer = 0;
let answersForCurrentQuestion = {};
let giveScoreLocked = false;
let nextQuestionTimeout = 0;

gameStartScene.enter((ctx) => {
  gamestart = true;
  ctx.reply("Lets rock");
  startGame(ctx);
});
gameStartScene.leave((ctx) => {
  ctx.reply(
    "I think it's enough. Looks like no one answers correctly for five times in a row"
  );
});
gameStartScene.hears(/A|B|C|D/g, (ctx) => {
  console.log("Response: ", ctx.message.text);
  checkAnswer(ctx, ctx.message.text);
});

/**
 * @param array answers
 *
 * @returns array
 */
const shuffleAnswers = (answers) => {
  let currentIndex = answers.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = answers[currentIndex];
    answers[currentIndex] = answers[randomIndex];
    answers[randomIndex] = temporaryValue;
  }

  return answers;
};

/**
 * Get random question from database
 *
 * @returns Promise
 */
const getRandomQuestion = () => {
  return new Promise((resolve, reject) => {
    fetch("http://azmiarzaq.000webhostapp.com/ccu_tbot/api/question/")
      .then((response) => response.json())
      .then((responseJson) => {
        const answers = Object.values(responseJson.answers);

        answersForCurrentQuestion = shuffleAnswers(answers);

        resolve(responseJson);
      })
      .catch((err) => {
        console.log("Failed to get random random question"), err;
        reject(err);
      });
  });
};

/**
 * @param TelegrafContext ctx
 *
 * @returns Promise
 */
const sendQuestion = (ctx) => {
  return new Promise((resolve, reject) => {
    getRandomQuestion()
      .then((question) => {
        ctx.replyWithMarkdown(
          `${question.question.question}\n\nA: ${answersForCurrentQuestion[0].answer}\nB: ${answersForCurrentQuestion[1].answer}\nC: ${answersForCurrentQuestion[2].answer}\nD: ${answersForCurrentQuestion[3].answer}`,
          Markup.keyboard([
            ["A", "C"],
            ["B", "D"],
          ])
            .resize()
            .extra()
        );

        resolve(true);
      })
      .catch((err) => {
        reject(err);
        console.log("Failed to send question", err);
      });
  });
};

/**
 * @param integer uid
 * @param string player_name
 * @param TelegrafContext ctx
 */
const giveScore = (uid, player_name, ctx) => {
  giveScoreLocked = true;
  fetch(
    `http://azmiarzaq.000webhostapp.com/ccu_tbot/api/scores/?uid=${uid}&player_name=${player_name}`,
    {
      method: "POST",
    }
  )
    .then(() => {
      giveScoreLocked = false;
      gamestart = true;

      console.log(`${player_name} got the point`);

      ctx.reply(`${player_name} got the point`);
      // ctx.reply("Here we go again");

      startGame(ctx);
    })
    .catch((err) => console.log(err));
};

/**
 * @param TelegrafContext ctx
 * @param string answer
 */
const checkAnswer = (ctx, answer) => {
  let answerIndex = 0;

  switch (answer) {
    case "A":
      answerIndex = 0;
      break;
    case "B":
      answerIndex = 1;
      break;
    case "C":
      answerIndex = 2;
      break;
    case "D":
      answerIndex = 3;
      break;
    default:
      answerIndex = 0;
      break;
  }

  if (
    Boolean(answersForCurrentQuestion[answerIndex].correct) &&
    !giveScoreLocked
  ) {
    const uid = ctx.from.id;
    const player_name = `${ctx.from.first_name} ${ctx.from.last_name}`;

    clearTimeout(nextQuestionTimeout);
    giveScore(uid, player_name, ctx);
  }
};

/**
 * @param TelegrafContext ctx
 */
const startGame = (ctx) => {
  console.log("Game started");

  if (nocorrectanswer > 4) {
    gamestart = false;
  }

  if (gamestart) {
    sendQuestion(ctx)
      .then(() => {
        nextQuestionTimeout = setTimeout(() => {
          nocorrectanswer++;
          ctx.reply("Here we go again");
          startGame(ctx);
        }, 1000 * nextQuestionDelay);
      })
      .catch((err) => console.log(err));
  } else {
    clearTimeout(nextQuestionTimeout);

    nocorrectanswer = 0;

    ctx.scene.leave();

    console.log("Game stopped");
  }
};

ccu_tbot.command("start", (ctx) => {
  ctx.reply("Ok. I'm listening");
});
ccu_tbot.command("startgame", (ctx) => {
  ctx.scene.enter("gameStartScene");
});
ccu_tbot.command("help", (ctx) => ctx.reply("What can i help?"));

// ccu_tbot.hears(/A|B|C|D/g, (ctx) => {
//   console.log("Response: ", ctx.message.text);
//   checkAnswer(ctx, ctx.message.text);
// });

module.exports = ccu_tbot;
