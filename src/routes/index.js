import React, { lazy } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Protected from './protected';
import { AuthenticationGuard } from '../components/_Authentication/AuthenticationGaurd';

// App routes
const Login = lazy(() => import('../appSections/Login/Login'));
const Signup = lazy(() => import('../appSections/Signup/Signup'));
const GetStarted = lazy(() => import('../appSections/GetStarted/GetStarted'));
const FindFunding = lazy(() => import('../appSections/FindFunding/FindFunding'));
const Subscribe = lazy(() => import('../appSections/Subscribe/Subscribe'));
const Privacy = lazy(() => import('../appSections/Privacy'));
const NotFound = lazy(() => import('../appSections/NotFound'));
const AppHome = lazy(() => import('../appSections/AppHome/AppHome'));
const Settings = lazy(() => import('../appSections/Settings/Settings'));
const LoadingPage = lazy(() => import('../components/LoadingPage/LoadingPage'));
const DataVault = lazy(() => import('../appSections/DataVault/DataVault'));
const ProfileBuilder = lazy(() => import('../appSections/ProfileBuilder/ProfileBuilder'));
const GrantHub = lazy(() => import('../appSections/GrantHub/GrantHub'));
const GrantDetails = lazy(() => import('../appSections/GrantHub/GrantDetails'));
const PaymentElement = lazy(() => import('../components/StripePayment/StripePayment'));
const PaymentSuccess = lazy(() => import('../components/StripePayment/PaymentSuccess'));
const WelcomeAboard = lazy(() => import('../components/StripePayment/WelcomeAboard'));
const GrantPreview = lazy(() => import('../components/GrantPreview/GrantPreview'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="get-started" element={<GetStarted />} />
      <Route path="subscribe" element={<Subscribe />} />
      <Route path="privacy-policy" element={<Privacy />} />
      <Route path="callback" element={<LoadingPage />} />
      <Route path="find-funding" element={<FindFunding />} />
      <Route path="success" element={<PaymentSuccess />} />
      <Route path="payment" element={<PaymentElement />} />
      <Route path="welcomeaboard" element={<WelcomeAboard />} />
      <Route path="grantpreview" element={<GrantPreview />} />
      <Route element={<Protected />}>
        <Route path="home" element={<AuthenticationGuard component={AppHome} />} />
        <Route path="settings" element={<AuthenticationGuard component={Settings} />} />
        <Route path="datavault" element={<AuthenticationGuard component={DataVault} />} />
        <Route path="profilebuilder" element={<AuthenticationGuard component={ProfileBuilder} />} />
        <Route path="granthub" element={<AuthenticationGuard component={GrantHub} />} />
        <Route path="grantdetails/:applicationid/:status" element={<AuthenticationGuard component={GrantDetails} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
