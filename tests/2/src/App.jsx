import {useEffect, useState} from "react";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [aIsReady, setAisReady] = useState(true);
  const [bIsReady, setBisReady] = useState(false);

  useEffect(() => {
    if(aIsReady){
      setAisReady(false);
    }

    if(bIsReady){
      setBisReady(false);
    }
  }, [aIsReady, bIsReady]);

  useEffect(() => {
    if(startGame){
      if(!aIsReady){
        setAisReady(true);
      }

      if(!bIsReady){
        setBisReady(true);
      }
    }
  }, [startGame, aIsReady, bIsReady]);

  return <div className="App">
      <div className="row">
        <button
          type="button"
          className="btn btn-primary btn-block"
          title="start" onClick={() => {
            setStartGame(true);
          }}
        >
          Start
        </button>
      </div>

      <div className="row">
        <div className="col-6">
          <div className={`alert alert-${aIsReady === true ? 'success' : 'danger'}`} role="alert">
            A
          </div>
        </div>
        <div className="col-6">
          <div className={`alert alert-${bIsReady === true ? 'success' : 'danger'}`} role="alert">
            B
          </div>
        </div>
      </div>
    </div>;
}

export default App;
