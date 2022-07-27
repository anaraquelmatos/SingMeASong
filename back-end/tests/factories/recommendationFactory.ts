import { faker } from "@faker-js/faker";

import { prisma } from "./../../src/database.js";

interface Recommendation {
    name: string,
    youtubeLink: string
}

export async function deleteAllData() {
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE recommendations`
    ]);
}

async function invalidLink() {
    const name = faker.science.chemicalElement().name;
    const youtubeLink = faker.internet.url();

    return { name, youtubeLink };
}

async function validRecommendation() {
    const name = faker.science.chemicalElement().name;
    const youtube = faker.company.catchPhraseDescriptor();

    const youtubeLink = `https://www.youtube.com/watch?${youtube}`;

    return { name, youtubeLink };
}

async function insert(data: Recommendation) {
    await prisma.recommendation.create({ data });
}

const recommendations = {
    deleteAllData,
    invalidLink,
    validRecommendation,
    insert
}

export default recommendations;