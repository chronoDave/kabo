export type Card = {
  id: string;
  title: string;
};

export type Lane = {
  id: string;
  title: string;
  cards: string[];
};

export type Board = {
  id: string;
  title: string;
  lanes: string[];
};