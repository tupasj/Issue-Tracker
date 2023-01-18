describe('User registration and login', () => {
  it('Displays the sign-in component', () => {
    cy.visit('http://localhost:5173/sign-in');
    cy.contains('Welcome to Issue Tracker');
    cy.contains('Log In');
  });

  it('Switches to registration form on link click', () => {
    cy.visit('http://localhost:5173/sign-in');
    cy.contains('Register now').click();
    cy.url().should('include', '/register');
    cy.contains('Create a new account');
    cy.contains('Sign Up');
  });

  it('Requires fields', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('button').click();
    cy.contains('This field is required');
  });

  it('Redirects to app page on success', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('#email').type('testuser1234@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('#passwordConfirmation').type('12341234');
    cy.get('button').click();
    cy.contains('Signup successful!');
    cy.get('input').first().type('Project 1');
    cy.get('svg').first().click();
    cy.url().should('include', '/app/dashboard');
  });
});
