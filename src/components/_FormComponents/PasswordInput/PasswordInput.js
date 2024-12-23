import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, InputGroup, FormFeedback, Input } from 'reactstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Button from '../../Button/Button';

const PasswordInput = ({ withLabel, onChange, value, wrapperClass, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormGroup
      className={`${wrapperClass ? wrapperClass : 'password-input'} ${
        errors && (errors.password || errors.wrongCredentials) ? 'input-error' : ''
      }`}
    >
      {withLabel ? <Label>Password</Label> : ''}
      <InputGroup cssModule={{ 'input-group': 'input-wrap' }}>
        <Input
          className={`${wrapperClass ? wrapperClass : 'password-input'}__input`}
          id="password-input"
          name="password-input"
          value={value}
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          placeholder={withLabel ? '' : 'Enter your password'}
          invalid={errors && (errors.wrongCredentials || errors.password)}
        />
        <Button variant="ghost" onClick={togglePasswordVisibility}>
          {showPassword ? <EyeSlash /> : <Eye />}
        </Button>
      </InputGroup>
      {errors && errors.wrongCredentials && <FormFeedback>The email or password entered is incorrect</FormFeedback>}
      {errors && errors.password && <FormFeedback>Password field cannot be empty</FormFeedback>}
    </FormGroup>
  );
};

PasswordInput.propTypes = {
  withLabel: PropTypes.bool,
  wrapperClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    password: PropTypes.bool,
    wrongCredentials: PropTypes.bool,
  }),
};

export default PasswordInput;
