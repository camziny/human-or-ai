import QuizSerializer from "./QuizSerializer.js";

class CategorySerializer {
  static async getSummary(category) {
    const allowedAttributes = ["id", "name", "description"];
    let serializedCategory = {};
    for (const attribute of allowedAttributes) {
      serializedCategory[attribute] = category[attribute];
    }
    return serializedCategory;
  }
  static async getDetails(category) {
    const allowedAttributes = ["name", "description", "quizzes"];
    let serializedCategory = {};
    for (const attribute of allowedAttributes) {
      serializedCategory[attribute] = category[attribute];
    }
    const quizzes = await category.$relatedQuery("quizzes");
    serializedCategory.quizzes = await Promise.all(
      quizzes.map(async (quiz) => await QuizSerializer.getSummary(quiz))
    );
    return serializedCategory;
  }
}

export default CategorySerializer;
