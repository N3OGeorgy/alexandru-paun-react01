import { useReducer } from 'react';
import Logo from './components/Logo';
import FooterNav from './components/FooterNav';
import Screen from './components/Screen';
import { AppContext, appState, appStateReducer } from './contexts/AppContext';
import Search from './legacy/Search';

const App = () => {
  const [state, dispatch] = useReducer(appStateReducer, appState);
  const contextValue = {
    state: state,
    dispatch: dispatch,
  };

  const { currentScreen } = state;

  return (
    <AppContext.Provider value={contextValue}>
      <header className="navbar-dark fixed-top bg-dark border-bottom border-warning">
        <nav className="container d-flex justify-content-between">
          <h1 className="display-6 text-warning"><Logo></Logo></h1>

          <Search className="d-inline-flex align-self-center"></Search>
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

      <footer className="container mb-4"><FooterNav></FooterNav></footer>
    </AppContext.Provider>
  );
};

export default App;
