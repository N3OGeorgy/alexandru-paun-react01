import Head from 'next/head';
import { Films } from '../components/Films';
import { useDispatch, useSelector } from 'react-redux';
import {decrement, increment} from '../store/ui/uiSlice';
import {useState} from 'react';
import {registerUser, loginUser, logoutUser} from '../store/auth/authSlice';
import {getProfile} from '../api/auth';

export default function Home({hello, films}) {
  const [formState, setFormState] = useState({
    name: '',
    password: '',
    email: '',
  });

  const [loginFormState, setLoginFormState] = useState({
    password: '',
    email: '',
  });

  const count = useSelector(({ui}) => {
    return ui.count;
  });

  const { authenticated } = useSelector(({auth}) => {
    return auth;
  });
  const dispatch = useDispatch();

  const onFormFieldChanged = (event) => {
    const field = event.target;
    setFormState({
      ...formState,
      [field.name]: field.value
    })
  };

  const onLoginFormFieldChanged = (event) => {
    const field = event.target;

    setLoginFormState({
      ...loginFormState,
      [field.name.replace('login-', '')]: field.value,
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(registerUser(formState));
  }

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    dispatch(loginUser(loginFormState));
  };

  return (
    <>
      <Head>
        <title>Home2</title>
      </Head>

      <div className="flex flex-col">
        <header className="container mx-auto py-4">
          Hi {hello}
          <div className="mt-4">
            User is {authenticated ? <button type="button" onClick={() => { dispatch(logoutUser())}}>Logout</button> : 'logged out'}
          </div>
        </header>

        <main className="container mx-auto py-4 flex-grow">
          <h2>SSR test</h2>
          <form onSubmit={onSubmit}>
            <input type="text" className="border" onChange={onFormFieldChanged} value={formState.name} name="name" id="name" placeholder="Name"/>
              <br/>
            <input type="email" className="border" onChange={onFormFieldChanged} value={formState.email} name="email" id="email" placeholder="Email"/>
            <br/>
            <input type="password" className="border" onChange={onFormFieldChanged} value={formState.password} name="password" id="password"/>
            <br/>
            <button type="submit" className="bg-purple-500">Register</button>
          </form>

          <form onSubmit={onLoginSubmit}>
            <input
              type="email"
              name="login-email"
              id="login-email"
              placeholder="Email"
              className="border"
              value={loginFormState.email}
              onChange={onLoginFormFieldChanged}
            />
            <br />
            <input
              type="password"
              name="login-password"
              id="login-password"
              placeholder="Password"
              className="border"
              value={loginFormState.password}
              onChange={onLoginFormFieldChanged}
            />
            <br /> <br />
            <button type="submit" className="bg-purple-500">
              Login
            </button>
          </form>

          <Films films={films}></Films>
          <div>{count}</div>
          <div className="mt-16">
            <button onClick={() => {dispatch(increment()); }}>Up</button>
            <button onClick={() => {dispatch(decrement()); }}>Down</button>
          </div>
        </main>

        <footer className="container mx-auto py-4">z</footer>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const response = await fetch('http://swapi.dev/api/films');
  const data = await response.json();
  const token = context.req.headers.cookie.split('=')[1];
  console.log(token);

  const user = await getProfile(token);

  return {
    props: {
      hello: 'world',
      films: data.results,
      initialReduxState: {
        auth: {
          user: user || {},
          authenticated: !!user,
        },
        ui: {
          count: 42
        }
      }
    }
  }
}
