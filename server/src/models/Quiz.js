const Model = require("./Model");

class Quiz extends Model {
  static get tableName() {
    return "quizzes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "answer", "categoryId", "userId"],
      properties: {
        content: { type: "string" },
        answer: { type: "string" },
        categoryId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Category, User, Vote } = require("./index.js");

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "quizzes.categoryId",
          to: "categories.id",
        },
      },
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
