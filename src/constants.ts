import { web, mobile, creator } from "./assets";

export const constants = {
  marketingGraph: [
    {
      name: "5/10",
      main_ranch: 4,
    },
    {
      name: "5/17",
      main_ranch: 6,
    },
    {
      name: "5/24",
      main_ranch: 4,
    },
    {
      name: "5/31",
      main_ranch: 5,
    },
    {
      name: "6/7",
      main_ranch: 7,
    },
    {
      name: "6/14",
      main_ranch: 5,
    },
    {
      name: "6/21",
      main_ranch: 6,
    },
  ],
  marketingCards: [
    {
      title: "Create Party",
      description:
        "Choose a location and max distance. We'll generate a link for you to share with your friends.",
      icon: web,
    },
    {
      title: "Vote",
      description:
        "You and your friends can vote on the location you want to go to. We'll show you all the matches and make a decision for you.",
      icon: mobile,
    },
    {
      title: "Done",
      description:
        "The decision is made. We'll show you the location and directions to get there. Have fun!",
      icon: creator,
    },
  ],
};
