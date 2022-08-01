import { jest } from "@jest/globals";

import { CreateRecommendationData, recommendationService } from "./../../src/services/recommendationsService.js";
import { recommendationRepository } from "./../../src/repositories/recommendationRepository.js";

jest.mock("./../../src/repositories/recommendationRepository.js");

describe("recommendationService test suite", () => {
    it("should create recommendation", async () => {
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => { });

        await recommendationService.insert({ name: "Falamansa - Xote dos Milagres", youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y" });
        expect(recommendationRepository.create).toBeCalled();
        expect(recommendationRepository.findByName).toBeCalled();
    })

    it("should create recommendation", async () => {
        const recommendation: CreateRecommendationData = {
            name: "Falamansa - Xote dos Milagres",
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
        }

        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendation.name,
                youtubeLink: recommendation.youtubeLink,
                score: 10
            }
        })

        const promise = recommendationService.insert({name: recommendation.name, youtubeLink: recommendation.youtubeLink});
        expect(promise).rejects.toEqual({message: "Recommendations names must be unique", type: "conflict"});
    })
})