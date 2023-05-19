import Create from './apps/createParty/Create';
import Entry from './apps/main/Entry';
import Manage from './apps/main/Manage';
import ResultsPage from './apps/main/ResultsPage';
import Swipe from './apps/main/vote/Swipe';
import Intro from './apps/marketing/Intro';
import { createBrowserRouter } from 'react-router-dom';
import MyParties from './apps/myParties/MyParties';
import MyVotes from './apps/main/MyVotes';
import FourOFour from './components/FourOFour';
import Error from './components/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
    errorElement: <Error />,
  },
  {
    path: '/create',
    element: <Create />,
    errorElement: <Error />,
  },
  {
    path: '/party/:id/vote',
    element: <Swipe />,
    errorElement: <Error />,
  },
  {
    path: '/party/:id/myVotes',
    element: <MyVotes />,
    errorElement: <Error />,
  },
  {
    path: '/party/:id/results',
    element: <ResultsPage />,
    errorElement: <Error />,
  },
  {
    path: '/party/:id/manage',
    element: <Manage />,
    errorElement: <Error />,
  },
  {
    path: '/party/:id',
    element: <Entry />,
    errorElement: <Error />,
  },
  {
    path: '/my-parties',
    element: <MyParties />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <FourOFour />,
    errorElement: <Error />,
  },
]);
