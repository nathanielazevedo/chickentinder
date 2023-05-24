import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// To Test
import NavBar from '../apps/marketing/Navbar'
import { BrowserRouter } from 'react-router-dom'

// Tests
describe('Renders Navbar', async () => {
  it('Should render Navbar', async () => {
    // Setup & Expectations
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )
    expect(screen.getByText('CHICKEN TINDER')).toBeTruthy()
  })
})
