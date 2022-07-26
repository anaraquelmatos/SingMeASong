import { prisma } from "./../src/database.js";
import createRecommendation from "./factories/recommendationFactory.js";
import { deleteAllData } from "./factories/scenarioFactory.js";
import App from "./../src/app.js";

import supertest from "supertest";

beforeEach(async () => {
    await deleteAllData();
});


describe("User tests suite", () => {
    it("given name and youtubeLink, create recommendation", async () => {
        const recommendation = await createRecommendation();
        const response = await supertest(App).post(`/recommendations`).send(recommendation);
        expect(response.statusCode).toBe(422);

        const register = await prisma.recommendation.findFirst({
            where: { name: recommendation.name }
        });

        expect(register.name).toBe(recommendation.name);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});