"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const getSecondREmainingTime = (token: string): number => {
  if (!token) return 0;

  try {
    const tokenPaylod = JWT_ACCESS_SECRET
      ? (jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);

    if (tokenPaylod && !tokenPaylod.exp) {
      return 0;
    }

    const remainingSecond =
      (tokenPaylod.exp as number) - Math.floor(Date.now() / 1000);
    return remainingSecond > 0 ? remainingSecond : 0;
  } catch (err) {
    console.log("Error decoding token", err);
    return 0;
  }
};

export const setTokenInCookies = async (
  name: string,
  token: string,
  fallBackMaxAgeInSecond = 60 * 60 * 24,
) => {
  const maxAgeInSecond = getSecondREmainingTime(token);
  await setCookie(
    name,
    token,
    maxAgeInSecond ? maxAgeInSecond : fallBackMaxAgeInSecond,
  );
};
