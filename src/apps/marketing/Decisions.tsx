import { Box } from '@mui/material'
import TwoStack from '../../components/TwoStack'
import { network } from '../../assets'

const Decisions = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box width={{ xs: '90%', md: '60%' }}>
          <TwoStack
            variant='dark'
            title='Make Decisions Faster'
            body='Making dinner decisions has never been easier. With Chicken Tinder, you can quickly and easily decide where to eat with your friends. No more arguing over text.'
          />
        </Box>
        <Box>
          <img src={network} width='200px' />
        </Box>
      </Box>
    </Box>
  )
}

export default Decisions

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: { xs: '70px 0', lg: '100px 0' },
    backgroundColor: 'black',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    width: { xs: '100%', sm: '90%', lg: '1100px' },
    gap: { xs: '50px' },
    justifyContent: { xs: 'center', sm: 'space-between' },
    alignItems: 'center',
  },
}
