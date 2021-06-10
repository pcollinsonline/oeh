import React from 'react';

const BannerES = React.memo(
  (): JSX.Element => {
    return (
      <div
        data-testid="ui-banner"
        className="ui-banner helvetica f3 ttu pa3 bb tracked lh-title"
      >
        <span className="ui-banner__text-primary">Juego</span>
        <span className="ui-banner__text-secondary mh2">del</span>
        <span className="ui-banner__text-primary">Ahorcado</span>
      </div>
    );
  }
);

BannerES.displayName = 'BannerES';

export default BannerES;
