/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetDatabase();
});

describe("recommendation suit test", () => {
  it("should create recommendation", () => {
    const youtubeLink = `https://www.youtube.com/${faker.internet.password()}`;
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: youtubeLink,
    };

    cy.visit("http://localhost:3000/");
    cy.get('input[placeholder="Name"]').type(recommendation.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(
      recommendation.youtubeLink
    );

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get("button").click();
    cy.wait("@createRecommendation");

    cy.url().should("equal", "http://localhost:3000/");
  });

  it("shouldn't create recommendation, without required data", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get("button").click();
    cy.wait("@createRecommendation");

    cy.on("window:alert", (t) => {
      expect(t).to.contains("Error creating recommendation!");
    });
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("shouldn't create recommendation with invalid youtube link", () => {
    const youtubeLink = `${faker.internet.password()}`;
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: youtubeLink,
    };

    cy.visit("http://localhost:3000/");
    cy.get('input[placeholder="Name"]').type(recommendation.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(
      recommendation.youtubeLink
    );

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get("button").click();
    cy.wait("@createRecommendation");

    cy.on("window:alert", (t) => {
      expect(t).to.contains("Error creating recommendation!");
    });
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("shouldn't create recommendation with duplicated name", () => {
    const youtubeLink = `https://www.youtube.com/${faker.internet.password()}`;
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: youtubeLink,
    };

    cy.visit("http://localhost:3000/");
    cy.createRecommendation(recommendation);
    cy.get('input[placeholder="Name"]').type(recommendation.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(
      recommendation.youtubeLink
    );

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get("button").click();
    cy.wait("@createRecommendation");

    cy.on("window:alert", (t) => {
      expect(t).to.contains("Error creating recommendation!");
    });
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("should insert upvote", () => {
    const youtubeLink = `https://www.youtube.com/${faker.internet.password()}`;
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: youtubeLink,
    };
    cy.visit("http://localhost:3000/");
    cy.createRecommendation(recommendation);
    cy.get("div:last-child article:last-child svg:first-child").click();
    cy.intercept("POST", "/recommendations/1/upvote").as(
      "upvote"
    );
    cy.get("button").click();
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("should insert downvote", () => {
    const youtubeLink = `https://www.youtube.com/${faker.internet.password()}`;
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: youtubeLink,
    };
    cy.visit("http://localhost:3000/");
    cy.createRecommendation(recommendation);
    cy.get("div:last-child article:last-child svg:last-child").click()
    cy.intercept("POST", "/recommendations/1/downvote").as(
      "upvote"
    );
    cy.get("button").click();
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("should click in random", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "/recommendations/random").as(
      "random"
    );
    cy.get("div").contains("Random").click();
    cy.url().should("equal", "http://localhost:3000/random");
  });

  it("should click in top", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "/recommendations/top").as(
      "top"
    );
    cy.get("div").contains("Top").click();
    cy.url().should("equal", "http://localhost:3000/top");
  });
});


