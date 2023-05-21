import * as React from 'react'
import { Box, Divider } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

export default function Faq() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <>
      <Divider />
      <Box sx={styles.outerContainer}>
        <Box sx={styles.innerContainer}>
          <Typography
            variant='h4'
            sx={{
              marginBottom: '30px',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <div
            style={{
              width: '100%',
            }}
          >
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              sx={{
                backgroundColor: '#000000 !important',
                border: '1px solid #0e6b7d',
                backgroundImage: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography sx={{ flexShrink: 0 }}>
                  How much does it cost?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>It's totally free!</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              sx={{
                backgroundColor: 'black',
                border: '1px solid #0e6b7d',
                backgroundImage: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel2bh-content'
                id='panel2bh-header'
              >
                <Typography sx={{ flexShrink: 0 }}>
                  How many people can use it?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>As many as you want!</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
              sx={{
                backgroundColor: 'black',
                border: '1px solid #0e6b7d',
                backgroundImage: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel3bh-content'
                id='panel3bh-header'
              >
                <Typography sx={{ flexShrink: 0 }}>
                  How long does the link last?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You set a time limit. We'll end the voting when the time is up
                  or when everyone has voted. The creator can also end the
                  voting whenever they want.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
              sx={{
                backgroundColor: 'black',
                border: '1px solid #0e6b7d',
                backgroundImage: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel4bh-content'
                id='panel4bh-header'
              >
                <Typography sx={{ flexShrink: 0 }}>
                  What happens in a tie?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Chicken Tinder will randomly select one of the tied options.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: { xs: '100px 0', lg: '100px' },
    backgroundColor: 'black',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: { xs: '95%', sm: '90%', lg: '1100px' },
    justifyContent: { xs: 'center', sm: 'space-between' },
  },
}
