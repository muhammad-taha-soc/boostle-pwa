import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { formatDate } from '../../utilities/helperFunctions';
import { ChevronRight } from 'react-bootstrap-icons';
import './ApplicationItem.scss';

const ApplicationItem = ({ id, application, addClass, onClick, loading }) => {
  // let applicationName = application.name;
  let applicationDescription;

  if (!loading && !_.isEmpty(application)) {
    // applicationName = _.truncate(application.name, {
    //   length: 36,
    //   omission: '...',
    // });

    applicationDescription = _.truncate(application.grant.description, {
      length: 120,
      omission: '...',
    });
  }

  if (loading || _.isEmpty(application)) {
    return <div className={`application-item al al--col loading`} />;
  }

  return (
    <div id={id} className={`application-item al al--col ${addClass ? addClass : ''}`} onClick={() => onClick(application)}>
      <div className="application-item__top-line al al--spc">
        <div className="application-item__application-summary al al--col al--mid">
          <p className="application-item__name bold">{application.grant.name}</p>
          <p className="application-item__description sm no-margin">{applicationDescription}</p>
        </div>
        <div className="application-item__status al al--lft al--mid">
          <div className={`application-item__status-tag ${application.status === 'applied' ? 'applied' : 'to-apply'}`}>
            {application.submission_date ? 'submitted' : application.status === 'applied' ? 'in progress' : 'to-apply'}
          </div>
        </div>
      </div>
      <div className="application-item__bottom-line al al--spc al--ctr">
        <div className="application-created-date al al--ctr al--mid">
          <p className="application-item__date sm no-margin">
            <i>Application created date: </i>
            {application.createdAt && formatDate(application.createdAt)}
          </p>
        </div>
        {/* <div className="application-item__application-amount al al--ctr al--mid">
          <p className="application-item__amount bold no-margin sm">
            {application.max_award_amount && formatCurrency(application.max_award_amount, 'GBP')}
          </p>
          <p className="application-item__amount-text no-margin sm">{` available`}</p>
        </div> */}
        <div className="application-item__view al al--ctr al--mid">
          see more
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

ApplicationItem.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  application: PropTypes.instanceOf(Object),
  addClass: PropTypes.string,
  loading: PropTypes.bool,
};

export default ApplicationItem;
