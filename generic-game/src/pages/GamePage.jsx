import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {patchGameWon, patchGameLost} from "../actions/creators/profile";
import {Authorize} from "../components/auth/Authorize";
import {Creature} from "../components/profile";
import {Button} from "../components/ui";
import { gameEnded, gameStarted } from "./../actions/creators/game";

export const GamePage = () => {
  const dispatch = useDispatch();
  const { playing } = useSelector(({game}) => {
    return game;
  });

  useEffect(() => {
    // console.log('dispatch changed');
    return () => {
      // console.log('game ended');
        dispatch(gameEnded());
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      // console.log(playing);
    }
  }, [playing]);

  return <div className="p-4 container flex mx-auto">
    <Authorize roles={['admin', 'super-admin']} userIds={[1000, 2000]}>
    <div className="w-full md:w-8/12 flex mb-2 items-center justify-around">
      {
        playing ? <>
          <Button title="Win game" type="button" className="mt-1" onClick={() => {
            dispatch(patchGameWon());
            dispatch(gameEnded());
          }}>Win Game</Button>
          <Button title="Lose game" type="button" className="mt-1" skin="dangerInverted" onClick={() => {dispatch(gameEnded());}}>Lose Game</Button>
          <Button title="Quit game" type="button" className="mt-1" skin="danger" onClick={() => {dispatch(gameEnded())}}>Quit Game</Button>
        </> : <Button title="Start Game" type="button" onClick={() => {
          dispatch(patchGameLost());
          dispatch(gameStarted());
        }}>Start Game</Button>
      }
    </div>
    <div className="w-full md:w-4/12 flex flex-col items-center justify-center">
      <Creature></Creature>
    </div>
    </Authorize>
  </div>;
};

export default GamePage;
