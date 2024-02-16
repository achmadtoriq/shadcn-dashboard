"use client";
import React, { useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [newName, setNewName] = useState('')
  const { data: session, status, update } = useSession();
  // console.log('data', session);

  // useEffect(() => {
  //   if (session?.status != "authenticated") {
  //     router.push("/auth/login");
  //   }
  // });

  return (
    <div>
      <p>Hi, {session?.user.name}</p>
      <p>Update Name </p>
      <input type="text" placeholder="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
      <Button onClick={() => update({ name: newName})}>Update</Button>
      <Button onClick={() => signOut().then((callback)=> console.log(callback))}>Logout</Button>
    </div>
  );
};

export default Home;
