# Cypress Project Setup and Test Execution

This guide provides step-by-step instructions on setting up a Cypress project and running tests.
## Project Structure
```
/gubanov_cy
│── cypress/
│   ├── fixtures/         # Sample test data
│   ├── e2e/              # Test cases (E2E tests)
│   ├── support/          # Custom commands and reusable utilities
│── cypress.config.js     # Cypress configuration file
│── package.json          # Project metadata and dependencies
│── README.md             # Documentation
```

## Preconditions

Ensure the following are installed on your system:

- **[Node.js](https://nodejs.org/)**
- **npm**

## Install Cypress
Run the following command to install Cypress as a development dependency:

```sh
npm install cypress --save-dev
```

(Optional) Verify the installation:

```sh
npx cypress -v
```

## Clone the Project
Clone the repository from GitHub:

```sh
git clone https://github.com/mgubanov/gubanov_cy.git
cd gubanov_cy
```

## Install dependencies
npm install

## Run Tests
Execute Cypress tests using:

```sh
npx cypress run
```

For interactive mode, open the Cypress Test Runner:

```sh
npx cypress open
```
- Select e2e testing
- Choose a browser
- Select specs
- Select tests to run


### NOTES:
* Login-related test cases can be extended with additional checks, such as input length validation, special character restrictions, and security measures. The cases I provided focus on covering straightforward gaps and common bugs, that should be checked at the first place.
* The checkout process is quite broken. In its current state, there is no distinction between logged-in and guest users, nor between full or empty carts—everything results in a positive scenario. Based on this, I've created a few realistic scenarios for this particular demo site, like check out as a guest user, re-login and continue shopping, verify mandatory fields.
* While working with the following resource(https://www.demoblaze.com), I noticed that many confirmation messages are implemented as alerts. To keep things simple, I decided to verify them as they are in tests rather than overcomplicating the approach.
* Temporary waits (500-1000ms) were added to ensure smooth test execution. In real projects it is always better to wait for specific event or element.
* AI tools were used: generating markdown, check grammar, writing regular expressions.  

### CASES:
#### Login:
1. Login successfully by entering valid credentials
2. Alert on entering Empty username and Empty password
3. Alert on entering Valid username and Empty password
4. Alert on entering Invalid username and Empty password
5. Alert on entering Valid username and Invalid password
6. Alert on entering Empty username and Invalid password
7. Alert on entering Invalid username and Invalid password
#### Checkout:
1. Unlogged user successfully completes checkout
2. Adding a product to the cart, re-logging in, and completing an order with an already added item
3. Unable to proceed checkout without filling a name
