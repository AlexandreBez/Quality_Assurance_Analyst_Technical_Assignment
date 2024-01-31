// Command for select one of the menu options
Cypress.Commands.add("menuSelect", (menu_name) => {
  cy.get(".sidenav-menu").each(($el) => {
    if (cy.wrap($el).contains(menu_name)) {
      cy.wrap($el).contains(menu_name).click();
    }
  });
});
