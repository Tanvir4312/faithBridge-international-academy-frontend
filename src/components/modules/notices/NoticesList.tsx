"use client";

import { getNotices } from "@/app/(commonLayout)/notices/_action";
import { useQuery } from "@tanstack/react-query";

import React from "react";

const NoticesList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });

//  if (isLoading) return <div>Loading...</div>;
// if (!data) return <div>No data</div>;

  return (
    <div>
      NoticesList
      { data?.data.map((s: any)  => (
        <div key={s.id}>
          <p>{s.title}</p>
        </div>
      ))}
    </div>
  );
};

export default NoticesList;
