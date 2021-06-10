describe('new hangman game', () => {
  it('should display the game', () => {
    // set up the interceptor for the wordlist
    // fetch request
    cy.intercept('GET', '/api/word-list').as('fetchWordList');

    // hit the site
    cy.visit('/');

    cy.wait('@fetchWordList').then(() => {
      'qwertyuiopasdfghjklzxcvbnm'.split('').forEach(letter => {
        // assert there is an enabled button for each letter
        // assert each key is marked as not pressed
        cy.findByRole('button', { name: letter }).should('be.enabled');
        cy.findByRole('button', { name: letter })
          .invoke('attr', 'data-keystatus')
          .then($status => {
            expect($status).eql('not-pressed');
          });

        // assert there is an enabled reset button
        cy.findByRole('button', { name: /reset/i }).should('be.enabled');

        // assert there is a color mode switcher button
        cy.findByTestId('color-mode-toggle').should('exist');

        // assert that the hangman banner is visible
        cy.findByTestId('ui-banner').should('exist');
      });
    });
  });
});
