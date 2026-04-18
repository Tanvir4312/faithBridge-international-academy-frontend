
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/authService";
import React from "react";

const CommonHomePage = async () => {
  const userInfo = await getUserInfo();
  console.log(userInfo)
  return (
    <div>
      <Button variant={"outline"}>Hello</Button>

    </div>
  );
};

export default CommonHomePage;
