import { Box } from '@mui/material'
import { network } from '../../assets'
import TwoStack from '../../components/TwoStack'

const Decisions = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box width={{ xs: '90%', sm: '90%', lg: '700px' }}>
          <TwoStack
            variant='dark'
            title='Make Decisions Faster'
            body='Making dinner decisions has never been easier. With Chicken Tinder, you can quickly and easily decide where to eat with your friends. No more arguing over text.'
          />
        </Box>
        <Box>
          <img src={network} width='200px' alt='network' />
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
  },
  innerContainer: {
    display: 'flex',
    gap: { xs: '50px' },
    alignItems: 'center',
    flexDirection: { xs: 'column', lg: 'row' },
    width: { xs: '100%', sm: '90%', lg: '1100px' },
    justifyContent: { xs: 'center', sm: 'space-between' },
  },
}
