// User can send a chat request to another user
// Must click on the 'I can help' button
// A user can decline the chat
// Two users can chat to each other

describe("tries to log in the admin account", () => {
  it("logs in a user", () => {
    cy.visit("/");
    cy.findByText(/Login/).click();
    cy.get("#email").type("admin@wishupon.com");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.url().should("eql", "http://localhost:8080/wishes");
  });
  it("should go to a wish that is not one's own", () => {
    //   Hard coded to go to wish 2
    cy.visit(`http://localhost:8080/wishes/2`);
  });
  it("should send a chat request to the user", () => {
    cy.get(".button-wrapper > a > button").click();
  });
});
