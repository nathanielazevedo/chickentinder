import { setRParty } from '../../state'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../../state/redux'
import MainButton from '../../components/MainButton'
import { LocalParty, getPartiesFromLocal } from '../../utils/localStorage'

const MyParties = () => {
  const dispatch = useAppDispatch()
  dispatch(setRParty(undefined))

  return (
    <>
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
    </>
  )
}

export default MyParties
