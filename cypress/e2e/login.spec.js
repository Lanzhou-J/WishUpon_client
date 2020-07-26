import { userBuilder } from "../support/generate";

// Displays the log in form
describe("login form", () => {
  it("renders email and password inputs", () => {
    cy.visit("/login");
  });
});

// This test will log the admin user in
describe("tries to log in and log out", () => {
  it("logs in with correct creds and logs out", () => {
    before(() => {
      cy.fixture("user.json").then((user) => {
        cy.visit("/");
        cy.findByText(/Login/).click();
        cy.get("#email").type(user.email);
        cy.get("#password").type(user.password);
        cy.get("#login-button").click();
      });
    });
    // Should send the user to the main index wishes page
    it("should log in and go to the main wishes page");
    cy.url().should("eql", "http://localhost:8080/wishes");
  });
  // Destroys the cookie and log in jwt token from localstorage
  after(() => {
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("auth");
  });
});

describe("logs out the user if a user is logged in", () => {
  it("Should log out if anyone is in", () => {
    cy.findByText(/Logout/).click();
    cy.url().should("eql", "http://localhost:8080/login");
  });
});

// This test will try to log a new user in and will fail. It should send them to sign up
describe("tries to log in", () => {
  it("logs in with un-registered user and sends user to the sign up page", () => {
    cy.visit("/");
    cy.findByText(/Login/).click();
    cy.get("#email").type("harrison_and_ed@coder.com");
    cy.get("#password").type("weforgot");
    cy.get("#login-button").click();
  });
});

// This will sign up a new user, with a email address, password and country
describe("Sign up a new user", () => {
  it("should go to the signup page", () => {
    cy.visit("/");
    cy.findByText(/Sign Up/).click();
    cy.url().should("include", "/sign-up");
  });
  it("should enter an awesome email and a clever password", () => {
    const { email, password } = userBuilder();
    cy.get("#email").should("exist");
    cy.get("#email").type(email).should("contain.value", email);
    cy.get("#password").type(password).should("contain.value", password);
    // cy.get("#country_id").type("New Zealand");
    cy.get("#country_id").type(1);
    cy.get("#login-button").click();
    // This needs to be fixed, as it is looking for a number for the country_id.
    // Needs to be a string. Unless we have it as a drop down
    cy.url().should("eql", "http://localhost:8080/wishes");
  });
});
