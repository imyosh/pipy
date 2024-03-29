import {
  updateDoc,
  doc,
  getDoc,
  query,
  limitToLast,
  orderBy,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  writeBatch,
  runTransaction,
} from "firebase/firestore";

import { DbPosition, IdPosition, InvistorHandler, Portfolio } from "@/types";

import { db } from ".";

const batch = writeBatch(db);

export const getUserPortfolio = async (userId: string) => {
  const portfolioRef = doc(db, "users", userId);
  const portfolioData = await getDoc(portfolioRef);
  const portfolio = portfolioData.data();
  // if (!portfolio) throw "document not found"
  return portfolio as Portfolio;
};

export const updateUserPortfolio = async (
  userId: string,
  target: string,
  value: number
) => {
  const portfolioRef = doc(db, "users", userId);
  return updateDoc(portfolioRef, { [target]: value });
};

export const updateUserPortfolioByPosition = async (
  userId: string,
  portfolio: Portfolio
) => {
  const portfolioRef = doc(db, "users", userId);
  return updateDoc(portfolioRef, {
    mine: increment(portfolio.mine),
    invistor1: increment(portfolio.invistor1),
    invistor2: increment(portfolio.invistor2),
  });
};

export const updateUserTargetPortfolioByPosition = async (
  userId: string,
  update: { value: number; handler: InvistorHandler }
) => {
  const portfolioRef = doc(db, "users", userId);
  return updateDoc(portfolioRef, {
    mine: increment(update.value),
    [update.handler]: increment(-update.value),
  });
};

export const getUserPositions = async (userId: string) => {
  const positionsRef = collection(db, "users", userId, "positions");
  const q = query(positionsRef, orderBy("timestamp"));
  const userPositions = await getDocs(q);
  return userPositions.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .reverse() as IdPosition[];
};

export const getUserRecentPositions = async (userId: string) => {
  const positionsRef = collection(db, "users", userId, "positions");
  const q = query(positionsRef, orderBy("timestamp"), limitToLast(1));
  const userPositions = await getDocs(q);
  return userPositions.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .reverse() as IdPosition[];
};

export const addNewPosition = async (userId: string, position: DbPosition) => {
  const positionsRef = collection(db, "users", userId, "positions");
  return addDoc(positionsRef, {
    ...position,
    timestamp: serverTimestamp(),
  });
};

export const deletePosition = async (userId: string, position: IdPosition) => {
  const positionRef = doc(db, "users", userId, "positions", position.id);
  return deleteDoc(positionRef);
};

export const clearPositionsHistory = async (userId: string) => {
  const positionsRef = collection(db, "users", userId, "positions");
  const userPositions = await getDocs(positionsRef);
  userPositions.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

/////////////////////////////////////////////////////

export async function upsertUser(userId: string) {
  const userRef = doc(db, "users", userId);
  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(userRef);
    if (!sfDoc.exists())
      transaction.set(userRef, {
        mine: 0,
        invistor1: 0,
        invistor2: 0,
      });
  });
}
