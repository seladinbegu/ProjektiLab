// CookieConsent.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    console.log('Consent cookie:', consent); // Debugging log
    if (consent === undefined) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 }); // Store consent for 1 year
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set('cookieConsent', 'declined', { expires: 365 }); // Store declined consent for 1 year
    setIsVisible(false);
  };

  if (!isVisible) {
    console.log('Cookie consent banner not visible'); // Debugging log
    return null;
  }

  return (
    <div className="cookie-consent-banner">
      <p>
      "Faqja jonë përdor cookies për të përmirësuar përvojën tuaj. Duke vazhduar të vizitoni këtë faqe, pajtoheni me përdorimin e cookies."      </p>
      <button onClick={handleAccept} className="btn-accept">Prano</button>
      <button onClick={handleDecline} className="btn-decline">Refuzo</button>
    </div>
  );
};

export default CookieConsent;
