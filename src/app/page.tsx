'use client'

import Link from "next/link";

export default function Home() {

  return (
    <>
    <h1 className="m-5 text-center text-5xl">Fitracker</h1>

<center>

    <Link className="mx-auto my-6 bg-slate-300 p-2" href={'/dashboard'}>Click here to go to the dashboard</Link>
</center>
    </>
  );
}
