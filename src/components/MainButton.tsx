import { Button } from '@mui/material'
import playSound from '../utils/playSound'

type Props = {
  text: string
  onClick?: () => void
  disabled?: boolean
}

const MainButton = ({ text, onClick, disabled = false }: Props) => {
  return (
    <Button
      fullWidth
      onClick={() => {
        onClick && onClick()
        playSound('good')
      }}
      variant='outlined'
      disabled={disabled}
      sx={{ height: '100%' }}
    >
      {text}
    </Button>
  )
}

export default MainButton
