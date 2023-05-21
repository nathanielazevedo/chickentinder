import { logo_outline } from '../../assets'
import { constants } from '../../constants'
import { Box } from '@mui/material'
import TwoStack from '../../components/TwoStack'
import StepsCard from './StepsCard'

const HowItWorks = () => {
  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer}>
        <Box width={{ sx: '90%', md: '60%' }}>
          <TwoStack
            noButton={true}
            variant='dark'
            title='How It Works'
            body="
              Choose a location and a max distance from that location. We'll
              fetch all the restaurants in that area and generate a unique link
              which you can send to your friends. Swipe right on the restaurants
              you like and left on the ones you don't. Once everyone has swiped,
              or the party creator ends the voting, you will be shown the
              winner.
            "
          />
        </Box>
        <Box display={{ xs: 'none', lg: 'flex' }}>
          <img src={logo_outline} width='300px' />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: { lg: '320px' },
          gap: '50px',
          marginTop: '50px',
          width: { xs: '80%', sm: '70%', md: '50%', lg: '1100px' },
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {constants.marketingCards.map((card, i) => {
          return <StepsCard key={i} i={i} card={card} />
        })}
      </Box>
    </Box>
  )
}

export default HowItWorks

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: { xs: '100px 0', lg: '100px' },
    backgroundColor: 'black',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: { xs: '95%', sm: '90%', lg: '1100px' },
    margin: { xs: '0 15px', sm: '0 40px', lg: '0' },
    justifyContent: { xs: 'center', sm: 'space-between' },
  },
}
