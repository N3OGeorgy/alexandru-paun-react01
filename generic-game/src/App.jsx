import {Switch, BrowserRouter, Route} from 'react-router-dom';
import {initializeGoogleAuth} from "./api/googleAuth";
import {Footer, Header} from "./components/common";
import {HomePage, NotFoundPage, ProfilePage, RankPage, PlayPage} from "./pages";

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
          <Route exact path="/ranks" component={RankPage}></Route>
          <Route exact path="/play" component={PlayPage}></Route>
          <Route component={NotFoundPage}></Route>
        </Switch>
      </main>
      <Footer></Footer>
      </BrowserRouter>
  );
}

export default App;
