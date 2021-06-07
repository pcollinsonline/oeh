import React from 'react';

const HangmanHead = React.memo(() => {
  return (
    <div
      data-testid="head"
      className="ui-body-part absolute ba br-100"
      style={{
        top: '1.5rem',
        left: '2.5rem',
        height: '3rem',
        width: '3rem',
        animation: 'fade-in 0.5s 1',
      }}
    />
  );
});
HangmanHead.displayName = 'HangmanHead';

const HangmanLeftArm = React.memo(() => (
  <div
    data-testid="left-arm"
    className="ui-body-part absolute ba"
    style={{
      top: '5.5rem',
      left: '.45rem',
      height: '.25rem',
      width: '3.5rem',
      transformOrigin: 'top right',
      transform: 'rotate(-45deg)',
    }}
  />
));
HangmanLeftArm.displayName = 'HangmanLeftArm';

const HangmanRightArm = React.memo(() => (
  <div
    data-testid="right-arm"
    className="ui-body-part absolute ba"
    style={{
      top: '5.5rem',
      left: '4rem',
      height: '.25rem',
      width: '3.5rem',
      transformOrigin: 'top left',
      transform: 'rotate(45deg)',
    }}
  />
));
HangmanRightArm.displayName = 'HangmanRightArm';

const HangmanLeftLeg = React.memo(() => (
  <div
    data-testid="left-leg"
    className="ui-body-part absolute ba"
    style={{
      top: '10.25rem',
      left: '-.1rem',
      height: '.25rem',
      width: '4rem',
      transformOrigin: 'top right',
      transform: 'rotate(-65deg)',
    }}
  />
));
HangmanLeftLeg.displayName = 'HangmanLeftLeg';

const HangmanRightLeg = React.memo(() => (
  <div
    data-testid="right-leg"
    className="ui-hangman-box__right-leg ui-body-part absolute ba"
    style={{
      top: '10.25rem',
      left: '4.15rem',
      height: '.25rem',
      width: '4rem',
      transformOrigin: 'top left',
      transform: 'rotate(65deg)',
    }}
  />
));
HangmanRightLeg.displayName = 'HangmanRightLeg';

const HangmanBody = React.memo(() => (
  <div
    data-testid="body"
    className="ui-body-part absolute ba"
    style={{
      top: '4.5rem',
      left: '50%',
      height: '6rem',
      width: '.25rem',
      zIndex: 1,
    }}
  />
));
HangmanBody.displayName = 'HangmanBody';

const HangManParts = [
  <HangmanHead key={HangmanHead.displayName} />,
  <HangmanBody key={HangmanBody.displayName} />,
  <HangmanLeftArm key={HangmanLeftArm.displayName} />,
  <HangmanRightArm key={HangmanRightArm.displayName} />,
  <HangmanLeftLeg key={HangmanLeftLeg.displayName} />,
  <HangmanRightLeg key={HangmanRightLeg.displayName} />,
];

const MAX_GUESSES = HangManParts.length;

export { HangManParts, MAX_GUESSES };
