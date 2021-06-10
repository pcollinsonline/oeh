import React from 'react';

const Banner = React.memo(
  (): JSX.Element => {
    return (
      <div
        data-testid="ui-banner"
        className="ui-banner helvetica f4 f3-ns ttu pa3 bb tracked lh-title"
      >
        <span className="ui-banner__text-primary">Hang</span>
        <span className="ui-banner__text-secondary">Man</span>
      </div>
    );
  }
);

Banner.displayName = 'Banner';

export default Banner;
