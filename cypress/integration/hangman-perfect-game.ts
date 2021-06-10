describe('win the hangman game', () => {
  it('should display the game', () => {
    // set up the interceptor for the wordlist
    // fetch request
    cy.intercept('GET', '/api/word-list').as('fetchWordList');
    cy.visit('/');

    cy.wait('@fetchWordList').then(xhr => {
      const words = JSON.parse(xhr.response.body) as string[];

      const lettersToGuess = words[0]
        .split('')
        .filter((elem, pos, arr) => arr.indexOf(elem) === pos);

      lettersToGuess.forEach(letter => {
        // find the button for each letter in
        // the word and click it
        cy.findByRole('button', { name: letter.toLowerCase() }).click();

        // verify that the key is now disabled
        // (no duplicate guesses)
        cy.findByRole('button', { name: letter }).should('be.disabled');

        // verify that the keyboard key
        // updated as a match
        cy.findByRole('button', { name: letter })
          .invoke('attr', 'data-keystatus')
          .then($status => {
            expect($status).eql('letter-match');
          });
      });

      // verify that the winner bubble
      // text is in the dom
      cy.findByTestId('bubble-text').should('have.text', 'Winner');
    });
  });
});
