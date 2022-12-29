const Model = require("./Model");

class Vote extends Model {
  static get tableName() {
    return "votes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "quizId", "score"],
      properties: {
        userId: { type: ["string", "integer"] },
        quizId: { type: ["string", "integer"] },
        score: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Quiz, User } = require("./index.js");

    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "votes.quizId",
          to: "quizzes.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Vote;
