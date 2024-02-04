"use server";

import {
  IdPosition,
  InvistorHandler,
  Portfolio,
  Position,
  ValueShareType,
} from "@/types";
import {
  addNewPosition,
  clearPositionsHistory,
  deletePosition,
  getUserPortfolio,
  getUserPositions,
  getUserRecentPositions,
  updateUserPortfolio,
  updateUserPortfolioByPosition,
  updateUserTargetPortfolioByPosition,
} from "../firebase/db";

import { revalidatePath } from "next/cache";
import { getUserSession } from "../session";

export async function apiGetUserPortfolio() {
  const session = await getUserSession();
  return (await getUserPortfolio(session.id)) as Portfolio;
}

export async function apiUpdateUserPortfolio(target: string, value: number) {
  const session = await getUserSession();
  await updateUserPortfolio(session.id, target, value);
  revalidatePath("/");
}

export async function apiGetUserPositions() {
  const session = await getUserSession();
  return getUserPositions(session.id);
}

export async function apiGetUserRecentPositions() {
  const session = await getUserSession();
  return getUserRecentPositions(session.id);
}

export async function apiAddNewPosition(position: Position) {
  const session = await getUserSession();

  // const interest = 0.2;
  const portfolio = await getUserPortfolio(session.id);

  if (!portfolio) return;

  const total = portfolio.mine + portfolio.invistor1 + portfolio.invistor2;

  const myPercent = portfolio.mine / total;
  const invistor1Percent = portfolio.invistor1 / total;
  const invistor2Percent = portfolio.invistor2 / total;

  let myValue = myPercent * position.value;
  let invistor1Value = invistor1Percent * position.value;
  let invistor2Value = invistor2Percent * position.value;

  // if (position.value > 0) {
  //   const interestValue = interest * invistorValue;

  //   myValue = myValue + interestValue;
  //   invistorValue = invistorValue - interestValue;
  // }

  await updateUserPortfolioByPosition(session.id, {
    mine: myValue,
    invistor1: invistor1Value,
    invistor2: invistor2Value,
  });
  await addNewPosition(session.id, {
    ...position,
    shares: {
      myValue,
      invistor1Value,
      invistor2Value,
    },
  });
  revalidatePath("/");
}

export async function apiDeletePosition(position: IdPosition) {
  const session = await getUserSession();

  await updateUserPortfolioByPosition(session.id, {
    mine: -position.shares.myValue,
    invistor1: -position.shares.invistor1Value,
    invistor2: -position.shares.invistor2Value,
  });

  await deletePosition(session.id, position);
  revalidatePath("/");
}

export async function apiClearPositionsHistory() {
  const session = await getUserSession();
  await clearPositionsHistory(session.id);
  revalidatePath("/");
}

export async function apiTransferPercentage(
  baseBalance: number,
  handler: InvistorHandler,
  percentage: number
) {
  const session = await getUserSession();
  const portfolio = await getUserPortfolio(session.id);

  const transferable1 = (portfolio[handler] - baseBalance) * percentage;

  await updateUserTargetPortfolioByPosition(session.id, {
    value: transferable1,
    handler,
  });

  const updatedPortfolio = await getUserPortfolio(session.id);

  await updateUserPortfolio(
    session.id,
    `${handler}-basebalance`,
    updatedPortfolio[handler]
  );

  revalidatePath("/");
}

export async function apiResetInvistorBalance(handler: string) {
  const session = await getUserSession();

  const updatedPortfolio = await getUserPortfolio(session.id);

  await updateUserPortfolio(
    session.id,
    `${handler}-basebalance`,
    updatedPortfolio.invistor1
  );

  revalidatePath("/");
}
