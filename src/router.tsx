import Entry from './apps/main/entry/Entry'
import Terms from './apps/legal/Terms'
import Create from './apps/create/Main'
import Manage from './apps/main/Manage'
import Results from './apps/main/Results'
import MyVotes from './apps/main/MyVotes'
import Intro from './apps/marketing/Intro'
import Contact from './apps/legal/Contact'
import Swipe from './apps/main/vote/Swipe'
import About from './apps/marketing/About'
import Container from './components/Container'
import Disclaimer from './apps/legal/Disclaimer'
import Error from './components/failStates/Error'
import MyParties from './apps/myParties/MyParties'
import PrivacyPolicy from './apps/legal/PrivacyPolicy'
import { createBrowserRouter } from 'react-router-dom'
import FourOFour from './components/failStates/FourOFour'

export const routes = [
  {
    path: '/',
    element: <Intro />,
    errorElement: <Error />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    errorElement: <Error />,
  },
  {
    path: '/terms',
    element: <Terms />,
    errorElement: <Error />,
  },
  {
    path: '/disclaimer',
    element: <Disclaimer />,
    errorElement: <Error />,
  },
  {
    path: '/party',
    element: <Container />,
    errorElement: <Error />,
    children: [
      { path: 'about', element: <About />, errorElement: <Error /> },
      { path: 'contact', element: <Contact />, errorElement: <Error /> },
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
