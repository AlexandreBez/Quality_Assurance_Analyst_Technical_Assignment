/// <reference types="cypress"/>

describe("Reg24.31.01 - E2E regression testing for QA Technical Assignment", () => {

  // Avoid antivirus issues for not allowing to proceed to access the page
  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception:", err.message);
    return false;
  });

  // Call login commnand before every test execution
  beforeEach("Login and viewport config", () => {
    cy.viewport(1200, 800);
    cy.visit("/account/signin");
    cy.fixture("login_credentials.json").then((data) => {
      cy.dashboardLogin(data.user, data.pwd);
    });
  });

  it("TC001-Validate user can Update 'Website Login' option with success at 'Shared Logins and Services' page", () => {
    cy.menuSelect("Settings");
    cy.settingsMenuSelect("Shared Logins and Services");
    cy.selectAccountForUpdateOrConnect("Website Logins");
    cy.fixture("required_accounts_data.json").then((data) => {
      cy.get("#model_url").clear();
      cy.get("#model_url").type(data[0].url);
      cy.get("#model_username").clear();
      cy.get("#model_username").type(data[0].username);
      cy.get("#model_password").clear();
      cy.get("#model_password").type(data[0].pwd);
      cy.get(".col-xs-8 > .ol-button--primary").click();
    });
    cy.get(".modal").should("not.exist");
  });

  it("TC002-Validate user can add account for 'Stripe' with success at 'Shared Logins and Services' page", () => {
    const currentDate = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = dateFormatter.format(currentDate);
    
    cy.menuSelect("Settings");
    cy.settingsMenuSelect("Shared Logins and Services");
    cy.selectAccountForUpdateOrConnect("Stripe");
    cy.origin("https://connect.stripe.com", () => {
      cy.get("#skip-account-app").click();
    });
    cy.get('.ol-alert__message', {timeout: 10000}).should("have.text", "Stripe account connected");
    cy.get('.layout-align-start-stretch > .connected-account__info', {timeout: 10000}).each(($el) => {
        if ($el.text().includes("Stripe")) {

            cy.wrap($el).find('[ng-switch-when="connected"]').then(el => {
                cy.wrap(el).find(".connected-account__status--success").should("have.text", "Connected");
                cy.wrap(el).find('[ng-if="connected_account.created.at"] > .bold').should("have.text", "Since:");
                cy.wrap(el).find('[ng-if="connected_account.created.at"] > :nth-child(2)').should("contain.text", formattedDate);
                cy.wrap(el).find(".ol-link--tertiary").and("have.text", "Disconnect");
            });

        }
    });
  });

  it("TC003_Validate user can disconnect a account with success at 'Shared Logins and Services' page", () => {
    cy.menuSelect("Settings");
    cy.settingsMenuSelect("Shared Logins and Services");
    cy.selectAccountForDisconnect("Stripe");
  });
});
