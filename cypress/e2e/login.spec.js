// Displays the log in form
describe("login form", () => {
  it("renders email and password inputs", () => {
    cy.visit("/login");
  });
});

// This test will log the admin user in
describe("tries to log in and log out", () => {
  it("logs in with correct creds and logs out", () => {
    cy.visit("/");
    cy.findByText(/Login/).click();
    cy.get("#email").type("admin@wishupon.com");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.url().should("eql", "http://localhost:8080/wishes");
    cy.findByText(/Logout/).click();
    cy.url().should("eql", "http://localhost:8080/login");
  });
});

// This test will try to log a new user in and will fail. It should send them to sign up
describe("tries to log in", () => {
  it("logs in with incorrect creds and sends user to sign up", () => {
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
    cy.get("#email").should("exist");
    cy.get("#email").type("awesomeAmy92@gmail.com");
    cy.get("#password").type("password");
    cy.get("#country_id").type("New Zealand");
    cy.get("#login-button").click();
    // This needs to be fixed, as it is looking for a number for the country_id.
    // Needs to be a string. Unless we have it as a drop down
    cy.url().should("eql", "http://localhost:8080/wishes");
  });
});
