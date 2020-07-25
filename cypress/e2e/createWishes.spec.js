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
});

// Displays the log in form
describe("login form", () => {
  it("renders email and password inputs", () => {
    cy.visit("/wishes");
    cy.get(":nth-child(1) > .wish-index > .flip-card-front").click();
    cy.url().should("eql", "http://localhost:8080/wishes/1");
  });
});
