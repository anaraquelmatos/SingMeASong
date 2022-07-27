import { prisma } from "./../src/database.js";
import App from "./../src/app.js";
import recommendations, { deleteAllData } from "./factories/recommendationFactory.js";

import supertest from "supertest";

beforeEach(async () => {
    await deleteAllData();
});

describe("User tests suite", () => {
    it("given name and invalid youtubeLink, create recommendation", async () => {
        const recommendation = await recommendations.invalidLink();
        const response = await supertest(App).post(`/recommendations`).send(recommendation);
        expect(response.statusCode).toBe(422);
    });

    it("given name and youtubeLink, create recommendation", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await supertest(App).post(`/recommendations`).send(recommendation);
        expect(response.statusCode).toBe(201);

        await recommendations.insert({name: recommendation.name, youtubeLink: recommendation.youtubeLink});

        const register = await prisma.recommendation.findFirst({
            where: { name: recommendation.name }
        });
        
        expect(register.name).toBe(recommendation.name);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});