import { Quiz } from "../../models/index.js";

class QuizSeeder {
  static async seed() {
    const quizData = [
      {
        content: "https://trip-production.s3.amazonaws.com/teenager+wearing+nike.png",
        answer: "AI",
        categoryId: 3,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/A+big+wave+in+Hawaii.png",
        answer: "AI",
        categoryId: 1,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/a+bedroom+in+the+style+of+picasso.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/A+luxury+Airbnb+treehouse.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/A+hummingbird+at+a+birdfeeder.png",
        answer: "AI",
        categoryId: 1,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/A+water+bottle+on+a+bar+counter.png",
        answer: "AI",
        categoryId: 3,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/A+painting+of+the+english+garden+in+munich+in+the+style+of+Monet.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room+2.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room+3.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room+4.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room+5.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/A+wooden+residential+building+in+the+style+of+zaha+hadid.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/snow+cabin+in+the+style+of+norman+foster+.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room+6.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Living+Room+7.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/House.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/House+2.png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/A+tornado+in+a+field+in+kasas+(google).png",
        answer: "Human",
        categoryId: 1,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/A+tornado+in+a+field+in+kansas.png",
        answer: "AI",
        categoryId: 1,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/A+hummingbird+at+a+birdfeeder(google).png",
        answer: "Human",
        categoryId: 1,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Thunder+on+top+of+a+mountain.png",
        answer: "AI",
        categoryId: 1,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/Thunder+on+top+of+a+mountain+(google).png",
        answer: "Human",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Cherry+blossoms+in+spring.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Cherry+blossoms+in+spring(google).png",
        answer: "Human",
        categoryId: 1,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/Mushrooms+growing+by+a+tree+in+the+forest.png",
        answer: "AI",
        categoryId: 1,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/Mushrooms+growing+by.+a+tree+in+the+forest+(google).png",
        answer: "Human",
        categoryId: 1,
        userId: 2,
      },
      {
        content: "https://trip-production.s3.amazonaws.com/Sunset+over+a+lake+in+spring.png",
        answer: "AI",
        categoryId: 2,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/Sunset+over+a+lake+in+spring+(google).png",
        answer: "Human",
        categoryId: 1,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/A+painting+of+a+man+writing+a+letter+by+a+fireplace+in+the+style+of+van+gogh.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+painting+of+a+man+writing+a+letter+by+a+fireplace+in+the+style+of+van+gogh+(google).png",
        answer: "Human",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+90s+popstar+in+the+style+of+andy+warhol+(google).png",
        answer: "Human",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+painting+of+the+collapse+of+the+21st+century+in+the+style+of+Salvador+Dali.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+painting+of+the+collapse+of+the+21st+century+in+the+style+of+Salvador+Dali+(google).png",
        answer: "Human",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+painting+of+frida+kahlo+about+life+in+the+style+of+frida+kahlo.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+painting+of+frida+kahlo+thinking+about+life+in+the+style+of+frida+kahlo+(google).png",
        answer: "Human",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+fancy+tea+kettle+on+a+kitchen+counter.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+luxury+mercedes+parked+by+the+beach.png",
        answer: "AI",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+luxury+mercedes+parked+by+the+beach+(google)+(2).png",
        answer: "Human",
        categoryId: 4,
        userId: 2,
      },
      {
        content:
          "https://trip-production.s3.amazonaws.com/a+high+definition+studio+image+of+a+diamond+ring+in+its+case.png",
        answer: "AI",
        categoryId: 3,
        userId: 2,
      },
    ];
    for (const singleQuizData of quizData) {
      const currentQuiz = await Quiz.query().findOne(singleQuizData);
      if (!currentQuiz) {
        await Quiz.query().insert(singleQuizData);
      }
    }
  }
}

export default QuizSeeder;
