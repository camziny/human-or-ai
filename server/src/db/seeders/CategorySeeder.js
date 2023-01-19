import { Category } from "../../models/index.js";

class CategorySeeder {
  static async seed() {
    const categoryData = [
      {
        name: "Nature",
        description: "Images of Nature",
      },
      {
        name: "Buildings and Architecture",
        description: "Images of Buildings and Architecture",
      },
      {
        name: "Product",
        description: "Images of Products",
      },
      {
        name: "Artwork",
        description: "Images of Artwork",
      },
    ];
    for (const singleCategoryData of categoryData) {
      const currentCategory = await Category.query().findOne(singleCategoryData);
      if (!currentCategory) {
        await Category.query().insert(singleCategoryData);
      }
    }
  }
}

export default CategorySeeder;
