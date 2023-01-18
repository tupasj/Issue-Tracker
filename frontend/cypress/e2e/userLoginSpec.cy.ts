describe('User login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/sign-in');
  });

  it('Displays the sign-in component', () => {
    cy.contains('Welcome to Issue Tracker');
    cy.contains('Log In');
  });

  it('Requires fields', () => {
    cy.get('button').click();
    cy.contains('This field is required');
  });

  it('Submits new user info and redirects to app page', () => {
    cy.get('#email').type('testuser5678@gmail.com');
    cy.get('#password').type('56785678');
    cy.get('button').click();
    cy.url().should('include', '/app/dashboard');
    cy.get('svg').last().click();
    cy.contains('Log out').click();
  });
});
