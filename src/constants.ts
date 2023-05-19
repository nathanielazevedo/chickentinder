import { chick, chicken, drum } from './assets';

export const constants = {
  marketingGraph: [
    {
      name: '5/10',
      main_ranch: 4,
    },
    {
      name: '5/17',
      main_ranch: 6,
    },
    {
      name: '5/24',
      main_ranch: 4,
    },
    {
      name: '5/31',
      main_ranch: 5,
    },
    {
      name: '6/7',
      main_ranch: 7,
    },
    {
      name: '6/14',
      main_ranch: 5,
    },
    {
      name: '6/21',
      main_ranch: 6,
    },
  ],
  marketingCards: [
    {
      title: 'Create',
      description:
        "Choose a location and max distance. We'll generate a link for you to share with your friends.",
      icon: chick,
    },
    {
      title: 'Vote',
      description:
        "You and your friends can vote on the restaurant you want to go to. We'll tally up the votes and show you the winner.",
      icon: chicken,
    },
    {
      title: 'Done',
      description:
        'The decision is made! The generated link will remain active so party voters can see the results.',
      icon: drum,
    },
  ],
};
