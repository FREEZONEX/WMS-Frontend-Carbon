'use client';
import React from 'react';
import { Heading, Link } from '@carbon/react';
import { useRouter } from 'next/navigation';

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
      <div className="mt-[-100px] flex items-center justify-center">
        <iframe
          title="webgl"
          width="1800"
          height="1120.5"
          src="/MQTWebGl/index.html"
          frameborder="0"
        ></iframe>
      </div>
    </>
  );
}
