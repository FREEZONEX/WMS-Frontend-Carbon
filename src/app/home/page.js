'use client';
import React from 'react';
import { Heading, Link } from '@carbon/react';
import { useRouter } from 'next/navigation';
import UnityWebGL from '@/components/WebGL/UnitiyWebGL';

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push('/warehouse');
  // }, [router]);
  return (
    <>
      <Heading className="mb-5">Welcome to WMS</Heading>
      <Link
        onClick={() => {
          router.push(`${process.env.PATH_PREFIX}/warehouse`);
        }}
      >
        Getting Started
      </Link>
      <div className="mt-5 flex items-center justify-center h-auto">
        <UnityWebGL />
      </div>
    </>
  );
}
