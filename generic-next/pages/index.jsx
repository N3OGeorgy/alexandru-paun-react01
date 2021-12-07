import Head from 'next/head';
import { Films } from '../components/Films';

export default function Home({hello, films}) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex flex-col">
        <header className="container mx-auto py-4">Hi {hello}</header>
        <main className="container mx-auto py-4 flex-grow">
          <h2>SSR test</h2>
          <Films films={films}></Films>
        </main>
        <footer className="container mx-auto py-4">z</footer>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch ('http://swapi.dev/api/films');
  const data = await response.json();

  console.log(data);

  return {
    props: {
      hello: 'world',
      films: data.results,
    }
  }
}
