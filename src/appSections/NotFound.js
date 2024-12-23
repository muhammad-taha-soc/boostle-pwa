import React from 'react';
import PublicLayout from '../layouts/publicLayout';
import Seo from '../components/Seo/Seo';

function NotFound() {
  const seo = {
    title: 'Boostle',
    description: 'Empowering people to start, run and grow their business',
    keywords: ['Entrepreneur', 'Business', 'Business tool', 'New business'],
  };

  return (
    <>
      <Seo seo={seo} />
      <PublicLayout isHomepage={false} hideBanner={true} className="not-found">
        <section className="section section--subpage notFound md" id="subpage">
          <div className="section__wrap wr wr--md">
            <img src={require('../assets/images/404.gif')} alt="404 Image" />
          </div>
        </section>
      </PublicLayout>
    </>
  );
}

export default NotFound;
