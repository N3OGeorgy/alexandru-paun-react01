import {useAuth} from "../hooks";
import { useDispatch } from 'react-redux';
import {requestSignIn} from '../actions/creators/auth';
import { CgSpinnerTwo } from 'react-icons/cg';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { authenticated, established } = useAuth();

  return <div className="p-4 container mx-auto">
    {
      !established ? <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo> : authenticated ? 'logged in' : (<div className="text-center">
      <button className="w-75 md:max-w-xl w-3/4 py-20 border rounded-md shadow hover:bg-gray-100" type="buton" onClick={() => {
        dispatch(requestSignIn());
      }}>Login to get started</button>
    </div>)
    }

  </div>;
}

export default HomePage;
