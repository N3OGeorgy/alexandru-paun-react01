import {Switch, BrowserRouter, Route} from 'react-router-dom';
import {initializeGoogleAuth} from "./api/googleAuth";
import {Footer, Header} from "./components/common";
import {HomePage, NotFoundPage, ProfilePage, RankPage, RanksPage, GamePage} from "./pages";

// async
initializeGoogleAuth();

export const App = () => {

  return (
      <BrowserRouter>
        <Header></Header>
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/profile" component={ProfilePage}></Route>
            <Route exact path="/ranks" component={RanksPage}></Route>
            <Route exact path="/ranks/:id" component={RankPage}></Route>
            <Route exact path="/play" component={GamePage}></Route>
            <Route component={NotFoundPage}></Route>
          </Switch>
        </main>
        <Footer></Footer>
      </BrowserRouter>
  );
}

export default App;
