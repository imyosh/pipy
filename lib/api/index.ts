"use server";

import { Portfolio, Position } from "@/types";
import {
  addNewPosition,
  clearPositionsHistory,
  getUserPortfolio,
  getUserPositions,
  getUserRecentPositions,
  updateUserPortfolio,
  updateUserPortfolioByPosition,
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

  const interest = 0.2;
  const portfolio = await getUserPortfolio(session.id);

  if (!portfolio) return;

  const total = portfolio.mine + portfolio.invistor;

  const myPercent = portfolio.mine / total;
  const invistorPercent = portfolio.invistor / total;

  let myValue = myPercent * position.value;
  let invistorValue = invistorPercent * position.value;

  if (position.value > 0) {
    const interestValue = interest * invistorValue;

    myValue = myValue + interestValue;
    invistorValue = invistorValue - interestValue;
  }

  await updateUserPortfolioByPosition(session.id, {
    mine: myValue,
    invistor: invistorValue,
  });
  await addNewPosition(session.id, position);
  revalidatePath("/");
}

export async function apiClearPositionsHistory() {
  const session = await getUserSession();
  await clearPositionsHistory(session.id);
  revalidatePath("/");
}