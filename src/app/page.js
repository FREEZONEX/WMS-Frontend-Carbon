'use client';
import React, { useEffect } from 'react';
import { Button, Heading, Link } from '@carbon/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push('/warehouse');
  // }, [router]);
  return (
    <>
      <Heading className="mb-5">Welcome to WMS</Heading>
      <Link href="/warehouse">Getting Started</Link>
    </>
  );
}
