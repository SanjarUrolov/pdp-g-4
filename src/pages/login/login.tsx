import { AxiosResponse } from "axios";
import { http } from "../../services";
import React, { FormEventHandler } from "react";

import cls from "./login.module.scss";
import { useNavigate } from "react-router-dom";

interface ISignInResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
}
const Login: React.FC = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const body = {
      email,
      password,
    };

    const { data }: AxiosResponse<ISignInResponse> = await http.post(
      "/auth/sign-in",
      body
    );

    const { data: langData }: AxiosResponse<any> = await http.get(
      "/language/list-for-users"
    );

    navigate(`/${langData.data[0].id}`)
    console.log("langData = ", langData);
  };

  return (
    <div className={cls.wrapper}>
      <h1 className={cls.title}>Login Component</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Your Email'
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Your Password'
            ref={passwordRef}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default Login;
