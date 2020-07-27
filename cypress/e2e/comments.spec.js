// User logs in
// Goes to a wish that isn't his own
// Adds a comment to another users wish

// This test will log the admin user in
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
  it("should leave a nice comment for the user", () => {
    cy.get("#content").type(
      "Hello. I have some IELTS school books if you want"
    );
    cy.findByTestId("comments-button").click();
  });
});
