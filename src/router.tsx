import Entry from './apps/main/Entry'
import Error from './components/Error'
import Manage from './apps/main/Manage'
import Results from './apps/main/Results'
import MyVotes from './apps/main/MyVotes'
import Intro from './apps/marketing/Intro'
import Swipe from './apps/main/vote/Swipe'
import Container from './components/Container'
import FourOFour from './components/FourOFour'
import Create from './apps/createParty/Create'
import MyParties from './apps/myParties/MyParties'
import { createBrowserRouter } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    element: <Intro />,
    errorElement: <Error />,
  },
  {
    path: '/party',
    element: <Container />,
    errorElement: <Error />,
    children: [
      {
        path: 'create',
        element: <Create />,
        errorElement: <Error />,
      },
      {
        path: ':id',
        element: <Entry />,
        errorElement: <Error />,
      },
      {
        path: ':id/vote',
        element: <Swipe />,
        errorElement: <Error />,
      },
      {
        path: ':id/myVotes',
        element: <MyVotes />,
        errorElement: <Error />,
      },
      {
        path: ':id/results',
        element: <Results />,
        errorElement: <Error />,
      },
      {
        path: ':id/manage',
        element: <Manage />,
        errorElement: <Error />,
      },
      {
        path: 'my-parties',
        element: <MyParties />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '*',
    element: <FourOFour />,
    errorElement: <Error />,
  },
]

export const router = createBrowserRouter(routes)
