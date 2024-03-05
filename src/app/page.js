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
      <div className="mt-10 flex items-center justify-center">
        <iframe
          title="warehouse"
          width="1800"
          height="1120.5"
          src="https://app.powerbi.com/view?r=eyJrIjoiMzM1MjM5MmUtODY2OC00MzZiLWIyZDQtOTdiYmEwMzdlNTQwIiwidCI6ImFhNGU1ODM1LWU3YjctNDQ3NC1hZTE1LWQ3OTA0OTYwZDY2NCIsImMiOjEwfQ%3D%3D"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </>
  );
}
