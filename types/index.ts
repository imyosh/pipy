export type Portfolio = {
  mine: number;
  invistor1: number;
  invistor2: number;
  "invistor1-basebalance"?: number;
  "invistor2-basebalance"?: number;
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

export type InvistorHandler = "mine" | "invistor1" | "invistor2";

export type ValueShareType = {
  title: string;
  value: number;
  handler: InvistorHandler;
  recentInvistorBaseBalance?: number;
  percentage: number;
};
