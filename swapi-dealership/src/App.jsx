import { useReducer } from 'react';
import Screen from './components/Screen';
import { AppContest, appState, appStateReducer } from './contexts/AppContext';
import Search from './legacy/Search';

const App = () => {
  const [state, dispatch] = useReducer(appStateReducer, appState);
  const contextValue = {
    state: state,
    dispatch: dispatch,
  };

  const { currentScreen } = state;

  return (
    <AppContest.Provider value={contextValue}>
      <header className="navbar-dark fixed-top bg-dark border-bottom border-warning">
        <nav className="container d-flex justify-content-between">
          <h1 className="display-6 text-warning">Swapi Vehicles</h1>

          <Search></Search>
        </nav>
      </header>

      <main className="container mt-7 mb-4">
        {/* <button
          onClick={() => {
            dispatch({ type: 'setScreen', payload: 'productPage' });
          }}
        >
          ToProductPage
        </button> */}
        <Screen screen={currentScreen}></Screen>
      </main>

      <footer className="container mb-4">FOoter</footer>
    </AppContest.Provider>
  );
};

export default App;
