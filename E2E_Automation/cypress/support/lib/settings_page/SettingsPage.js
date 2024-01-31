
Cypress.Commands.add("settingsMenuSelect", (menu_name) => {
  cy.get('section > div').each(($el) => {
      if ($el.text().includes(menu_name)) {
        cy.wrap($el).click();
      }
    });
});