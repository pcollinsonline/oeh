const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const bodyPartIds = [
  'head',
  'body',
  'left-arm',
  'left-arm',
  'right-arm',
  'left-leg',
  'right-leg',
];

describe('lose the hangman game', () => {
  it('should lose the game', () => {
    cy.intercept('GET', '/api/word-list').as('fetchWordList');
    cy.visit('/');

    cy.wait('@fetchWordList').then(xhr => {
      const words = JSON.parse(xhr.response.body) as string[];
      const wordToGuess = words[0].split('');

      const losingGuesses = alphabet
        .filter(letter => wordToGuess.indexOf(letter) === -1)
        .slice(0, 6);

      losingGuesses.forEach((letter, index) => {
        // find the button for each letter in
        // the word and click it
        cy.findByRole('button', { name: letter }).click();

        // verify that the key is now disabled
        cy.findByRole('button', { name: letter }).should('be.disabled');

        // verify that the keyboard key
        // updated as an incorrect guess
        cy.findByRole('button', { name: letter })
          .invoke('attr', 'data-keystatus')
          .then($status => {
            expect($status).eql('incorrect-key');
          });

        // verify the correct body parts are visible
        const expectedBodyParts = bodyPartIds.slice(0, index + 1);
        expectedBodyParts.forEach(partId => {
          cy.findByTestId(partId).should('exist');
        });
      });

      // verify that the loser bubble
      // text is in the dom
      cy.findByTestId('bubble-text').should('have.text', 'LOSER');
    });
  });
});
