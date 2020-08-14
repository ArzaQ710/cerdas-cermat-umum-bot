const { Composer, Markup, Context } = require("micro-bot");
const fetch = require("node-fetch");

const ccu_tbot = new Composer();

const nextQuestionDelay = 10;
let gamestart = false;
let nocorrectanswer = 0;
let answersForCurrentQuestion = {};
let lockGiveScore = false;
let nextQuestionTimeout = 0;

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
          `${question.question.question}\nA: ${answersForCurrentQuestion[0].answer}\nB: ${answersForCurrentQuestion[1].answer}\nC: ${answersForCurrentQuestion[2].answer}\nD: ${answersForCurrentQuestion[3].answer}`,
          Markup.keyboard([
            ["A", "B"],
            ["C", "D"],
          ])
            .oneTime()
            .resize()
            .extra()
        );

        // ctx.reply(question.question.question);
        console.log(question.question.question);
        nocorrectanswer++;

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
  lockGiveScore = true;
  fetch(
    `http://azmiarzaq.000webhostapp.com/ccu_tbot/api/scores/?uid=${uid}&player_name=${player_name}`
  )
    .then(() => {
      lockGiveScore = false;

      ctx.reply(`${player_name} got the point`);

      clearTimeout(nextQuestionTimeout);

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

  if (Boolean(answersForCurrentQuestion[answerIndex].correct)) {
    const uid = ctx.from.id;
    const player_name = `${ctx.from.first_name} ${ctx.from.last_name}`;

    if (!lockGiveScore) {
      giveScore(uid, player_name, ctx);
    }
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
          startGame(ctx);
        }, 1000 * nextQuestionDelay);
      })
      .catch((err) => console.log(err));
  } else {
    nocorrectanswer = 0;
  }

  /**
   * Get random question
   *
   * Set active question
   *
   * Send question
   *
   * Wait for answer for n second and repeat the whole proccess
   *
   * If someone answers correctly
   *
   * then
   *
   * Update scoreboard
   *
   * else
   *
   * Increase nocorrectanswer counter
   *
   * If nocorrectanswer counter == 5
   *
   * then stop game
   */
};

ccu_tbot.command("start", (ctx) => {
  ctx.reply("Ok. I'm listening");
});

ccu_tbot.command("startgame", (ctx) => {
  gamestart = true;
  ctx.reply("Lets rock");
  startGame(ctx);
});

ccu_tbot.command("help", (ctx) => ctx.reply("What can i help?"));

ccu_tbot.hears(/A|B|C|D/g, (ctx) => {
  gamestart = true;
  ctx.reply("Lets rock");
  checkAnswer(ctx, ctx.message.text);
});

ccu_tbot.action("answer-a", (ctx) => {
  checkAnswer(0, ctx);
});
ccu_tbot.action("answer-b", (ctx) => {
  checkAnswer(1, ctx);
});
ccu_tbot.action("answer-c", (ctx) => {
  checkAnswer(2, ctx);
});
ccu_tbot.action("answer-d", (ctx) => {
  checkAnswer(3, ctx);
});

module.exports = ccu_tbot;
