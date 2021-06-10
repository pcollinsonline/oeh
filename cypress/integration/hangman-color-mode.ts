describe('change color mode', () => {
  beforeEach(() => {
    // hit the site
    cy.visit('/');
    cy.findByTestId('splash-screen').should('exist');
    cy.findByTestId('splash-screen').should('not.exist');
  });

  it('should toggle the color mode', () => {
    // get the color mode value from the body el
    cy.get('body')
      .invoke('attr', 'data-theme')
      .then($theme => {
        expect($theme).eq('light');
        cy.findByTestId('color-mode-toggle').click();

        cy.get('body')
          .invoke('attr', 'data-theme')
          .then($newTheme => {
            expect($newTheme).eq('dark');
            expect(localStorage.getItem('colorMode')).to.eq('"dark"');
          });
      });
  });
});
