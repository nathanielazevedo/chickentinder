import Faq from './Faq';
import Hero from './Hero';
import Footer from './Footer';
import AppStore from './GetStarted';
import HowItWorks from './HowItWorks';
import Decisions from './Decisions';

import Organize from './Organize';
import NavBar from '../../components/Navbar';
import { useEffect, useState } from 'react';

const Intro = () => {
  const [myParties, setMyParties] = useState([]);

  useEffect(() => {
    const partyInLocal = localStorage.getItem('parties');
    if (partyInLocal) {
      const partys = JSON.parse(partyInLocal);
      setMyParties(partys);
    }
  }, []);

  const showButton = myParties.length > 0;

  return (
    <>
      <NavBar myPartys={showButton} />
      <Hero />
      <AppStore />
      <HowItWorks />
      <Organize />
      <Decisions />
      <Faq />
      <Footer />
    </>
  );
};

export default Intro;
