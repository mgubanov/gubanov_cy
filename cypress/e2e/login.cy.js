import constants from '../support/constants';
import errors from "../support/errors";

describe("Login Test - successful scenarios", () => {
    it("Login successfully by entering valid credentials", () => {
        cy.visit(constants.BASE_URL);
        cy.login(constants.VALID_USERNAME, constants.VALID_PASSWORD);

        cy.get('#nameofuser')
            .should("be.visible")
            .and("contain", `Welcome ${constants.VALID_USERNAME}`);
    });
});

describe("Login Test - negative scenarios", () => {
    beforeEach(() => {
        cy.visit(constants.BASE_URL);
    });

    it("Alert on entering Empty username and Empty password", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq(errors.EMPTY_FIELDS);
        });

        cy.login(constants.EMPTY, constants.EMPTY);
    });

    it("Alert on entering Valid username and Empty password", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq(errors.EMPTY_FIELDS);
        });

        cy.login(constants.VALID_USERNAME, constants.EMPTY);
    });

    it("Alert on entering Invalid username and Empty password", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq(errors.EMPTY_FIELDS);
        });

        cy.login(constants.INVALID_USERNAME, constants.EMPTY);
    });

    it("Alert on entering Valid username and Invalid password", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq(errors.WRONG_PASSWORD);
        });

        cy.login(constants.VALID_USERNAME, constants.INVALID_PASSWORD);
    });

    it("Alert on entering Empty username and Invalid password", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq(errors.EMPTY_FIELDS);
        });

        cy.login(constants.EMPTY, constants.INVALID_PASSWORD);
    });

    it("Alert on entering Invalid username and Invalid password", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq(errors.USER_NOT_EXIST);
        });

        cy.login(constants.INVALID_USERNAME, constants.INVALID_PASSWORD);
    });
});
