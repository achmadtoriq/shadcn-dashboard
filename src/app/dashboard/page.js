"use client";
import React from "react";
import dynamic from 'next/dynamic'
 
const RealtimeDate = dynamic(() => import('@/components/RealtimeDate'), { ssr: false })

const Home = () => {

  return (
    <div>
      <h1>DASHBOARD</h1>
      <RealtimeDate />
    </div>
  );
};

export default Home;
