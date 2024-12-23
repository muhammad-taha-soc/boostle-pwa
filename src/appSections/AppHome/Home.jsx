import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Widget from '../../components/Widget/Widget';
import './Home.scss';

const Home = () => {
  const me = useSelector((state) => state.me);
  const user = {
    first_name: me && me.first_name ? me.first_name : '',
    last_name: me && me.last_name ? me.last_name : '',
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Equivalent to componentDidMount and componentDidUpdate
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Equivalent to componentWillUnmount
    return () => {};
  }, []);

  return (
    <main className="content-container home">
      {!isLoading ? (
        <div className="content">
          <div className="widget-grid columns-1">
            <div className="welcome al al--center al--spaced">
              <div className="welcome__title">
                <h2 className="no-margin">{`Welcome back ${user.first_name}!`}</h2>
              </div>
              <div className="welcome__edit-actions al">
                <Button
                  text="Edit widgets"
                  variant="ghost"
                  size="sm"
                  addIcon
                  icon="icon-widgets"
                  iconPosition="left"
                  onClick={() => {}}
                />
                <Button
                  text="Customise homepage"
                  variant="ghost"
                  size="sm"
                  addIcon
                  icon="icon-view-dashboard-edit"
                  iconPosition="left"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="widget-grid columns-1">
            <div className="widget-grid__column-1">
              <Widget noTitle height="sm">
                Summary widget
              </Widget>
            </div>
          </div>
          <div className="widget-grid columns-2">
            <div className="widget-grid__column-1">
              <Widget title="Company overview" />
            </div>
            <div className="widget-grid__column-2">
              <Widget title="Cards overview" />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner loading size="lg" />
      )}
    </main>
  );
};

// Home.propTypes = {

// };

// Home.defaultProps = {

// };

export { Home as TestComponent };
export default Home;
