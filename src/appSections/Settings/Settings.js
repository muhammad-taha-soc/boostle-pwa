import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { setAutoApplyGrants } from '../../redux/actions/setAutoApplyGrants';
import ProtectedLayout from '../../layouts/protectedLayout';
import TextInput from '../../components/_FormComponents/TextInput/TextInput';
import { FormGroup, Input } from 'reactstrap';
import { findSectors } from '../../utilities/helperFunctions';
import { updateUser } from '../../utilities/apiCalls';
import Button from '../../components/Button/Button';
import './Settings.scss';
import { setUserInformation } from '../../redux/actions/setUserInformation';

const Settings = () => {
  const dispatch = useDispatch();
  const [settingsView, setSettingsView] = useState(0);
  const businessInfo = useSelector((state) => state.business.businessInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const autoApplyGrants = useSelector((state) => state.autoApply.autoApplyGrants);
  const businessAddress =
    !_.isEmpty(businessInfo) && businessInfo.address
      ? `${businessInfo.address.address_line_1}, ${businessInfo.address.country}, ${businessInfo.address.locality}, ${businessInfo.address.postal_code}`
      : '';
  const businessSector = !_.isEmpty(businessInfo) && businessInfo.sector ? findSectors(businessInfo.sector[0]) : '';

  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  // const [email, setEmail] = useState(userInfo.email);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const hasChanged = firstName !== userInfo.first_name || lastName !== userInfo.last_name;
    setIsChanged(hasChanged);
  }, [firstName, lastName, userInfo]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  const handleUpdate = async () => {
    try {
      // Call the API to update the user information
      await updateUser({ first_name: firstName, last_name: lastName });
      
      // Dispatch an action to update the userInfo in the Redux store
      dispatch(setUserInformation( { ...userInfo, first_name: firstName, last_name: lastName }));

      // Optionally, you can set isChanged to false after a successful update
      setIsChanged(false);

      console.log('User information updated successfully.');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const setContent = (option) => {
    setSettingsView(option);
  };

  const changeOption = () => {
    dispatch(setAutoApplyGrants(!autoApplyGrants));
  };

  return (
    <>
      <ProtectedLayout isPublic={false} classname="al b-app-settings">
        <div className="b-app-settings__navigation al al--col al--rgt">
          <ul className="b-app-settings__menu">
            <li
              className={`b-app-settings__menu-option ${settingsView === 0 ? 'active' : ''}`}
              onClick={() => setContent(0)}
            >
              Your details
            </li>
            <li
              className={`b-app-settings__menu-option ${settingsView === 1 ? 'active' : ''}`}
              onClick={() => setContent(1)}
            >
              Company information
            </li>
          </ul>
        </div>
        <div className="b-app-settings__section">
          {settingsView === 0 && (
            <div className="b-app-settings__user-profile wr wr--sm">
              <div className="b-app-settings__section-title">
                <h3>Your details</h3>
              </div>
              <TextInput
                withLabel
                label={'First name'}
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextInput
                withLabel
                label={'Last name'}
                value={lastName}
                onChange={handleLastNameChange}
              />
              <TextInput
                withLabel
                label={'Your email'}
                value={userInfo.email}
                onChange={() => {}} 
                onClick={() => {}} 
              />
              {isChanged && (
                <Button className="login-form__button" onClick={handleUpdate}>Update</Button>
              )}
            </div>
          )}
          {settingsView === 1 && (
            <div className="b-app-settings__company-summary wr wr--sm">
              <div className="b-app-settings__section-title">
                <h3>Company information</h3>
              </div>
              <TextInput
                withLabel
                label={'Your name'}
                value={businessInfo.name}
                onChange={() => {}}
              />
              <TextInput
                withLabel
                label={'Your address'}
                value={businessAddress}
                onChange={() => {}}
              />
              <TextInput
                withLabel
                label={'Business number'}
                value={businessInfo.company_number}
                onChange={() => {}}
              />
              <TextInput
                withLabel
                label={'Business sector'}
                value={businessSector}
                onChange={() => {}}
              />
            </div>
          )}
          {settingsView === 2 && (
            <div className="b-app-settings__grant-options wr wr--sm">
              <div className="b-app-settings__section-title">
                <h3>Grant applications</h3>
              </div>
              <div className="b-app-settings__grant-option al al--spc al--ctr">
                <div className="b-app-settings__grant-option-title">
                  <p className="bold">Auto apply for all grants</p>
                  <p className="sm no-margin">
                    Allow Boostle to auto apply for all the grants that we continuously curate for you
                  </p>
                </div>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={autoApplyGrants}
                    onChange={() => {
                      changeOption();
                    }}
                  />
                  {/* <Label check>Checked switch checkbox input</Label> */}
                </FormGroup>
              </div>
            </div>
          )}
        </div>
      </ProtectedLayout>
    </>
  );
};

export default Settings;
