import constants from "../support/constants";
import errors from "../support/errors";

describe("Checkout laptop - successful scenarios", () => {
    it("Unlogged user successfully completes checkout", () => {
        cy.visit(constants.BASE_URL);
        cy.contains('.list-group-item', 'Laptops').click();
        cy.wait(1000); //filtering by laptops is too slow

        cy.get('.card-title')
            .first()
            .click();

        cy.url().should('include', '/prod.html?idp_=');
        cy.get('.btn-success')
            .click();
        cy.wait(500);//product will never appear in cart if we click to fast

        cy.get('#cartur').click();
        cy.get('.success')
            .first()
            .should("be.visible")

        cy.get('.btn-success').click({force: true});//element is overlapped


        cy.fillAndConfirmCheckoutModal(constants.VALID_USERNAME);

        cy.verifyCheckout();
    });

    it("Adding a product to the cart, re-logging in, and completing an order with an already added item", () => {
        cy.visit(constants.BASE_URL);
        cy.login(constants.VALID_USERNAME, constants.VALID_PASSWORD);
        cy.get('#nameofuser')
            .should("be.visible")
            .and("contain", `Welcome ${constants.VALID_USERNAME}`);

        cy.contains('.list-group-item', 'Laptops').click();
        cy.wait(1000); //filtering by laptops is too slow

        cy.get('.card-title')
            .first()
            .click();

        cy.url().should('include', '/prod.html?idp_=');
        cy.get('.btn-success')
            .click();
        cy.wait(500); //product will never appear in cart if we click to fast

        cy.get('#cartur').click();
        cy.get('.success')
            .first()
            .should("be.visible")

        //logout
        cy.get("#logout2").click()
        cy.wait(500); //product will never appear in cart if we click to fast
        cy.get('#cartur').click();
        cy.get('.success')
            .should("not.exist");

        cy.login(constants.VALID_USERNAME, constants.VALID_PASSWORD);
        cy.get('#nameofuser')
            .should("be.visible")
            .and("contain", `Welcome ${constants.VALID_USERNAME}`);

        cy.get('.btn-success').click({force: true});//element is overlapped

        cy.fillAndConfirmCheckoutModal(constants.VALID_USERNAME);

        cy.verifyCheckout();
    });
});

describe("Checkout - negative scenarios", () => {
    it("Unable to proceed with checkout without entering a name", () => {
        cy.visit(constants.BASE_URL);

        cy.contains('.list-group-item', 'Laptops').click();
        cy.wait(1000); //filtering by laptops is too slow

        cy.get('.card-title')
            .first()
            .click();

        cy.url().should('include', '/prod.html?idp_=');
        cy.get('.btn-success')
            .click();
        cy.wait(500); //product will never appear in cart if we click to fast

        cy.get('#cartur').click();
        cy.get('.success')
            .first()
            .should("be.visible")

        cy.get('.btn-success').click({force: true});//element is overlapped

        cy.fillAndConfirmCheckoutModal(constants.EMPTY);

        let lastAlert = '';//only the latest alert is relevant

        cy.on('window:alert', (alertText) => {
            lastAlert = alertText;
        });

        cy.then(() => {
            expect(lastAlert).to.equal(errors.FILL_NAME_AND_CARD);
        });
    });
});
