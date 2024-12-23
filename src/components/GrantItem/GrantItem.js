import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { formatDate } from '../../utilities/helperFunctions';
import { ChevronRight } from 'react-bootstrap-icons';
import './GrantItem.scss';

const GrantItem = ({ id, grant, addClass, onClick, loading }) => {
  // let grantName = grant.name;
  let grantDescription;

  if (!loading && !_.isEmpty(grant)) {
    // grantName = _.truncate(grant.name, {
    //   length: 36,
    //   omission: '...',
    // });

    grantDescription = _.truncate(grant.description, {
      length: 120,
      omission: '...',
    });
  }

  if (loading || _.isEmpty(grant)) {
    return <div className={`grant-item al al--col loading`} />;
  }

  return (
    <div id={id} className={`grant-item al al--col ${addClass ? addClass : ''}`} onClick={() => onClick(grant)}>
      <div className="grant-item__top-line al al--spc">
        <div className="grant-item__grant-summary al al--col al--mid">
          <p className="grant-item__name bold">{grant.name}</p>
          <p className="grant-item__description sm no-margin">{grantDescription}</p>
        </div>
        <div className="grant-item__status al al--lft al--mid">
          <div className={`grant-item__status-tag ${grant.status === 'applied' ? 'applied' : 'to-apply'}`}>
            {grant.status}
          </div>
          {grant.new && (
            <div className="grant-item__status-tag applied">
              new
            </div>
          )}
        </div>
      </div>
      <div className="grant-item__bottom-line al al--spc al--ctr">
        <div className="grant-item__closing-date al al--ctr al--mid">
          <p className="grant-item__date sm no-margin">
            <i>Closing date: </i>
            {grant.valid_to && formatDate(grant.valid_to)}
          </p>
        </div>
        {/* <div className="grant-item__grant-amount al al--ctr al--mid">
          <p className="grant-item__amount bold no-margin sm">
            {grant.max_award_amount && formatCurrency(grant.max_award_amount, 'GBP')}
          </p>
          <p className="grant-item__amount-text no-margin sm">{` available`}</p>
        </div> */}
        <div className="grant-item__view al al--ctr al--mid">
          see more
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

GrantItem.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  grant: PropTypes.instanceOf(Object),
  addClass: PropTypes.string,
  loading: PropTypes.bool,
};

export default GrantItem;
