import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, InputGroup, FormFeedback, Input } from 'reactstrap';
import { GeoAltFill } from 'react-bootstrap-icons';
import Button from '../../Button/Button';
import './TextInput.scss';

const TextInput = ({
  wrapperClass,
  withLabel,
  label,
  id,
  name,
  type,
  errors,
  onChange,
  onClick,
  value,
  withIcon,
  ...props
}) => {
  return withIcon ? (
    <FormGroup>
      {withLabel ? <Label>{label}</Label> : ''}
      <InputGroup cssModule={{ 'input-group': 'input-wrap' }}>
        <Input
          type={type ? type : 'text'}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={withLabel ? '' : label}
          invalid={errors && errors.email}
          {...props}
        />
        <Button variant="ghost" borderSquare={true} onClick={onClick}>
          <GeoAltFill />
        </Button>
      </InputGroup>
      {errors && errors.email && <FormFeedback>Email field cannot be empty</FormFeedback>}
    </FormGroup>
  ) : (
    <FormGroup
      className={`${wrapperClass ? wrapperClass : 'text-input'} ${
        errors && (errors.email || errors.wrongCredentials) ? 'input-error' : ''
      }`}
    >
      {withLabel ? <Label>{label}</Label> : ''}
      <Input
        type={type ? type : 'text'}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={withLabel ? '' : label}
        invalid={errors && errors.email}
        {...props}
      />
      {errors && errors.email && <FormFeedback>Email field cannot be empty</FormFeedback>}
    </FormGroup>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  wrapperClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  withIcon: PropTypes.bool,
  errors: PropTypes.shape({
    email: PropTypes.bool,
    wrongCredentials: PropTypes.bool,
  }),
};

TextInput.defaultProps = {
  value: '',
};

export default TextInput;
