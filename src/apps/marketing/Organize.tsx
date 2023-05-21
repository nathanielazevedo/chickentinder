import { Box } from '@mui/material'
import iphone from '../../assets/iphone.png'
import TwoStack from '../../components/TwoStack'

const SectionThree = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <img src={iphone} width='200px' />
        <TwoStack
          variant='body'
          title='Where are we eating?'
          body='Stop trying to organize your friends over text. Let Chicken Tinder
          help you quickly and easily decide where to eat.'
        />
      </Box>
    </Box>
  )
}

export default SectionThree

const styles = {
  container: {
    height: { xs: '100%', lg: '50vh' },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: { xs: '70px 0', lg: '0' },
    backgroundColor: 'white',
    border: '12px solid black',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: { xs: 'column-reverse', lg: 'row' },
    width: { xs: '100%', sm: '80%', md: '1100px' },
    gap: { xs: '50px' },
    justifyContent: { xs: 'center', md: 'space-evenly' },
    alignItems: 'center',
  },
}
