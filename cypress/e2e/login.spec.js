describe("login form", () => {
  it("renders email and password inputs", () => {
    cy.visit("/login");
    // test code
  });
});

describe("clicking on login", () => {
  it("should go to the login page", () => {
    cy.visit("/");
    cy.findByText(/Login/).click();
    cy.url().should("include", "/login");
  });
  it("should render email and password inputs", () => {
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
  });
});

describe("When a user clicks on the login button", () => {
  it("should navigate to the login page", () => {
    cy.visit("/login");
    cy.get("#email").should("contain.text", "login");
    cy.get("#password").should("contain.text", "login");
    cy.get("#login-button").should("contain.text", "login");
    cy.url().should("eql", "http://localhost:8080/secret");
  });
});

describe("When a user logs in with the correct credentials", () => {
  before(() => {});
});
