/* eslint-disable no-console */
import { connection } from "../boot.js";
import CategorySeeder from "./seeders/CategorySeeder.js";
import QuizSeeder from "./seeders/QuizSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding categories...");
    await CategorySeeder.seed();
    console.log("seeding users...");
    await UserSeeder.seed();
    console.log("seeding quizzes...");
    await QuizSeeder.seed();
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
