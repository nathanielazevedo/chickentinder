import Button from '../apps/marketing/Button'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

type Props = {
  title: string
  body: string
  variant: string
  noButton?: boolean
}

const TwoStack = ({ title, body, variant, noButton }: Props) => {
  if (variant === 'hero') {
    return (
      <Box>
        <Typography variant='h2' mb={1.5}>
          {title}
        </Typography>
        <Typography mb={3} variant='h6' color='secondary'>
          {body}
        </Typography>
        <Link to='/party/create'>
          <Button text='Create a Party' />
        </Link>
      </Box>
    )
  } else {
    return (
      <Box>
        <Typography
          mb={1}
          variant='h3'
          fontWeight='bold'
          color={variant == 'dark' ? 'white' : 'white'}
        >
          {title}
        </Typography>
        <Typography color='secondary' mb={2}>
          {body}
        </Typography>
        {!noButton && (
          <Link to='/party/create'>
            <Button text='Create a Party' />
          </Link>
        )}
      </Box>
    )
  }
}

export default TwoStack
