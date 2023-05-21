import Faq from './Faq';
import Hero from './Hero';
import Footer from './Footer';
import NavBar from './Navbar';
import Organize from './Organize';
import Decisions from './Decisions';
import AppStore from './GetStarted';
import HowItWorks from './HowItWorks';
import { useEffect, useState } from 'react';
import {
  getPartiesFromLocal,
  haveLocalParties,
} from '../../utils/localStorage';

const Intro = () => {
  const [myParties, setMyParties] = useState([]);

  useEffect(() => {
    if (haveLocalParties()) setMyParties(getPartiesFromLocal());
  }, []);

  return (
    <>
      <NavBar myPartys={myParties.length > 0} />
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
