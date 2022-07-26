import { prisma } from "./../../src/database.js";
import createRecommendation from "./recommendationFactory.js";


export async function createScenarioOneTeacherWithOneTest() {
    const recommendation = await createRecommendation();

    return {
        recommendation
    }
}

export async function deleteAllData() {
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE recommendations`
    ]);
}