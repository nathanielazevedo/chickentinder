import { Box, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'

const About = () => {
  return (
    <>
      <Typography variant='h3'>Hey, I'm Nate.</Typography>
      <Typography color='secondary' mt='10px'>
        Chicken Tinder was built by me, Nate, as a side project. I'm a
        full-stack developer with a passion for building beautiful and
        functional web applications. Here's some links to my socials:
      </Typography>
      <Box
        mt='20px'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Box sx={{ height: '50px' }}>
          <a href='https://www.linkedin.com/in/nateazevedo/' target='_black'>
            <MainButton text='LinkedIn' />
          </a>
        </Box>
        <Box sx={{ height: '50px' }}>
          <a href='https://github.com/nathanielazevedo' target='_black'>
            <MainButton text='GitHub' />
          </a>
        </Box>
      </Box>
    </>
  )
}

export default About
