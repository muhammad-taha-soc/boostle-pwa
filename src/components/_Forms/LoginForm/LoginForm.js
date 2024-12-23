import React from 'react';
import PropTypes from 'prop-types';
import PasswordInput from '../../_FormComponents/PasswordInput/PasswordInput';
import TextInput from '../../_FormComponents/TextInput/TextInput';
import Button from '../../Button/Button';
import './LoginForm.scss';

function LoginForm({
  onChange,
  onSubmit,
  forgotPass,
  handleKeyPressPassword,
  handleKeyPressEmail,
  submitting,
  password,
  email,
  errors,
  withLabels,
}) {
  return (
    <div className="login-form">
      <TextInput
        wrapperClass="login-form__email"
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
        wrapperClass="login-form__password"
        withLabel={withLabels}
        onChange={(event) => onChange(event)}
        onKeyPress={(e) => handleKeyPressPassword(e)}
        value={password}
        errors={errors}
      />
      <div className="login-form__password-footer al al--col  al--mid al--ctr">
        <button type="button" onClick={forgotPass} className="login-form__forgot-password">
          Forgot password?
        </button>
      </div>
      <div className="login-form__footer">
        <Button
          text="Login"
          variant="primary"
          size="lg"
          width="wide"
          addClass="login-form__button"
          onClick={() => onSubmit()}
          loading={submitting}
          disabled={submitting}
        />
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleKeyPressEmail: PropTypes.func.isRequired,
  handleKeyPressPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  forgotPass: PropTypes.func,
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

LoginForm.defaultProps = {
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

export default LoginForm;
