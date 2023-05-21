import { Box, Divider } from '@mui/material'
import { yelp_logo } from '../../assets/yelp'
import TwoStack from '../../components/TwoStack'

const GetStarted = () => {
  return (
    <>
      <Divider />
      <Box sx={styles.outerContainer}>
        <Box sx={styles.innerContainer}>
          <TwoStack
            variant='body'
            title='Powered by Yelp'
            noButton={true}
            body="Chicken Tinder is powered by Yelp's API. Tell us where you are
            and a max distance you're willing to drive and we'll find a number of restaurants around you. Then the swiping can begin. It's that simple!"
          />
          <Box>
            <img src={yelp_logo} width='150px' />
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default GetStarted

const styles = {
  outerContainer: {
    display: 'flex',
    padding: '50px 0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '30px', sm: '75px' },
    justifyContent: { xs: 'center', md: 'flex-start' },
    flexDirection: { xs: 'column', md: 'row-reverse' },
    width: { xs: '95%', sm: '85%', lg: '1100px' },
  },
}
