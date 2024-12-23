import React from 'react';
import PublicLayout from '../layouts/publicLayout';
import Seo from '../components/Seo/Seo';

function Privacy() {
  const seo = {
    title: 'Boostle Privacy Policy',
    description: 'Empowering people to start, run and grow their business',
    keywords: ['Entrepreneur', 'Business', 'Business tool', 'New business'],
  };

  return (
    <>
      <Seo seo={seo} />
      <PublicLayout isHomepage={false} className="privacy-policy" title="Privacy Policy">
        <section className="section section--subpage md" id="subpage">
          <div className="section__wrap wr wr--md">
            <p>{`Last Updated: 8th November 2023`}</p>
            <p>
              {`At Boostle, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, share, and safeguard your data when you visit our website and use our services.`}
            </p>
            <p>
              {`By using the Boostle website and services, you consent to the practices described in this Privacy Policy. If you do not agree with these practices, please do not use our website or services.`}
            </p>
            <h4>1. Information We Collect:</h4>
            <p>{`We may collect the following types of information:`}</p>
            <ul>
              <li>
                {`Personal Information: When you sign up for an account or use our services, we may collect your name, email address, and other contact information.`}
              </li>
              <li>
                {`Billing Information: If you make a purchase, we may collect payment information such as credit card details and billing addresses.`}
              </li>
              <li>
                {`Usage Information: We collect data on how you interact with our website and services, including pages visited, time spent, and features used.`}
              </li>
              <li>
                {`Device Information: We may collect information about the device and browser you use to access our website, including IP address and geolocation data.`}
              </li>
              <li>
                {`Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your experience and gather data about website usage.`}
              </li>
            </ul>
            <br />
            <h4>2. How We Use Your Information:</h4>
            <p>{`We use your information for the following purposes:`}</p>
            <ul>
              <li>{`To provide and improve our services.`}</li>
              <li>{`To personalize your experience and provide tailored content.`}</li>
              <li>{`To process transactions and send transaction notifications.`}</li>
              <li>{`To respond to your requests, comments, or questions.`}</li>
              <li>{`To send newsletters, updates, and promotional content.`}</li>
              <li>{`To maintain the security and integrity of our website and services.`}</li>
            </ul>
            <br />
            <h4>3. Sharing Your Information:</h4>
            <p>{`We do not sell your personal information to third parties. We may share your information with:`}</p>
            <ul>
              <li>{`Service Providers: We may share your data with trusted service providers who assist us in delivering our services.`}</li>
              <li>{`Legal Requirements: We may disclose your information when required by law or to protect our rights, privacy, safety, or property.`}</li>
            </ul>
            <br />
            <h4>4. Security:</h4>
            <p>{`We take reasonable measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no data transmission or storage is 100% secure, and we cannot guarantee absolute security.`}</p>
            <h4>5. Your Choices:</h4>
            <p>{`You may have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications by following the unsubscribe instructions in our emails.`}</p>
            <h4>6. Changes to this Privacy Policy:</h4>
            <p>{`We may update this Privacy Policy to reflect changes in our practices and services. We will notify you of any significant changes by posting the updated policy on our website.`}</p>
            <h4>7. Contact Us</h4>
            <p>{`If you have questions or concerns about our Privacy Policy, please contact us at:`}</p>
            <p>
              <a href="email:info@boostle.io">info@boostle.io</a>
            </p>
            <p>{`Thank you for choosing Boostle. We are committed to protecting your privacy and providing you with the best possible service.`}</p>
          </div>
        </section>
      </PublicLayout>
    </>
  );
}

export default Privacy;
