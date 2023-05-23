import { Box, Typography } from '@mui/material'

type Props = {
  card: {
    title: string
    description: string
  }
  i: number
}

const StepsCard = ({ card, i }: Props) => {
  return (
    <Box
      key={i}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: { xs: '100%', lg: '800px' },
        backgroundColor: 'black',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '0px',
          left: '-20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'black',
          border: '1px solid #0e6b7d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          color: 'white',
        }}
      >
        <Typography variant='h4' color='primary'>
          {Number(i) + 1}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '190px',
          maxHeight: '190px',
          marginTop: '20px',
          backgroundColor: 'black',
          border: '1px solid #0e6b7d',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          {card.title}
        </Typography>
        <Typography color='secondary'>{card.description}</Typography>
      </Box>
    </Box>
  )
}

export default StepsCard
