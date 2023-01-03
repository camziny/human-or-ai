const Model = require("./Model");

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1 },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Quiz } = require("./index.js");

    return {
      quizzes: {
        relation: Model.HasManyRelation,
        modeClass: Quiz,
        join: {
          from: "categories.id",
          to: "quizzes.categoryId",
        },
      },
    };
  }
}

module.exports = Category;
