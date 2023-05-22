import Entry from './apps/main/Entry'
import Terms from './components/Terms'
import Error from './components/Error'
import Manage from './apps/main/Manage'
import Results from './apps/main/Results'
import MyVotes from './apps/main/MyVotes'
import Intro from './apps/marketing/Intro'
import Contact from './components/Contact'
import Swipe from './apps/main/vote/Swipe'
import Container from './components/Container'
import FourOFour from './components/FourOFour'
import Create from './apps/createParty/Create'
import Disclaimer from './components/Disclaimer'
import MyParties from './apps/myParties/MyParties'
import PrivacyPolicy from './components/PrivacyPolicy'
import { createBrowserRouter } from 'react-router-dom'
import About from './apps/marketing/About'

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
