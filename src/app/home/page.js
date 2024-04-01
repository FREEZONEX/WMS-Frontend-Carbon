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
      <div className="mt-10 flex items-center justify-center">
        <iframe
          title="tuto_sketchup_warehouse"
          width="1800"
          height="1120.5"
          src="https://app.powerbi.com/reportEmbed?reportId=40841fb9-520d-4003-91ef-71c3ffddadef&autoAuth=true&ctid=aa4e5835-e7b7-4474-ae15-d7904960d664"
          frameborder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </>
  );
}
