import React from 'react';
import PropTypes from 'prop-types';
// import { CSSTransition } from 'react-transition-group';
import Button from '../../Button/Button';
import heroImage from '../../../assets/images/header-graphic.png';
import arrow from '../../../assets/images/scroll-indicator.svg';
import './HomepageBanner.scss';

function HomepageBanner({ scrollToContent }) {
  const highlightText = 'Funding';
  // const [highlightText, setHighlightText] = useState('Funding');
  // const [inProp, setInProp] = useState(true);
  // const textArray = ['Funding'];
  // let index = 0;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setInProp(false);
  //     setTimeout(() => {
  //       index = index + 1 === textArray.length ? 0 : index + 1;
  //       setHighlightText(textArray[index]);
  //       setInProp(true);
  //     }, 1500);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="homepage-banner al al--col al--ctr al--mid">
      <div className="homepage-banner__content wr wr--lg al al--mid al--ctr">
        <div className="homepage-banner__content-left al al--col al--mid al--lft">
          <h1 className="homepage-banner__hero-title display">
            {/* <CSSTransition in={inProp} timeout={1500} classNames="highlight"> */}
            <span className="homepage-banner__highlight">{highlightText}</span>
            {/* </CSSTransition> */}
            {` your business,`}
            <br />
            {`has never been so`}
            <i>{` easy`}</i>
          </h1>
          <p className="lg no-margin">
            Say goodbye to the complexities of grant applications as we intelligently find eligible grants for your
            business and automatically apply on your behalf.
          </p>
          <Button
            addClass="homepage-banner__cta"
            variant="primary"
            size="lg"
            onClick={() => scrollToContent('content')}
          >
            Tell me more
          </Button>
        </div>
        <img src={heroImage} className="homepage-banner__hero-image" alt="hero-image" />
      </div>
      <img src={arrow} className="homepage-banner__arrow" alt="logo" />
    </div>
  );
}

HomepageBanner.propTypes = {
  scrollToContent: PropTypes.func,
};

export default HomepageBanner;
