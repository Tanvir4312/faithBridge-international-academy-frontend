"use client";

import { getNotices } from "@/app/(commonLayout)/notices/_action";
import { useQuery } from "@tanstack/react-query";

import React from "react";

const NoticesList = () => {
  const { data  } = useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });
  console.log(data?.data);
  if (!data?.data) {
    return;
  }
  return (
    <div>
      NoticesList
      {/* { data?.data.map((s, idx) => (
        <div key={idx}>
          <p>{s.title}</p>
        </div>
      ))} */}
    </div>
  );
};

export default NoticesList;
