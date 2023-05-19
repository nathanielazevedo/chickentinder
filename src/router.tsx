import Create from './apps/createParty/Create';
import Entry from './apps/main/Entry';
import Manage from './apps/main/Manage';
import ResultsPage from './apps/main/ResultsPage';
import Swipe from './apps/main/Swipe';
import Intro from './apps/marketing/Intro';
import { createBrowserRouter } from 'react-router-dom';
import MyParties from './apps/myParties/MyParties';
import MyVotes from './apps/main/MyVotes';
import FourOFour from './components/FourOFour';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Intro />
        </>
      ),
    },
    {
      path: '/create',
      element: <Create />,
    },
    {
      path: '/party/:id/vote',
      element: <Swipe />,
    },
    {
      path: '/party/:id/myVotes',
      element: <MyVotes />,
    },
    {
      path: '/party/:id/results',
      element: <ResultsPage />,
    },
    {
      path: '/party/:id/manage',
      element: <Manage />,
    },
    {
      path: '/party/:id',
      element: <Entry />,
    },
    {
      path: '/my-parties',
      element: <MyParties />,
    },
    {
      path: '*',
      element: <FourOFour />,
    },
  ],
  {
    basename: '/chickentinder',
  }
);
