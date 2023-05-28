import { rest } from 'msw'
import { store } from '../store'
import Entry from '../apps/main/entry/Entry'
import { Provider } from 'react-redux'
import { setupServer } from 'msw/node'
import { party } from '../mockData/mockP'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

export const restHandlers = [
  rest.get('http://localhost:6001/party/123', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(party))
  }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

// Tests
describe('Renders Entry page', async () => {
  it('Should render Entry page', async () => {
    // mock react-router-dom useParams hook
    vi.mock('react-router-dom', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mod = (await vi.importActual('react-router-dom')) as any
      return {
        ...mod,
        useParams: () => ({
          id: 123,
        }),
      }
    })

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Entry />
        </BrowserRouter>
      </Provider>
    )
    const val = waitFor(() => screen.getByText('Your Parties'))
    expect(val).toBeTruthy()
  })
})
