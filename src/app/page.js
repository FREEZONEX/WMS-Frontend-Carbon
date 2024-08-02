'use client';
import { redirect } from 'next/navigation';
import { ISLOGIN } from '@/utils/constants';
import { useLayoutEffect } from 'react';

export default function Home() {
  useLayoutEffect(() => {
    const isLogin = window.sessionStorage.getItem(ISLOGIN);
    if (isLogin) {
      if (isLogin.toString() == 'true') {
        redirect('/home');
      }
      redirect('/login');
    }
    redirect('/login');
  });
}
