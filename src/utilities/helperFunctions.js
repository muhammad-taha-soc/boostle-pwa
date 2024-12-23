import { sectors } from './constants';
import { differenceInCalendarDays, parseISO } from 'date-fns';

export const getDeviceOS = () => {
  if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
  if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
  if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
  if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) return 'Windows Vista';
  if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) return 'Windows XP';
  if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) return 'Windows 2000';
  if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'Mac/iOS';
  if (window.navigator.userAgent.indexOf('X11') !== -1) return 'UNIX';
  if (window.navigator.userAgent.indexOf('Linux') !== -1) return 'Linux';
  return 'UNKNOWN';
};

export const formatCurrency = (amount, currency, locale = 'en-GB') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: Math.floor(amount) === amount ? 0 : 2, // No decimal places if whole number
  }).format(amount);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Example format: "April 1, 2010"
  return new Date(dateString).toLocaleDateString(undefined, options);
};


export const findSectors = (code) => {
  // const allSections = {
  //   ...agricultureForestryFishing,
  //   ...miningQuarrying,
  //   // ... other sections
  // };
  return sectors[code] || 'Code not found';
};

export const getDaysRemainingWithFiveDaysSubtracted = (validToDate) => {
  const daysRemaining = differenceInCalendarDays(parseISO(validToDate), new Date());
  // return `Apply within ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} `;
  if (daysRemaining >= 5) {
    return daysRemaining - 5;
  }
  return daysRemaining;
};
export const getApplicationStartDate = (applicationStartDate) => {
  return formatDate(applicationStartDate);
};
export const adjustDeadline = (grant) => {
  const today = new Date();
  const deadline = new Date(grant.valid_to);
  const timeDiff = deadline.getTime() - today.getTime();
  // eslint-disable-next-line no-unused-vars
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff <= 5) {
    grant.flag = true; // Flagging the grant if the deadline is 5 days or less away
  } else {
    const newDeadline = new Date(deadline.setDate(deadline.getDate() - 5));
    grant.valid_to = newDeadline.toISOString().split('T')[0]; // Updating the deadline by reducing 5 days
  }
  return grant;
};
export const calculateProgress = (grant) => {
  const hasContent = grant.grant && grant.grant.application_content;
  const hasAnswers =
    grant.responses &&
    grant.responses.content &&
    grant.responses.content.sections &&
    grant.responses.content.sections.every((section) =>
      section.questions.every(
        (question) => !question.mandatory || (question.answer != null && question.answer !== ''),
      ),
    );

  if (hasContent && hasAnswers) {
    return grant.responses.content.sections.every((section) =>
      section.questions.every((question) => question.answer != null && question.answer !== ''),
    )
      ? 100
      : 75;
  } else if (hasContent) {
    return 50;
  } else {
    return 25;
  }
};