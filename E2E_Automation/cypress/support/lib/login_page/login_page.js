
// Command for automate the login 
Cypress.Commands.add("dashboardLogin", (user, pwd) => {
    cy.get('.signin-card > .layout-fill').each($el => {
        cy.wrap($el).find("#input_0").type(user);
        cy.wrap($el).find("#password").type(pwd);
        cy.wrap($el).find(".ol-button--primary").click();
    });
});