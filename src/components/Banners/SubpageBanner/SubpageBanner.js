import React from 'react';
import PropTypes from 'prop-types';
import './SubpageBanner.scss';

function SubpageBanner({ title }) {
  return (
    <div className="header al al--col al--ctr al--mid">
      <div className="header__content wr wr--lg al al--col al--ctr al--mid">
        <h1>{title}</h1>
        {/* <Button className="homepage-banner__cta" variant="primary" size="lg" onClick={() => scrollToContent('content')}>
          Tell me more
        </Button> */}
      </div>
    </div>
  );
}

SubpageBanner.propTypes = {
  title: PropTypes.string,
  scrollToContent: PropTypes.func,
};

export default SubpageBanner;
