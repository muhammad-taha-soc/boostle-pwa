import React from 'react';
import PropTypes from 'prop-types';
import { useCountdown } from '../../hooks/useCountdown.js';
import './Timer.scss';

const Timer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <div className="Timer al">{`We're ready!`}</div>;
  } else {
    return (
      <div className="Timer al">
        <div className="Timer__block Timer__days al al--col al--ctr">
          <h1>{days}</h1>
          <span className="Timer__unit">days</span>
        </div>
        <div className="Timer__block Timer__hours al al--col al--ctr">
          <h1>{hours}</h1>
          <span className="Timer__unit">hours</span>
        </div>
        <div className="Timer__block Timer__minutes al al--col al--ctr">
          <h1>{minutes}</h1>
          <span className="Timer__unit">minutes</span>
        </div>
        <div className="Timer__block Timer__seconds al al--col al--ctr">
          <h1>{seconds}</h1>
          <span className="Timer__unit">seconds</span>
        </div>
      </div>
    );
  }
};

Timer.propTypes = {
  targetDate: PropTypes.string,
};

export default Timer;
