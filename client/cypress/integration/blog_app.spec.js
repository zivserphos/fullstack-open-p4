describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.get("#login-btn").click();
    cy.get("input:first").type("ADON_OLAM1");
    cy.get("input:last").type("1234");
    cy.get("#login-btn").click();
  });
});
