import {useDispatch, useSelector} from "react-redux";
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import {clickClicker, decrementClicker} from "./actions/creators/ui";
import {initializeGoogleAuth} from "./api/googleAuth";
import {Footer, Header} from "./components/common";
import {HomePage, NotFoundPage, ProfilePage, RankPage, PlayPage} from "./pages";

// async
initializeGoogleAuth();

export const App = () => {
  const clicker = useSelector((state) => {
    const { ui } = state;
    return ui.clicker;
  })

  const dispatch = useDispatch();

  return (
      <BrowserRouter>
      <Header></Header>
      <main className="flex-grow">
        {/* <div>value is : {clicker}</div>
        <button onClick={() => {
          dispatch(decrementClicker(12))

        }} title="meh">Decrement</button>
        <button onClick={() => {
          dispatch(clickClicker(12))

        }} title="meh">Test</button> */}

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
