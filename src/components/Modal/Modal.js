import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { array } from 'joi';
import Button from '../Button/Button';
import { XLg } from 'react-bootstrap-icons';
import './Modal.scss';

const Modal = ({ children, toggleModal, isOpen, size }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return function cleanup() {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <div className={`b-modal ${isOpen ? 'visible' : ''}`}>
      <div className={`b-modal__wrap ${size ? size : 'md'}`}>
        <div className="b-modal__header al al--end al--ctr">
          <Button onClick={toggleModal}>
            <XLg />
          </Button>
        </div>
        <div className="b-modal__content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.element, PropTypes.instanceOf(array)]),
  size: PropTypes.string,
  toggleModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Modal;
