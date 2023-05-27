import { Box, Step, StepLabel, Stepper } from '@mui/material'

type Props = {
  step: number
  steps: { component: () => JSX.Element | null }[]
}

const CStepper = ({ step, steps }: Props) => {
  return (
    <Box sx={{ position: 'absolute', top: '25px', right: '10px' }}>
      <Stepper activeStep={step}>
        {steps.map((_step, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default CStepper
