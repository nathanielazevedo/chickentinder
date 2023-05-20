import { chick, chicken, drum } from './assets';

export const constants = {
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
