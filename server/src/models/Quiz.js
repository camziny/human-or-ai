const Model = require("./Model");

class Quiz extends Model {
  static get tableName() {
    return "quizzes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "answer"],
      properties: {
        content: { type: "string" },
        answer: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { User, Vote } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "quizzes.userId",
          to: "users.id",
        },
      },
      userVotes: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "quizzes.id",
          through: {
            from: "votes.quizId",
            to: "votes.userId",
          },
          to: "users.id",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "quizzes.id",
          to: "votes.quizId",
        },
      },
    };
  }
}

module.exports = Quiz;
