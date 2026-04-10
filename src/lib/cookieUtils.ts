"use server"

import { cookies } from "next/headers";

export const setCookie = async (
  name: string,
  value: string,
  maxAgeInSecond: number,
) => {
  const cookieStor = await cookies();

  cookieStor.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: maxAgeInSecond,
  });
};

export const getCookie = async(name : string) =>{
const cookieStor = await cookies()
return cookieStor.get(name)?.value
}

export const deleteCookie = async(name : string) =>{
    const cookieStor = await cookies()
    cookieStor.delete(name)
}
