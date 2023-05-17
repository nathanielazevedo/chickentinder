import Faq from './Faq';
import Hero from './Hero';
import Footer from './Footer';
import AppStore from './GetStarted';
import HowItWorks from './HowItWorks';
import Decisions from './Decisions';

import Organize from './Organize';

const Intro = () => {
  return (
    <>
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
