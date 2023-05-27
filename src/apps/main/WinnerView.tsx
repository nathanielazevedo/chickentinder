import { Typography } from '@mui/material'
import RCard from '../../components/RCard'
import SlideIn from '../../components/SlideIn'
import { Party } from '../../models/Party'
import BackIcon from '../../components/backIcons/BackIconTo'

type Props = {
  party: Party
  id: string
}

const WinnerView = ({ party, id }: Props) => {
  if (!party.r_winner) return null
  return (
    <>
      <BackIcon to={'/party/' + id} />
      <SlideIn>
        <Typography variant='h4' color='secondary'>
          Winner
        </Typography>
        {party.h_winner && (
          <Typography color='secondary'>
            {party.r_winner.name} at {party.h_winner} on {party.d_winner}
          </Typography>
        )}
        <RCard restaurant={party.r_winner} swipe={{ id: '', direction: '' }} />
      </SlideIn>
    </>
  )
}

export default WinnerView
