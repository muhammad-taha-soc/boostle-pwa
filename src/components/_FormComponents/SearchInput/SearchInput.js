import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, InputGroup, FormFeedback, Input } from 'reactstrap';
import { Search } from 'react-bootstrap-icons';
import Button from '../../Button/Button';
import './SearchInput.scss';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const SearchInput = ({
  value,
  wrapperClass,
  withLabel,
  label,
  disabled,
  focused,
  loading,
  onSubmit,
  onChange,
  onBlur,
  onKeyDown,
  onFocus,
  name,
  size,
  className,
  errors,
  id,
  autoFocus,
}) => (
  <FormGroup className={`search-input ${wrapperClass ? wrapperClass : ''} ${size ? size : ''}`}>
    {withLabel ? <Label>{label}</Label> : ''}
    <InputGroup
      cssModule={{ 'input-group': 'search-input__input-wrap al' }}
      className={`${className ? className : ''}`}
    >
      <Input
        cssModule={{ 'form-control': 'search-input__input' }}
        type="search"
        id={id}
        name={name}
        value={value}
        placeholder={withLabel ? '' : label}
        onChange={onChange}
        focused={focused ? 'focused' : ''}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoFocus={autoFocus}
        invalid={errors && errors.search}
      />
      <Button variant="ghost" borderSquare={true} onClick={onSubmit} type="submit" addClass="search-input__submit">
        
        {loading ? <LoadingSpinner loading /> : <Search  className="icon-space" />}
      </Button>
    </InputGroup>
    {errors && errors.search && <FormFeedback>Email field cannot be empty</FormFeedback>}
  </FormGroup>
);

SearchInput.propTypes = {
  value: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  wrapperClass: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  pattern: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  addInputClass: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  autoFocus: PropTypes.string,
  errors: PropTypes.shape({
    search: PropTypes.bool,
    empty: PropTypes.bool,
  }),
};

SearchInput.defaultProps = {
  value: '',
  variant: 'basic',
  pattern: '.*',
  invalid: false,
  valid: null,
  disabled: false,
  focused: false,
  onSubmit: null,
  onChange: null,
  onKeyPress: null,
  onKeyDown: null,
  onFocus: null,
  onBlur: null,
  name: '',
  className: '',
  addInputClass: '',
  id: '',
  type: 'text',
};

export default SearchInput;
