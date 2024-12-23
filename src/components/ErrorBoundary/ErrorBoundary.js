import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.toString(),
    };
  }

  componentDidCatch(error, info) {
    // this.logErrorToServices(error.toString(), info.componentStack);
    console.log('error caught by error boundary:', error, info);
  }

  // A fake logging service.
  // logErrorToServices = console.log;

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
  // children: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
};

export default ErrorBoundary;
