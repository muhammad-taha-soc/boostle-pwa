import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { formatCurrency, formatDate } from '../../utilities/helperFunctions';
// import ReactCountryFlag from 'react-country-flag';
import './GrantHighlight.scss';

const GrantHighlight = ({ id, grant, addClass }) => {
  let grantName = grant.name;
  // if (grantName.length > 28) {
  //   grantName = _.truncate(grant.name, {
  //     length: 26,
  //     omission: '...',
  //   });
  // }
  const grantDescription = _.truncate(grant.description, {
    length: 76,
    omission: '...',
  });

  return (
    <div id={id} className={`grant-highlight al al--col al--str ${addClass ? addClass : ''}`} onClick={() => {}}>
      {/* <div className="grant-highlight__header al al--ctr al--spc">
        <ReactCountryFlag
          className="flag"
          countryCode="GB"
          svg
          style={{
            width: '24px',
            height: '18px',
          }}
        />
      </div> */}
      <div className="grant-highlight__information">
        <p className="grant-highlight__date xs">
          <i>Closing date:</i> {grant.valid_to && formatDate(grant.valid_to)}
        </p>
        <p className="grant-highlight__result-name lg bold ">{grantName}</p>
        <p className="grant-highlight__result-name sm no-margin">{grantDescription}</p>
      </div>
      <div className="grant-highlight__footer al al--base">
        <p className="grant-highlight__amount-text no-margin">{`Up to `}</p>
        <p className="grant-highlight__amount lg bold no-margin">
          {grant.max_award_amount && formatCurrency(grant.max_award_amount, 'GBP')}
        </p>
        <p className="grant-highlight__amount-text no-margin">{` available`}</p>
      </div>
    </div>
  );
};

GrantHighlight.propTypes = {
  id: PropTypes.string,
  grant: PropTypes.instanceOf(Object),
  addClass: PropTypes.string,
};

export default GrantHighlight;
