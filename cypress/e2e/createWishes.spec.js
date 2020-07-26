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

// Displays the index page with the wishes from the user
describe("will show the main index page with the wishes", () => {
  it("renders the public wishes", () => {
    cy.visit("/wishes");
    cy.get(":nth-child(1) > .wish-index > .flip-card-front").click();
    cy.url().should("eql", `http://localhost:8080/wishes/${wish.id}`);
  });
});

describe("finds the create wish and adds a new wish", () => {
  it("should create a new wish with exciting information", () => {
    cy.fixture("createWish.json").then((createWish) => {
      // wishes/create
      cy.visit("/CreateWish");
      cy.url().should("eql", "http://localhost:8080/wishes/create");
      cy.get("#title").type(createWish.title);
      cy.get("#description").type(createWish.description);
      // 'Add Wish' button - have given it a test ID
      cy.findByTestId("wish-submit").click();
    });
  });
});

describe("User can edit a wish", () => {
  it("should be able to edit a wish", () => {
    //wishes/id is the wish
    cy.url().should("eql", `http://localhost:8080/wishes/${wish.id}`);
    // testId - editButton
    cy.findByTestId("editButton").click();
    cy.url().should("eql", `http://localhost:8080/wishes/${wish.id}/edit`);
    // This will edit the wish
    cy.get("#title").type("Editing a prior wish");
    cy.get("#description").type("Editing the wish that was originally here");
    // Have given it a test ID in the editWish.jsx file
    cy.findByTestId("wish-submit").click();
  });
});

describe("User can delete a wish", () => {
  it("should be able to delete a wish", () => {
    //wishes/id is the wish
    cy.url().should("eql", `http://localhost:8080/wishes/${wish.id}`);
    // testId - editButton
    cy.findByTestId("deleteButton").click();
    cy.url().should("eql", `http://localhost:8080/wishes/${wish.id}/delete`);

    // Have given it a test ID in the editWish.jsx file
    cy.findByTestId("wish-submit").click();
    // Click on the prompt to allow deletion of the wish
  });
});
