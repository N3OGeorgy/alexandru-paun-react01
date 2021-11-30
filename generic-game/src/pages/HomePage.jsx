import {useAuth, useStats} from "../hooks";
import { useDispatch } from 'react-redux';
import {requestSignIn} from '../actions/creators/auth';
import { CgSpinnerTwo } from 'react-icons/cg';
import {UserStats} from "../components/profile";
import Button from "../components/ui/Button";
import {Link} from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const stats = useStats();
  const { authenticated, established } = useAuth();

  return <div className="p-4 container mx-auto">
    <h1>Welcome!</h1>
    {
      !established ? <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo> : authenticated ?
      <>
        <UserStats {...stats} className = 'mt-8' entryClassName="p-5"></UserStats>
        <div className="mt-2 text-center">
          <Link to="/play">
            <Button title="Play now" type="button">Play</Button>
          </Link>
        </div>
      </>
      : (<div className="text-center">
      <button className="w-75 md:max-w-xl w-3/4 py-20 border rounded-md shadow hover:bg-gray-100" type="buton" onClick={() => {
        dispatch(requestSignIn());
      }}>Login to get started</button>
    </div>)
    }

  </div>;
}

export default HomePage;
