import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

// To Test
import App from '../App'

// Tests
describe('Renders main page', async () => {
  it('Should render App Component', async () => {
    // Setup & Exepctations
    render(<App />)
  })
})
