import React from 'react';
import PropTypes from 'prop-types';
import PasswordInput from '../../_FormComponents/PasswordInput/PasswordInput';
import TextInput from '../../_FormComponents/TextInput/TextInput';
import Button from '../../Button/Button';
import './CreateAccount.scss';

function CreateAccount({
  onChange,
  onSubmit,
  handleKeyPressName,
  handleKeyPressEmail,
  handleKeyPressPassword,
  submitting,
  password,
  email,
  errors,
  withLabels,
}) {
  return (
    <div className="create-account-form">
      <TextInput
        wrapperClass="create-account-form__name"
        type="text"
        id="name-input"
        name="name-input"
        withLabel={withLabels}
        label="Your name"
        onChange={(event) => onChange(event)}
        onKeyPress={(e) => handleKeyPressName(e)}
        value={email}
        errors={errors}
      />
      <TextInput
        wrapperClass="create-account-form__email"
        type="email"
        id="email-input"
        name="email-input"
        withLabel={withLabels}
        label="Email address"
        onChange={(event) => onChange(event)}
        onKeyPress={(e) => handleKeyPressEmail(e)}
        value={email}
        errors={errors}
      />
      <PasswordInput
        wrapperClass="create-account-form__password"
        withLabel={withLabels}
        onChange={(event) => onChange(event)}
        onKeyPress={(e) => handleKeyPressPassword(e)}
        value={password}
        errors={errors}
      />
      <div className="create-account-form__button">
        <Button
          text="Create my account*"
          variant="primary"
          size="lg"
          width="wide"
          addClass="create-account-form-button"
          onClick={() => onSubmit()}
          loading={submitting}
          disabled={submitting}
        />
      </div>
      <div className="create-account-form__footer al al--col  al--mid al--ctr">
        <p className="create-account-form__disclaimer xs ctr">
          *By clicking Create my account, you create an account and agree to our terms and conditions and privacy
          policy.
        </p>
      </div>
    </div>
  );
}

CreateAccount.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleKeyPressName: PropTypes.func.isRequired,
  handleKeyPressEmail: PropTypes.func.isRequired,
  handleKeyPressPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  withLabels: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    wrongCredentials: PropTypes.bool,
  }),
};

CreateAccount.defaultProps = {
  submitting: false,
  withLabels: false,
  email: '',
  password: '',
  errors: {
    email: false,
    password: false,
    wrongCredentials: false,
  },
};

export default CreateAccount;
