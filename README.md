# Cypress Project Setup and Test Execution

This guide provides step-by-step instructions on setting up a Cypress project and running tests.

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

### Disclaimer
* The resource frequently uses alerts as confirmation messages, which I believe is not the best practice. However, instead of refactoring everything into custom functions, I decided to assert content based on alerts to save time.

* Login-related test cases can be extended with additional checks, such as input length validation, special character restrictions, and security measures. The cases I provided focus on covering straightforward gaps and common bugs.

* The checkout process is quite broken. In its current state, there is no distinction between logged-in and guest users, nor between full or empty carts—everything results in a positive scenario. Based on this, I assume realistic test cases should include:

[//]: # (Checkout for a logged-in user)

[//]: # (Checkout for a guest user)

[//]: # (Checkout failing when required information is missing)
