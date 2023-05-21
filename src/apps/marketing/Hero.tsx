import { Box } from '@mui/material'
import { logo_p_trans } from '../../assets'
import TwoStack from '../../components/TwoStack'

const Hero = () => {
  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer}>
        <TwoStack
          variant='hero'
          title='Where are we eating?'
          body="Organize a group dinner without the hassle. Chicken Tinder helps your party decide where to eat and when. Swipe right on the restaurants you like and left on the ones
              you don't. Your votes are anonymous, so you can vote for your
              favorite restaurants without worrying about peer pressure."
        />
        <Box display={{ xs: 'none', lg: 'flex', paddingLeft: '100px' }}>
          <img src={logo_p_trans} width='350px' />
        </Box>
      </Box>
    </Box>
  )
}

export default Hero

const styles = {
  outerContainer: {
    height: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,0,0)',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: { xs: '95%', sm: '90%', lg: '1100px' },
    justifyContent: { xs: 'center', lg: 'space-between' },
  },
}
