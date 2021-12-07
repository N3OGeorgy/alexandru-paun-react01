import Head from 'next/head';
import { Films } from '../components/Films';
import { useDispatch, useSelector } from 'react-redux';
import {decrement, increment} from '../store/ui/uiSlice';

export default function Home({hello, films}) {
  const count = useSelector(({ui}) => {
    return ui.count;
  });

  const { authenticated } = useSelector(({auth}) => {
    return auth;
  });
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex flex-col">
        <header className="container mx-auto py-4">
          Hi {hello}
          <div className="mt-4">
            User is {authenticated ? 'logged in' : 'logged out'}
          </div>
        </header>

        <main className="container mx-auto py-4 flex-grow">
          <h2>SSR test</h2>
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

export const getServerSideProps = async () => {
  const response = await fetch('http://swapi.dev/api/films');
  const data = await response.json();

  return {
    props: {
      hello: 'world',
      films: data.results,
      initialReduxState: {
        ui: {
          count: 42
        }
      }
    }
  }
}
