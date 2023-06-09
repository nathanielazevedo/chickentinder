import { setRParty } from '../../state'
import { Link } from 'react-router-dom'
import SlideIn from '../../components/SlideIn'
import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../../state/redux'
import MainButton from '../../components/MainButton'
import BackIcon from '../../components/backIcons/BackIconTo'
import { LocalParty, getPartiesFromLocal } from '../../utils/localStorage'

const MyParties = () => {
  const dispatch = useAppDispatch()
  dispatch(setRParty(undefined))

  return (
    <>
      <BackIcon to='/' />
      <SlideIn>
        <Typography variant='h4' mb='15px'>
          Your Parties
        </Typography>
        <Box display='flex' flexDirection='column' gap='10px'>
          {getPartiesFromLocal()?.map((party: LocalParty) => (
            <Link
              key={party._id}
              to={`/party/` + party._id}
              style={{ height: '50px' }}
            >
              <MainButton text={party.name} />
            </Link>
          ))}
        </Box>
      </SlideIn>
    </>
  )
}

export default MyParties
