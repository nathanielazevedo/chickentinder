import Faq from './Faq'
import Hero from './Hero'
import Footer from './Footer'
import NavBar from './Navbar'
import Organize from './Organize'
import Decisions from './Decisions'
import AppStore from './GetStarted'
import HowItWorks from './HowItWorks'
import { useEffect, useState } from 'react'
import { getPartiesFromLocal, haveLocalParties } from '../../utils/localStorage'

const Intro = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [myParties, setMyParties] = useState<any>([])

  useEffect(() => {
    if (haveLocalParties()) setMyParties(getPartiesFromLocal())
  }, [])

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
  )
}

export default Intro
