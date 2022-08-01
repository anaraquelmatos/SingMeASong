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

        const register = await prisma.recommendation.findFirst({
            where: { name: recommendation.name }
        });
        
        expect(register.name).toBe(recommendation.name);
    });

    it("given valid points to the recommendation", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        const point = await supertest(App).post(`/recommendations/${response.id}/upvote`).send();
        expect(point.statusCode).toBe(200);
    });

    it("update recommendation points", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        await supertest(App).post(`/recommendations/${response.id}/upvote`).send();
        const point = await supertest(App).post(`/recommendations/${response.id}/upvote`).send();
        expect(point.statusCode).toBe(200);

        const register = await prisma.recommendation.findFirst({
            where: { id: response.id }
        });
        
        expect(register.score).toBe(2);
    });

    it("given points to the a non-existent recommendation", async () => {
        const point = await supertest(App).post(`/recommendations/1/upvote`).send();
        expect(point.statusCode).toBe(404);
    });

    it("remove points from recommendation", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        await supertest(App).post(`/recommendations/${response.id}/upvote`).send();
        const point = await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        expect(point.statusCode).toBe(200);

        const register = await prisma.recommendation.findFirst({
            where: { id: response.id }
        });
        
        expect(register.score).toBe(0);
    });

    it("remove points from recommendation without points", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        const point = await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        expect(point.statusCode).toBe(200);
    });

    it("remove points to the a non-existent recommendation", async () => {
        const point = await supertest(App).post(`/recommendations/1/downvote`).send();
        expect(point.statusCode).toBe(404);
    });

    it("remove 5 points from recommendation without points", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();

        const register = await prisma.recommendation.findFirst({
            where: { id: response.id }
        });
        
        expect(register.score).toBe(-5);
    });

    it("remove 6 points from recommendation without points", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        await supertest(App).post(`/recommendations/${response.id}/downvote`).send();

        const register = await prisma.recommendation.findFirst({
            where: { id: response.id }
        });
   
        expect(register).toBe(null);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});