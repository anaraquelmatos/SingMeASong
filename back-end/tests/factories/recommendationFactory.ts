import { faker } from "@faker-js/faker";

import { prisma } from "./../../src/database.js";

export default async function createRecommendation() {
  const category = await prisma.recommendation.create({
    data: {
      name: faker.science.chemicalElement().name,
      youtubeLink: faker.internet.url()
    }
  });

  return category;
}