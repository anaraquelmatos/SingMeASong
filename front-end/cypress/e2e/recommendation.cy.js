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

  it("should create recommendation with invalid youtube link", () => {
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

    cy.url().should("equal", "http://localhost:3000/");
  });
});
