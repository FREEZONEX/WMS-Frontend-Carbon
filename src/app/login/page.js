'use client';
import React, { useState } from 'react';
import './login.scss';
import { IbmDb2Warehouse, Login } from '@carbon/icons-react';
import { FormGroup, TextInput, Button } from '@carbon/react';
import { ACCOUNT_TYPE, ISLOGIN, USER_NAME } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/actions/actions';

function LoginPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = () => {
    userLogin({ username: userName, password })
      .then((res) => {
        if (res) {
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(ISLOGIN, 'true');
            window.sessionStorage.setItem(ACCOUNT_TYPE, res.accounttype);
            window.sessionStorage.setItem(USER_NAME, res.username);
            router.replace('/home');
          }
        } else {
          setMsg('* Login failed, please check your name or password');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="login">
        <div className=" pb-12 p-4 w-[430px] bg-white rounded-sm shadow-sm">
          <div className="flex flex-row items-center text-3xl">
            <IbmDb2Warehouse size={48} color="blue"></IbmDb2Warehouse>
            <span className="ml-2">Login</span>
          </div>
          <div className="mt-4">
            <FormGroup legendText="">
              <TextInput
                id="userName"
                labelText=""
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextInput
                id="password"
                labelText=""
                className="mt-6"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              />
            </FormGroup>
            <div className="mt-2">
              <span className="text-sm"> {msg}</span>
            </div>
            <div className="mt-6 text-right">
              <Button
                type="submit"
                size="md"
                renderIcon={Login}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
