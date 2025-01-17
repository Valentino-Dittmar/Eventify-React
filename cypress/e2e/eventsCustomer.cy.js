// describe('Events Page', () => {
//     beforeEach(() => {
//       // Mock Login API
//       cy.intercept('POST', 'http://localhost:8080/auth/local-login', {
//         statusCode: 200,
//         body: 'mock-token',
//       }).as('loginRequest');
  
//       // Mock Events API
//       cy.intercept('GET', 'http://localhost:8080/events', { fixture: 'events.json' }).as('fetchEvents');
//       cy.intercept('POST', '**/events/*/attend', { statusCode: 200 }).as('attendEvent');
  
//       // Visit Login Page
//       cy.visit('http://localhost:5173/');
  
//       // Perform Login
//       cy.get('input[name="email"]').type('testUser@example.com');
//       cy.get('input[name="password"]').type('Helo123');
//       cy.get('button[type="submit"]').click();
  
//       // Wait for Login API
//       cy.wait('@loginRequest');
  
//       // Mock setting of localStorage for successful login
//       cy.window().then((win) => {
//         win.localStorage.setItem('authToken', 'mock-token');
//         win.localStorage.setItem(
//           'user',
//           JSON.stringify({
//             userId: 1,
//             roles: ['CUSTOMER'],
//           })
//         );
//       });
  
//       // Verify successful redirection to homepage
//       cy.url().should('include', '/home');
  
//       // Navigate to Events Page
//       cy.contains('Events').click();
  
//       // Wait for Events API
//       cy.wait('@fetchEvents');
//     });
  
//     it('should display all events', () => {
//       // Verify that events are displayed
//       cy.contains('Event').should('exist');
//       cy.contains('The Coolest Event YAAAAY').should('exist');
//       cy.contains('Fast Cars Race').should('exist');
//     });
  
//     it('should allow the customer to attend an event', () => {
//       // Click the "Attend" button for the first event
//       cy.contains('Event').parent().find('button').contains('Attend').click();
  
//       // Wait for the attend event API call
//       cy.wait('@attendEvent').its('response.statusCode').should('eq', 200);
  
//       // Verify that a success alert is shown
//       cy.on('window:alert', (text) => {
//         expect(text).to.contains('Successfully registered for the event!');
//       });
//     });
  
//     it('should show an error if events fail to load', () => {
//       // Mock failed Events API call
//       cy.intercept('GET', 'http://localhost:8080/events', { statusCode: 500 }).as('fetchEventsError');
  
//       // Reload the page
//       cy.reload();
  
//       // Wait for the failed request
//       cy.wait('@fetchEventsError');
  
//       // Verify that an error message is displayed
//       cy.contains('Error loading events. Please try again later.').should('exist');
//     });
//   });