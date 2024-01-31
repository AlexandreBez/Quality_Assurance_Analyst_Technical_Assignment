
Cypress.Commands.add("selectAccountForUpdateOrConnect", (account) => {
    cy.wait(500);
    cy.get('.layout-align-start-stretch > .connected-account__info').each(($el) => {
        if ($el.text().includes(account)) {
            cy.wrap($el).find('button').click();
        }
    });
});

Cypress.Commands.add("selectAccountForDisconnect", (account) => {
    cy.wait(500);
    cy.get('.layout-align-start-stretch > .connected-account__info', {timeout: 10000}).each(($el) => {
        if ($el.text().includes(account)) {
            cy.wrap($el).find('[ng-switch-when="connected"]').then(el => {
                cy.wrap(el).find(".ol-link--tertiary").click();
                cy.get('.modal-title').should("contain.text", "Confirmation");
                cy.get('.text-center').should("have.text", "Are you sure you want to disconnect the account?")
                cy.get('.col-xs-8 > .ol-button--primary').click();
                cy.get('.modal').should("not.exist");
                cy.get('[ng-switch-when="connected"]').should("not.exist");
            });
        }
    });
    cy.get('.ol-alert__message', {timeout: 10000}).should("have.text", `${account} account disconnected`);
    cy.get('.layout-align-start-stretch > .connected-account__info').each(($el) => {
        if ($el.text().includes(account)) {
            cy.wrap($el).find('button').should("exist").and('not.be.disabled');
        }
    });
});