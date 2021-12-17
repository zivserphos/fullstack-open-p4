Cypress.Commands.add("login", ({ userName, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    userName,
    password,
  }).then(({ body }) => {
    localStorage.setItem("User", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", ({ content, important }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url, userId },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("User")).token}`,
    },
  });

  cy.visit("http://localhost:3000");
});
