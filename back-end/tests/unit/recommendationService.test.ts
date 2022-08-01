import { jest } from "@jest/globals";

import { CreateRecommendationData, recommendationService } from "./../../src/services/recommendationsService.js";
import { recommendationRepository } from "./../../src/repositories/recommendationRepository.js";
import recommendations from "./factories/recommendationFactory.js";

jest.mock("./../../src/repositories/recommendationRepository.js");

describe("recommendationService test suite", () => {
    it("should create recommendation", async () => {
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => { });
        await recommendationService.insert({
            name: "Falamansa - Xote dos Milagres",
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
        });
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

        const promise = recommendationService.insert({ name: recommendation.name, youtubeLink: recommendation.youtubeLink });
        expect(promise).rejects.toEqual({ message: "Recommendations names must be unique", type: "conflict" });
    })

    it("should insert upvote", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: "Xote dos Milagres",
                youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
                score: 0
            }
        })

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { });
        await recommendationService.upvote(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    })

    it("shouldn't insert upvote with non-existent id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { });
        const promise = recommendationService.upvote(1);
        expect(promise).rejects.toEqual({ message: "", type: "not_found" });
    })

    // it("should insert downvote", async () => {
    //     jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
    //         return {
    //             id: 1,
    //             name: "Xote dos Milagres",
    //             youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    //             score: 0
    //         }
    //     })
    //     jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { return { score: 20 } });
    //     jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });

    //     await recommendationService.downvote(1);

    //     expect(recommendationRepository.find).toBeCalled();
    //     expect(recommendationRepository.remove).toBeCalled();
    //     expect(recommendationRepository.updateScore).toBeCalled();
    // })

    it("shouldn't insert downvote with non-existent id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { });
        const promise = recommendationService.downvote(1);
        expect(promise).rejects.toEqual({ message: "", type: "not_found" });
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    })

    // it("shouldn't insert downvote with score less than -5", async () => {
    //     jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
    //         return {
    //             id: 1,
    //             name: "Xote dos Milagres",
    //             youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    //             score: 0
    //         }
    //     })
    //     jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { return { score: -20 } });
    //     jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });

    //     await recommendationService.downvote(1);

    //     expect(recommendationRepository.find).toBeCalled();
    //     expect(recommendationRepository.updateScore).toBeCalled();
    //     expect(recommendationRepository.updateScore).toBeCalled();
    // })

    it("should get ten recommendations", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { return recommendations.recommendations });
        const promise = await recommendationService.get();
        expect(promise.length).toEqual(10);
    })

    it("should get any recommendations", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { return [] });
        const promise = await recommendationService.get();
        expect(promise.length).toEqual(0);
    })

    it("should get recommendations from id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { return recommendations.recommendations[1] });
        await recommendationService.getById(2);
        expect(recommendationRepository.find).toBeCalled();
    })

    it("shouldn't get recommendations from id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { });
        const promise = recommendationService.getById(2);
        expect(promise).rejects.toEqual({ message: "", type: "not_found" });
        expect(recommendationRepository.find).toBeCalled();
    })

    it("should get random recommendations", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { return recommendations.recommendations });
        const promise = await recommendationService.getRandom();
        expect(promise).not.toBeNull();
        expect(recommendationRepository.findAll).toBeCalled();
    })


    it("shouldn't get random recommendations", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { return [{}] });
        const promise = await recommendationService.getRandom();
        expect(promise.id).toBeUndefined();
        expect(recommendationRepository.findAll).toBeCalled();
    })
})