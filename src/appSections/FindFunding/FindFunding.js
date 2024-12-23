import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation';
import { setUserSignup } from '../../redux/actions/setUserSignup';
import _ from 'lodash';
import autoAnimate from '@formkit/auto-animate';
import PublicLayout from '../../layouts/publicLayout';
import Seo from '../../components/Seo/Seo';
// import TextInput from '../../components/_FormComponents/TextInput/TextInput';
// import SelectInput from '../../components/_FormComponents/SelectInput/SelectInput';
import SearchInput from '../../components/_FormComponents/SearchInput/SearchInput';
import Button from '../../components/Button/Button';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import GrantHighlight from '../../components/GrantHighlight/GrantHighlight';
import Modal from '../../components/Modal/Modal';
import AuthButton from '../../components/AuthButton/AuthButton';
// import CreateAccount from '../../components/_Forms/CreateAccount/CreateAccount';
// import LoginForm from '../../components/LoginForm/LoginForm';
import { findBusiness, getBusinessInformation, getGrantPreviewResults } from '../../utilities/apiCalls';
import { formatCurrency, findSectors } from '../../utilities/helperFunctions';
// import resultsGraphic from '../../assets/images/milestones-graphic.svg';
import { ChevronRight } from 'react-bootstrap-icons';
import './FindFunding.scss';

function FindFunding() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const parentRef = useRef();
  const [companyName, setCompanyName] = useState('');
  const [fetchingCompanySummary, setFetchingCompanySummary] = useState(false);
  const [companySummaryRetrieved, setCompanySummaryRetrieved] = useState(false);
  const [companySummaryEmpty, setCompanySummaryEmpty] = useState(false);
  const [companySummary, setCompanySummary] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  // const [selectedSector, setSelectedSector] = useState('');
  const [step, setStep] = useState(1);
  const [fetchingGrants, setFetchingGrants] = useState(false);
  const [grantsListFetched, setGrantsListFetched] = useState(false);
  const [grantsList, setGrantsList] = useState([]);
  const [totalPotentialEligible, setTotalPotentialEligible] = useState(0);
  const [totalEligibleGrants, setTotalEligibleGrants] = useState(0);
  const [sector, setSector] = useState('');
  const [location, setLocation] = useState('');
  const [modalIsOpen, setModelIsOpen] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [submitting, setSubmitting] = useState(false);
  // const [loginFormErrors, setLoginFormErrors] = useState({
  //   email: false,
  //   password: false,
  //   wrongCredentials: false,
  // });

  const seo = {
    title: 'Boostle grant finder',
    description: `Simply let us know the registered name of your business in the UK and we'll search for grants specific to your business and sector. All you have to do to apply is sign up and pick a package and we can help your business apply and win a variety of grants.`,
    keywords: [
      'Business',
      'Grants',
      'Business grants',
      'Grant tool',
      'Business tool',
      'Funding',
      'Grant application Scotland',
    ],
  };

  useEffect(() => {
    document.getElementById('search').focus();
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current, {
        duration: 300,
        easing: 'ease-out',
      });
    }
  }, [parentRef]);

  useEffect(() => {
    if (fetchingGrants) {
      fetchGrantsList();
    }
  }, [fetchingGrants]);

  const searchForCompany = async () => {
    setCompanySummaryRetrieved(false);
    setFetchingCompanySummary(true);
    const payload = {
      params: {
        q: companyName,
      },
    };
    const result = await findBusiness(payload);
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
    setCompanyDetails(company);
    setCompanySummaryEmpty(false);
    setFetchingGrants(!fetchingGrants);
    const payload = {
      companyId: company.company_number,
    };
    const result = await getBusinessInformation(payload);
    if (result.code === 200 && result.result) {
      dispatch(setBusinessInformation(result.result));
      fetchGrantsList(result.result);
    } else if (result.error) {
      throw new Error(result.error);
    }
  };

  const fetchGrantsList = async (business) => {
    dispatch(setUserSignup(true));
    if (business) {
      setCompanyDetails(business);
      const payload = {
        business: business._id,
      };
      const result = await getGrantPreviewResults(payload);
      const totalGrantsAmount = result.result.totalAmount;
      const totalNewGrantsAmount = result.result.newGrants.reduce((sum, obj) => sum + obj.max_award_amount, 0);
      const updateTotalPotentialEligible = formatCurrency(totalGrantsAmount+totalNewGrantsAmount, 'GBP');
      const extrapolateSector = findSectors(business.sector[0]);
      setSector(_.truncate(extrapolateSector, { length: 32, omission: '...' }));
      setLocation(business.address.locality);
      setTotalPotentialEligible(updateTotalPotentialEligible);
      setTotalEligibleGrants(result.result.count+result.result.newGrantsCount);
      setFetchingGrants(false);
      setGrantsListFetched(true);
      setGrantsList([...result.result.grants,...result.result.newGrants]);
      handleNextStep();
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

  // const handleLocationChange = (e) => {
  //   setLocation(e.target.value);
  //   handleLoginFormErrors();
  // };

  // const handleGetLocation = () => {
  //   // Use geolocation API to get the user's location
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     console.log('Latitude: ', latitude);
  //     console.log('Longitude: ', longitude);
  //     // Write code here to use the latitude and longitude
  //   });
  // };

  // const handleSectorChange = (e) => {
  //   if (e.target.value === 'Please choose a sector') {
  //     setSelectedSector('');
  //   } else {
  //     setSelectedSector(e.target.value);
  //   }
  // };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const toggleModal = () => {
    setModelIsOpen(!modalIsOpen);
  };

  // Login form logic
  // const submitLoginForm = () => {
  //   setSubmitting(true);
  //   authenticate();
  // };

  // const authenticate = () => {
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     navigate('/home');
  //   }, 1500);
  // };

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

  // const handleLoginFormErrors = () => {
  //   setLoginFormErrors();
  // };

  return (
    <>
      <Seo seo={seo} />
      <PublicLayout title="Get Started" className="get-started" withHeader={true}>
        {step === 1 && (
          <div
            className={`get-started__wrap step-1 al al--col ${companySummaryRetrieved && !fetchingGrants ? 'full-screen' : 'al--ctr al--mid'}`}
          >
            <div
              className={`get-started__content ${fetchingGrants ? 'loading' : ''} al al--col al--mid al--ctr wr wr--sm`}
            >
              {fetchingGrants ? (
                <>
                  <LoadingSpinner loading={fetchingGrants} size="lg" />
                  <p className="get-started__content-loading">Searching all available grants and funds...</p>
                </>
              ) : (
                <div ref={parentRef}>
                  <div className="get-started__form">
                    <h2 className="xbold ctr">Business funds in under 2 minutes</h2>
                    <p className="ctr">
                      {`Simply search for your company below, as it was spelt when it was registered, select your business and we’ll curate your very own grant list.`}
                    </p>
                    <SearchInput
                      id="search"
                      name="search"
                      label="Type your company name here"
                      size="lg"
                      value={companyName}
                      loading={fetchingCompanySummary}
                      onChange={handleSearchCompanyNameChange}
                      onSubmit={searchForCompany}
                      onKeyDown={searchForCompanyKeypress}
                    />
                  </div>
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
                          <Button
                            size="sm"
                            variant="primary"
                            addClass="get-started__submit"
                            disabled={!companySummaryRetrieved || companyName === ''}
                            onClick={() => fetchBusinessInfo(c)}
                          >
                            Show me the money <ChevronRight />
                          </Button>
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
                </div>
              )}
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            {grantsListFetched ? (
              <div
                className={`get-started__sign-up al al--col al--mid ${
                  grantsListFetched && step === 2 ? 'results' : ''
                }`}
              >
                <div className="get-started__sign-up-content wr wr--sm al al--col al--ctr">
                  <h4>Unlock your grant opportunities</h4>
                  <p className="no-margin">
                    {`To access all of the available grants you’re eligible for and for us to auto apply for them, you'll need to create an account. Don't worry, it takes less than a minute.`}
                  </p>
                  <br />
                  <AuthButton isSignup={true} companyDetails={companyDetails} />
                </div>
              </div>
            ) : null}
            <div className={`get-started__wrap step-2 al al--col ${grantsListFetched && step === 2 ? 'results' : ''}`}>
              <div className="get-started__content al al--col wr ">
                <div className="get-started__results-summary al al--mid al--ctr">
                  <div ref={parentRef} className="get-started__results-summary-text">
                    <h2 className="get-started__content-title xbold ctr">
                      {`${companyDetails.name}, you're eligible for up to `}
                      <span className="total-amount">{totalPotentialEligible}!</span>
                    </h2>
                    <p className="get-started__content-description lg ctr">
                      {`We've identified `}
                      <span>
                        {`${totalEligibleGrants || grantsList.length} ${grantsList.length > 1 ? 'grants' : 'grant'} `}{' '}
                      </span>
                      {`applicable to your business, based on your information.`}
                    </p>
                    <div className="get-started__business-summary al al--mid al--ctr">
                      <p className="get-started__business-summary-title no-margin sm">
                        Grant Region: <span>UK</span>
                      </p>
                      <p className="get-started__business-summary-title no-margin sm">
                        Sector: <span>{sector}</span>
                      </p>
                      <p className="get-started__business-summary-title no-margin sm">
                        Your location: <span>{location}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`get-started__results ${grantsList.length === 1 ? 'one' : ''} ${grantsList.length === 2 ? 'two' : ''}`}
                >
                  {grantsList.map((grant, i) => (
                    <GrantHighlight id={i.toString()} key={i.toString()} grant={grant} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </PublicLayout>
      {modalIsOpen ? (
        <Modal isOpen={modalIsOpen} toggleModal={toggleModal} contentLabel="Signup Modal">
          <div ref={parentRef} className="wr wr--xs">
            <p className="lg bold ctr">Lets get your account setup</p>
            <p className="ctr">
              Once you have an account, we’ll apply for these grants and you can see the status of all your
              applications.
            </p>
            <AuthButton isSignup={true} />
            {/* <CreateAccount
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
        </Modal>
      ) : null}
    </>
  );
}

export default FindFunding;
