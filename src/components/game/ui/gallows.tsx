import React from 'react';

const Face = React.memo(() => {
  return (
    <div
      data-testid="head"
      className="ui-body-part absolute ba br-100"
      style={{
        top: '1.5rem',
        left: '2.5rem',
        height: '3rem',
        width: '3rem',
      }}
    />
  );
});
Face.displayName = 'Face';

const LeftArm = React.memo(() => (
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
LeftArm.displayName = 'LeftArm';

const RightArm = React.memo(() => (
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
RightArm.displayName = 'RightArm';

const LeftLeg = React.memo(() => (
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
LeftLeg.displayName = 'LeftLeg';

const RightLeg = React.memo(() => (
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
RightLeg.displayName = 'RightLeg';

const Body = React.memo(() => (
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
Body.displayName = 'Body';

const BodyParts = [
  <Face key={Face.displayName} />,
  <Body key={Body.displayName} />,
  <LeftArm key={LeftArm.displayName} />,
  <RightArm key={RightArm.displayName} />,
  <LeftLeg key={LeftLeg.displayName} />,
  <RightLeg key={RightLeg.displayName} />,
];

const MAX_GUESSES = BodyParts.length;

const Gallows = React.memo(
  ({ guessesRemaining }: { guessesRemaining: number }): JSX.Element => {
    const partsToRender = BodyParts.slice(0, MAX_GUESSES - guessesRemaining);
    return (
      <div
        className="ui-gallows"
        style={{
          height: '16rem',
          width: '8rem',
          borderLeft: '4px solid',
          borderBottom: '6px solid',
          position: 'relative',
        }}
      >
        <div
          className="ui-gallows absolute left-0 top-0"
          style={{
            width: '4rem',
            height: '1.5rem',
            borderTop: '4px solid',
            borderRight: 'thin solid',
          }}
        />
        {partsToRender}
      </div>
    );
  }
);

Gallows.displayName = 'Gallows';

export { Gallows, MAX_GUESSES };
