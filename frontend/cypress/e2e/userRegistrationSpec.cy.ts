describe('User registration', () => {
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

  it('Submits new user info and redirects to app page', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('#email').type('testuser1234@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('#passwordConfirmation').type('12341234');
    cy.get('button').click();
    cy.contains('Signup successful!');
    cy.get('input').first().type('Project 1');
    cy.get('svg').first().click();
    cy.url().should('include', '/app/dashboard');
    cy.get('svg').last().click();
    cy.contains('Log out').click();
    cy.request('DELETE', 'http://localhost:4000/user/delete/email=testuser1234@gmail.com');
  });
});
