import { Box, Typography, Card } from '@mui/material';
import { globalStyles } from '../../styles';

const StepsCard = ({ card, i }: any) => {
  return (
    <Box
      key={i}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: { xs: '100%', lg: '800px' },
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-5px',
          left: '-20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'green',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          color: 'white',
          backgroundImage: globalStyles.gradientBg,
        }}
      >
        <Typography variant='h4'>{Number(i) + 1}</Typography>
      </div>
      <Card
        sx={{
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '290px',
          maxHeight: '290px',
          marginTop: '20px',
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
        <Typography>{card.description}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '150px',
          }}
        >
          <img src={card.icon} width='80px' />
        </Box>
      </Card>
    </Box>
  );
};

export default StepsCard;
