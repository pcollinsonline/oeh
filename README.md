# Hangman

## Local Setup:
- clone repo
- from terminal: `yarn install`
- from terminal: `yarn start`

## Testing
### Unit Tests
- from terminal: `yarn test`

### Cypress Setup
To run the cypress tests against the dev server, create a `.env` file in the project root with the following content: `REACT_APP_WORD_LIST_API=https://infallible-mestorf-8489d1.netlify.app/api/word-list`. 

### Cypress Tests (headless)
- from terminal: `yarn cypress:run`

### Cypress Runner
- from terminal `yarn cypress`
