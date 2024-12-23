import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../_FormComponents/PasswordInput/PasswordInput';
import TextInput from '../../_FormComponents/TextInput/TextInput';
import Button from '../../Button/Button';
import './SignupForm.scss';

function SignupForm({
  onChange,
  onSubmit,
  handleKeyPressName,
  handleKeyPressEmail,
  handleKeyPressPassword,
  submitting,
  password,
  name,
  email,
  errors,
  withLabels,
}) {
  const navigate = useNavigate();
  return (
    <div className="signup-form">
      <div className="signup-form__title">
        <h4>Let’s get you set up!</h4>
        <p className="ctr">We just need a few details from you to get you all setup</p>
      </div>
      <TextInput
        wrapperClass="signup-form__name"
        type="name"
        id="name-input"
        name="name-input"
        withLabel={withLabels}
        label="Your full name"
        onChange={(event) => onChange(event)}
        onKeyPress={(e) => handleKeyPressName(e)}
        value={name}
        errors={errors}
      />
      <TextInput
        wrapperClass="signup-form__email"
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
        wrapperClass="signup-form__password"
        withLabel={withLabels}
        onChange={(event) => onChange(event)}
        onKeyPress={(e) => handleKeyPressPassword(e)}
        value={password}
        errors={errors}
      />
      <div className="signup-form__footer">
        <Button
          text="Login"
          variant="secondary"
          size="lg"
          width="wide"
          addClass="signup-form__button"
          onClick={() => onSubmit()}
          loading={submitting}
          disabled={submitting}
        />
        <p className="xs ctr">
          {`*By clicking Create my account, you agree to Boostle’s `}
          <a
            className="signup-form__terms"
            onClick={() => {
              navigate('/terms-and-conditions');
            }}
          >
            terms and conditions
          </a>
          {` and `}
          <a
            className="signup-form__privacy"
            onClick={() => {
              navigate('/privacy-policy');
            }}
          >
            privacy policy.
          </a>
        </p>
      </div>
    </div>
  );
}

SignupForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleKeyPressName: PropTypes.func,
  handleKeyPressEmail: PropTypes.func,
  handleKeyPressPassword: PropTypes.func,
  forgotPass: PropTypes.func,
  submitting: PropTypes.bool,
  withLabels: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    wrongCredentials: PropTypes.bool,
  }),
};

SignupForm.defaultProps = {
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

export default SignupForm;
