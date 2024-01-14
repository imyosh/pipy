export type Portfolio = {
  mine: number;
  invistor: number;
};

export type Position = {
  value: number;
  lot: number;
  currencyPair: string;
};

export type DbPosition = Position & {
  shares: { [key: string]: number };
};

export type IdPosition = DbPosition & {
  id: string;
};

export type ValueShareType = {
  title: string;
  value: number;
};
