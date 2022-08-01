Cypress.Commands.add("resetDatabase", () => {
    cy.request("POST", "http://localhost:5000/recommendations/reset");
})

Cypress.Commands.add("createRecommendation", (recommendation) => {
    cy.request("POST", "http://localhost:5000/recommendations", recommendation);
});