import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ACCOUNT_TYPE, ISLOGIN } from './constants';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function hasPermission() {
  if (typeof window !== 'undefined') {
    const isLogin = window.localStorage.getItem(ISLOGIN);
    const accounttype = window.localStorage.getItem(ACCOUNT_TYPE);
    if (isLogin != null && isLogin == 'true') {
      if (accounttype == 1 || accounttype == '1') {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}
