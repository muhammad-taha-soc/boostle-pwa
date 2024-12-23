import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Seo = ({ seo }) => {
  const { title, description, keywords } = seo;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <a href="https://storyset.com/online">Online illustrations by Storyset</a>
    </Helmet>
  );
};

Seo.propTypes = {
  seo: PropTypes.any,
};

export default Seo;
