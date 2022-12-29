import VoteSerializer from "./VoteSerializer.js";

class QuizSerializer {
  static async getSummary(quiz) {
    const allowedAttributes = ["id", "content", "answer", "userId"];
    let serializedQuiz = {};
    for (const attribute of allowedAttributes) {
      serializedQuiz[attribute] = quiz[attribute];
    }

    serializedQuiz.user = await quiz.$relatedQuery("user").email;
    const votes = await quiz.$relatedQuery("votes");
    serializedQuiz.totalScore = 0;
    serializedQuiz.votes = await Promise.all(
      votes.map(async (vote) => {
        const serializedVote = await VoteSerializer.getSummary(vote);
        serialized.totalScore += vote.score;
        return serializedVote;
      })
    );
    return serializedQuiz;
  }
}

export default QuizSerializer;
