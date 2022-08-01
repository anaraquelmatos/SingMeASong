import { prisma } from "../../src/database.js";
import App from "../../src/app.js";
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

    it("given points to a non-existent recommendation", async () => {
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

    it("remove points from recommendation without having registered points", async () => {
        const recommendation = await recommendations.validRecommendation();
        const response = await recommendations.insert(recommendation);
        const point = await supertest(App).post(`/recommendations/${response.id}/downvote`).send();
        expect(point.statusCode).toBe(200);
    });

    it("remove points to a non-existent recommendation", async () => {
        const point = await supertest(App).post(`/recommendations/1/downvote`).send();
        expect(point.statusCode).toBe(404);
    });

    it("remove 5 points from recommendation without having registered points", async () => {
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

    it("remove 6 points from recommendation without having registered points", async () => {
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

    it("get 10 recommendations", async () => {
        const recommendation1 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation1);
        const recommendation2 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation2);
        const recommendation3 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation3);
        const recommendation4 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation4);
        const recommendation5 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation5);
        const recommendation6 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation6);
        const recommendation7 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation7);
        const recommendation8 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation8);
        const recommendation9 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation9);
        const recommendation10 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation10);
        const recommendation11 = await recommendations.validRecommendation();
        await recommendations.insert(recommendation11);
        const response = await supertest(App).get(`/recommendations`);
        expect(response.statusCode).toBe(200);

        expect(response.text).not.toBe("[]");

        const register = await prisma.recommendation.findFirst({
            where: { name: recommendation10.name }
        });

        expect(recommendation10.name).toBe(register.name);
    });

    it("get recommendations with non-existent recommendation", async () => {
        const response = await supertest(App).get(`/recommendations`);
        expect(response.text).toBe("[]");
    });

    it("get recommendation from id", async () => {
        const recommendation = await recommendations.validRecommendation();
        const infoRecommendation = await recommendations.insert(recommendation);
        const response = await supertest(App).get(`/recommendations/${infoRecommendation.id}`);
        expect(response.statusCode).toBe(200);

        const register = await prisma.recommendation.findFirst({
            where: { id: infoRecommendation.id }
        });

        expect(recommendation.name).toBe(register.name);
    });

    it("get recommendation with non-existent id", async () => {
        const response = await supertest(App).get(`/recommendations/1`);
        expect(response.statusCode).toBe(404);

        expect(response.text).toBe("");
    });

    it("get random recommendation", async () => {
        const recommendation = await recommendations.validRecommendation();
        await recommendations.insert(recommendation);
        const response = await supertest(App).get(`/recommendations/random`);
        expect(response.statusCode).toBe(200);

        expect(response.text).not.toBe("[]");
    });

    it("get random recommendation without having registered recommendations", async () => {
        const response = await supertest(App).get(`/recommendations/random`);
        expect(response.statusCode).toBe(404);

        expect(response.text).toBe("");
    });

    it("get top recommendations", async () => {
        const recommendation = await recommendations.validRecommendation();
        await recommendations.insert(recommendation);
        const response = await supertest(App).get(`/recommendations/top/10`);
        expect(response.statusCode).toBe(200);

        expect(response.text).not.toBe("[]");
    });

    it("get top recommendations without having registered recommendations", async () => {
        const response = await supertest(App).get(`/recommendations/top/10`);
        expect(response.text).toBe("[]");
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});