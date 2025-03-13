//todo rework this as utils

Cypress.Commands.add("login", (username, password) => {
    cy.get('#login2').click();
    cy.get('#loginusername')
        .should("be.visible")
        .clear()
        .invoke("val", username)
        .should("have.value", username);

    cy.get('#loginpassword')
        .should("be.visible")
        .clear()
        .invoke("val", password)
        .should("have.value", password);

    cy.get('button[onclick="logIn()"]').click();
});

Cypress.Commands.add("fillAndConfirmCheckoutModal", (name) => {
    cy.get('#name').invoke("val", name);
    cy.get('#country').invoke("val", "country");
    cy.get('#city').invoke("val", "city");
    cy.get('#card').invoke("val", "card");
    cy.get('#month').invoke("val", "month");
    cy.get('#year').invoke("val", "year");

    cy.get('button[onclick="purchaseOrder()"]').click();
});

Cypress.Commands.add("verifyCheckout", () => {
    cy.get('.showSweetAlert h2')
        .should('be.visible')
        .and('contain', 'Thank you for your purchase!');

    cy.get('.showSweetAlert p.lead.text-muted')
        .invoke('text')
        .then((text) => {
            expect(text).to.match(/Id: \d+/); // Validate order ID format
            expect(text).to.match(/Amount: \d+ USD/); // Validate dynamic amount (e.g., "Amount: 123 USD")
            expect(text).to.match(/Card Number:\s+\w+/); // Validate card number presence
            expect(text).to.match(/Name:\s+\w+/); // Validate name presence
            expect(text).to.match(/Date: \d{1,2}\/\d{1,2}\/\d{4}/); // Validate date format
        });
});

Cypress.Commands.add('verifyLastAlert', (expectedMessage) => {
    let alerts = [];

    cy.on('window:alert', (text) => {
        alerts.push(text);
    });

    cy.then(() => {
        expect(alerts[alerts.length - 1]).to.equal(expectedMessage);
    });
});

