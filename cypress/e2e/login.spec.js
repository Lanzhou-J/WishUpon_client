// Displays the log in form
describe("login form", () => {
  it("renders email and password inputs", () => {
    cy.visit("/login");
    // test code
  });
});

// This test will log the admin user in
describe("tries to log in", () => {
  it("logs in with correct creds", () => {
    cy.visit("/");
    cy.findByText(/Login/).click();
    cy.get("#email").type("admin@wishupon.com");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.url().should("eql", "http://localhost:8080/wishes");
  });
});

// This test will try to log a new user in and will fail. It should send them to sign up

// describe("clicking on login", () => {
//   it("should go to the login page", () => {
//     cy.visit("/");
//     cy.findByText(/Login/).click();
//     cy.url().should("include", "/login");
//   });
//   it("should render email and password inputs", () => {
//     cy.get("#email").should("exist");
//     cy.get("#password").should("exist");
//   });
// });

// describe("When a user clicks on the login button", () => {
//   it("should navigate to the login page", () => {
//     cy.visit("/login");
//     cy.get("#email").should("contain.text", "login");
//     cy.get("#password").should("contain.text", "login");
//     cy.get("#login-button").should("contain.text", "login");
//     cy.url().should("eql", "http://localhost:8080/secret");
//   });
// });

// describe("When a user logs in with the correct credentials", () => {
//   before(() => {});
// });
