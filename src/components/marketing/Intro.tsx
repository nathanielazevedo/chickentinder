import Faq from './Faq';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import AppStore from './AppStore';
import HowItWorks from './HowItWorks';
import SectionFour from './SectionFour';

import TrackYourFields from './TrackYourFields';

const Intro = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AppStore />
      <HowItWorks />
      <TrackYourFields />
      <SectionFour />
      <Faq />
      <Footer />
    </>
  );
};

export default Intro;
