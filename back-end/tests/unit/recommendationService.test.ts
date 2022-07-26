import { jest } from "@jest/globals";

import { CreateRecommendationData, recommendationService } from "./../../src/services/recommendationsService.js";
import { recommendationRepository } from "./../../src/repositories/recommendationRepository.js";
import recommendations from "./factories/recommendationFactory.js";

jest.mock("./../../src/repositories/recommendationRepository");

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

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

    it("shouldn't create recommendation, duplicated name", async () => {
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

    it("should insert downvote", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: "Xote dos Milagres",
                youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
                score: 20
            }
        })
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { return { score: 10 } });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });

        await recommendationService.downvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    })

    it("shouldn't insert downvote with non-existent id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { });
        const promise = recommendationService.downvote(1);
        expect(promise).rejects.toEqual({ message: "", type: "not_found" });
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    })

    it("shouldn't insert downvote with score less than -5", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: "Xote dos Milagres",
                youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
                score: 0
            }
        })
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { return { score: -20 } });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });

        await recommendationService.downvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    })

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

    it("get random recommendation, 30%", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return recommendations.recommendations30;
        });
        jest.spyOn(recommendationService, "getScoreFilter").mockImplementationOnce((): any => {return "lte"});
        const promise = await recommendationService.getRandom();
        expect(promise).not.toBe(null);
        expect(promise.score).toBeLessThanOrEqual(10);
    });

    it("get random recommendation, 70%", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return recommendations.recommendations70;
        });
        jest.spyOn(recommendationService, "getScoreFilter").mockImplementationOnce((): any => {return "gt"});
        const promise = await recommendationService.getRandom();
        expect(promise).not.toBe(null);
        expect(promise.score).toBeGreaterThanOrEqual(10);
    });

    it("should get top recommendations", async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => {
            return [
                recommendations.recommendations[0],
                recommendations.recommendations[1],
                recommendations.recommendations[2],
                recommendations.recommendations[3]
            ]
        });
        const promise = await recommendationService.getTop(4);
        expect(promise).not.toBeNull();
        expect(promise.length).toEqual(4);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
    })
})