describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
    cy.CreateUser({
      name: "zufer avdia",
      userName: "zufer_avdia",
      password: "!@$42376SS",
    });
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.get("#login-btn").click();
    cy.get("input:first").type("ADON_OLAM1");
    cy.get("input:last").type("1234");
    cy.get("#login-btn").click();
  });

  it("invalid user cannot be logged in", function () {
    cy.contains("blogs");
    cy.get("#login-btn").click();
    cy.get("input:first").type("fake user");
    cy.get("input:last").type("fake password");
    cy.get("#login-btn").click();
    cy.get(".notyf__toast--error").contains("invalid username or password");
  });

  it("valid user can be logged in", function () {
    cy.contains("blogs");
    cy.get("#login-btn").click();
    cy.get("input:first").type("zufer_avdia");
    cy.get("input:last").type("!@$42376SS");
    cy.get("#login-btn").click();
  });

  describe("when user is logged in", function () {
    beforeEach(function () {
      cy.login({ userName: "zufer_avdia", password: "!@$42376SS" });
    });

    it("create new blog is available", function () {
      cy.get("#title-input").type("this is a test ");
      cy.get("#author-input").type("cypress authors");
      cy.get("#url-input").type("https://www.cypress.io/");
      cy.get("#createBlog").click();
      cy.get(".notyf__toast--success").contains("added a new blog");
    });
    it("invalid call for create blog return Bad request", function () {
      cy.get("#author-input").type("we left the title input");
      cy.get("#url-input").type("empty");
      cy.get("#createBlog").click();
      cy.get(".notyf__toast--error").contains("Bad Request");
    });
    describe("operations on blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "default blog for tests",
          author: "very famous author",
          url: "https://www.cypress.io/",
          userId: JSON.parse(localStorage.getItem("User")).id,
        });
      });

      it("user can like any blog he wants to", function () {
        cy.get("#display-btn").click();
        cy.contains("likes: 0");
        cy.get(".addLike").click();
        cy.contains("likes: 1");
        cy.get(".addLike").click();
        cy.contains("likes: 2");
      });

      it("user can delete his own blog", function () {
        cy.get("#display-btn").click();
        cy.get("#remove-blog").click();
        cy.get(".notyf__toast--success").contains("blog has been deleted");
      });
      it.only("sorts the blogs by the number of likes", function () {
        cy.get("#title-input").type("hello world");
        cy.get("#author-input").type("bob");
        cy.get("#url-input").type("http://test.com");
        cy.get("#createBlog").click();

        cy.get(".blog")
          .should("have.length", 2)
          .then(() => {
            let i = 0;
            cy.get("#display-btn").each((btn) => {
              if (btn[0].innerText === "read more") {
                i++;
                if (i === 2) {
                  btn.trigger("click");
                }
              }
            });
          });
        cy.get(".addLike").click();

        cy.wait(1000);

        cy.get(".blog:first>.title").should("have.text", "hello world2");
      });
    });
  });
});
