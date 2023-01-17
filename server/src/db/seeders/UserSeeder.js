import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "humanoraiseeder@gmail.com",
        cryptedPassword: "SeedingHumanOrAI",
      },
      {
        email: "humanoraiseeder@hotmail.com",
        cryptedPassword: "SeedingHumanOrAI",
      },
    ];

    for (const singleUserData of usersData) {
      const currentUser = await User.query().findOne(singleUserData);
      if (!currentUser) {
        await User.query().insert(singleUserData);
      }
    }
  }
}

export default UserSeeder;
