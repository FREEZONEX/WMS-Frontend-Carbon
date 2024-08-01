'use client';
import { redirect } from 'next/navigation';
import { ISLOGIN } from '@/utils/constants';

export default function Home() {
  if (typeof window !== 'undefined') {
    const isLogin = window.localStorage.getItem(ISLOGIN);
    if (isLogin && isLogin.toString() == 'false') {
      redirect('/login');
    } else {
      redirect('/home');
    }
  }
  redirect('/home');
}
