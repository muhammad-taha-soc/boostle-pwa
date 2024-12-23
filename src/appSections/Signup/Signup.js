import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation';
import autoAnimate from '@formkit/auto-animate';
import PublicLayout from '../../layouts/publicLayout';
import Seo from '../../components/Seo/Seo';
import SearchInput from '../../components/_FormComponents/SearchInput/SearchInput';
// import Button from '../../components/Button/Button';
import AuthButton from '../../components/AuthButton/AuthButton';
// import SignupForm from '../../components/_Forms/SignupForm/SignupForm';
import { findBusiness, getBusinessInformation } from '../../utilities/apiCalls';
import { ChevronRight } from 'react-bootstrap-icons';
import logo from '../../assets/images/boostle-logo-black.svg';
import './Signup.scss';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parentRef = useRef();
  const [companyName, setCompanyName] = useState('');
  const [fetchingCompanySummary, setFetchingCompanySummary] = useState(false);
  const [companySummaryRetrieved, setCompanySummaryRetrieved] = useState(false);
  const [companySummaryEmpty, setCompanySummaryEmpty] = useState(false);
  const [companySummary, setCompanySummary] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [setupAccountCredentials, setAccountCredentialsView] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [submitting, setSubmitting] = useState(false);
  // const [loginFormErrors, setLoginFormErrors] = useState({
  //   email: false,
  //   password: false,
  //   wrongCredentials: false,
  // });

  const seo = {
    title: 'Signup to Boostle',
    description: 'Empowering people to start, run and grow their business',
    keywords: ['Entrepreneur', 'Business', 'Business tool', 'New business'],
  };

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const searchForCompany = async () => {
    setCompanySummaryRetrieved(false);
    setFetchingCompanySummary(true);
    const payload = {
      params: {
        q: companyName,
      },
    };
    const result = await findBusiness(payload);
    console.log('searchForCompany result', result);
    if (result.code === 200 && result.result) {
      if (result.result.length > 0) {
        setFetchingCompanySummary(false);
        setCompanySummaryRetrieved(true);
        setCompanySummary(result.result);
      } else {
        setCompanySummaryRetrieved(true);
        setFetchingCompanySummary(false);
        setCompanySummaryEmpty(true);
        setCompanySummary([]);
      }
    } else if (result.error) {
      setFetchingCompanySummary(false);
      throw new Error(result.error);
    }
  };

  const fetchBusinessInfo = async (company) => {
    console.log('fetchBusinessInfo company', company);
    setCompanyDetails(company);
    setCompanySummaryEmpty(false);
    const payload = {
      companyId: company.company_number,
    };
    console.log('fetchBusinessInfo payload', payload);
    const result = await getBusinessInformation(payload);
    console.log('fetchBusinessInfo result', result);
    if (result.code === 200 && result.result) {
      setCompanyDetails(result.result);
      dispatch(setBusinessInformation(result.result));
      console.log('companyDetails', companyDetails);
      setAccountCredentialsView(true);
    } else if (result.error) {
      throw new Error(result.error);
    }
  };

  const searchForCompanyKeypress = (e) => {
    if (e.key === 'Enter') {
      searchForCompany();
    }
  };

  const handleSearchCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    // handleLoginFormErrors();
  };

  // const onLoginInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'email-input') {
  //     setEmail(value);
  //   }
  //   if (name === 'password-input') {
  //     setPassword(value);
  //   }
  // };

  // const handleKeyPressEmail = (e) => {
  //   if (e.key === 'Enter') {
  //     document.getElementById('password-input').focus();
  //   }
  // };

  // const handleKeyPressPassword = (e) => {
  //   if (e.key === 'Enter') {
  //     submitLoginForm();
  //   }
  // };

  // const submitLoginForm = () => {
  //   setSubmitting(true);
  //   handleLoginFormErrors();
  //   authenticate();
  // };

  // const authenticate = () => {
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     navigate('/home');
  //     console.log('push to home');
  //   }, 1500);
  // };

  // const handleLoginFormErrors = () => {
  //   setLoginFormErrors();
  // };

  const pushToLogin = () => {
    navigate('/');
  };

  return (
    <>
      <Seo seo={seo} />
      <PublicLayout title="Signup" className="signup-page al" isPublic={true}>
        <div className="signup-page__content-left al al--mid al--ctr" />
        <div className="signup-page__content-right al al--mid al--ctr">
          <div className="signup-page__signup-form wr wr--xs">
            {setupAccountCredentials ? (
              <>
                <h4>{`${companyDetails.name}, let's get you setup`}</h4>
                <p className="small">{`Click below to set your account up with us.`}</p>
                <AuthButton isSignup />
              </>
            ) : (
              <>
                <Link to="/" className="signup-page__logo">
                  <img src={logo} alt="logo" width="180" />
                </Link>
                <h3 className="signup-page__title ctr">Sign up to continue</h3>
                <p className="small ctr">
                  {`Type the name of your company below as it was spelt when it was registered. The field isn't case sensitive.`}
                </p>
                <SearchInput
                  id="search"
                  name="search"
                  label="Type your company name here"
                  value={companyName}
                  loading={fetchingCompanySummary}
                  onChange={handleSearchCompanyNameChange}
                  onSubmit={searchForCompany}
                  onKeyDown={searchForCompanyKeypress}
                />
                {companySummaryRetrieved && companySummary.length > 0 ? (
                  <div className={`get-started__company-results ${companySummary.length > 1 ? 'multiple' : ''}`}>
                    {companySummary.length > 1 ? (
                      <div className="al al--spc al--ctr">
                        <p className="sm">Please choose your company</p>
                        <p className="sm bold">{companySummary.length} results</p>
                      </div>
                    ) : (
                      <p className="sm bold">Is this your company?</p>
                    )}
                    {companySummary.map((c, i) => (
                      <div className="get-started__company-result al al--spc al--ctr" key={i.toString()}>
                        <p className="sm bold no-margin">{c.company_name}</p>
                        <AuthButton
                          isSignup={true}
                          companyDetails={companyDetails}
                          size="sm"
                          variant="primary"
                          addClass="get-started__submit"
                          disabled={!companySummaryRetrieved || companyName === ''}
                          onClick={() => fetchBusinessInfo(c)}
                        >
                          Come on in! <ChevronRight />
                        </AuthButton>
                      </div>
                    ))}
                  </div>
                ) : companySummaryEmpty ? (
                  <div className="get-started__company-result-empty al al--spc al--ctr">
                    <p className="sm bold no-margin">
                      {`Oops, we couldn't find any companies regstered with that name. Please try again.`}
                    </p>
                  </div>
                ) : null}
              </>
            )}
            {/* <SignupForm
              onSubmit={submitLoginForm}
              // forgotPass={forgotPass}
              onChange={(e) => onLoginInputChange(e)}
              handleKeyPressEmail={handleKeyPressEmail}
              handleKeyPressPassword={handleKeyPressPassword}
              submitting={submitting}
              password={password}
              email={email}
              errors={loginFormErrors}
            /> */}
          </div>
          <div className="signup-page__login">
            <p className="no-margin">
              Already have an account with us?{' '}
              <button className="signup-page__login-link button button--ghost" onClick={pushToLogin}>
                Login here
              </button>
            </p>
          </div>
        </div>
      </PublicLayout>
    </>
  );
}

export default Signup;
