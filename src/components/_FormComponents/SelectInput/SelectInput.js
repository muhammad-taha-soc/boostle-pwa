import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { ChevronDown } from 'react-bootstrap-icons';
import './SelectInput.scss';

const SelectInput = ({ label, onChange, options, addClass, value, ...props }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup bsPrefix="input-wrap select-input">
        <Form.Control
          className={`select-input__field ${addClass ? addClass : ''}`}
          as="select"
          onChange={onChange}
          value={value}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.value}
            </option>
          ))}
        </Form.Control>
        <ChevronDown className="select-input__icon" />
      </InputGroup>
    </Form.Group>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string,
  addClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectInput;
