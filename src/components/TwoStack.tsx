import Button from './Button'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

type Props = {
  title: string
  body: string
  variant: string
}

const TwoStack = ({ title, body, variant }: Props) => {
  if (variant === 'hero') {
    return (
      <Box>
        <Typography variant='h1' mb={1.5}>
          {title}
        </Typography>
        <Typography mb={3} variant='h5'>
          {body}
        </Typography>
        <Link to='/party/create'>
          <Button text='Create a Party' />
        </Link>
      </Box>
    )
  } else {
    return (
      <Box sx={{ width: { xs: '90%', md: '50%' } }}>
        <Typography
          mb={1}
          variant='h3'
          fontWeight='bold'
          color={variant == 'dark' ? 'white' : 'black'}
        >
          {title}
        </Typography>
        <Typography color={variant == 'dark' ? 'white' : 'black'} mb={2}>
          {body}
        </Typography>
        <Link to='/party/create'>
          <Button text='Create a Party' />
        </Link>
      </Box>
    )
  }
}

export default TwoStack
