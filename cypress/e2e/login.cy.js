describe('LoginForm Test', () => {
    beforeEach(() => {
        //go to page
      cy.visit('http://localhost:5173/');
    });
  
    it('displays validation errors for empty fields', () => {
        //click submit button
      cy.get('button[type="submit"]').click();
  
      // check for validation error messages
      cy.contains('Required').should('be.visible');
      cy.contains('Required').should('be.visible');
    });
  
    it('logs in successfully with valid credentials', () => {
      // call the api(mock)
      cy.intercept('POST', 'http://localhost:8080/auth/local-login', {
        statusCode: 200,
        body: 'mock-token',
      }).as('loginRequest');
  
      // Enter valid email and password
      cy.get('input[name="email"]').type('testUser@example.com');
      cy.get('input[name="password"]').type('Helo123');
  
      // submit the form
      cy.get('button[type="submit"]').click();
  
      // wait for the API call
      cy.wait('@loginRequest');
  
      // verify that the user is redirected to the home page
      cy.url().should('include', '/home');
    });
  
    it('redirects to the registration page', () => {
      // click on "Register Here" button
      cy.contains('Register Here').click();
  
      // verify redirection to the register page
      cy.url().should('include', '/register');
    });
  });