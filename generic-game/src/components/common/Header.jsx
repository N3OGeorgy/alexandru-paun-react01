import { Link, NavLink } from 'react-router-dom';
import { SiLetterboxd } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import Button from '../ui/Button';
import {requestSignIn, requestSignOut} from '../../actions/creators/auth';
import { FaUserAlt } from 'react-icons/fa';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useAuth } from './../../hooks';
import { useUi } from './../../hooks';
import { NetworkAlert } from '../ui';

export const Header = () => {
  const dispatch = useDispatch();
  const { user, authenticated, established } = useAuth();
  const { networkErrorMessage} = useUi();

  const renderUserControls = () => {
    if(!established) {
      return <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo>
    }

    if(authenticated) {
      return <>
        <NavLink to="/profile" title={`Hello ${user.lastName}, go to profile.`}>
          <Button element="span" className="inline-flex h-full items-center">
            <FaUserAlt></FaUserAlt>
          </Button>
        </NavLink>

        <Button skin="primaryInverted" type="button" title="log out" className="ml-2" onClick={() => {
          dispatch(requestSignOut());
        }}>Log Out</Button>
      </>;
    } else {
      return <Button type="button" title="login" onClick={() => {
        dispatch(requestSignIn());
      }}>Log in</Button>;
    }
  };

  const renderNetworkAlert = () => {
    if(networkErrorMessage.length > 0){
      return <>
        <NetworkAlert bodyMessage={networkErrorMessage}></NetworkAlert>
        <Button type="button" title="reload" className="w-full bg-red-500 text-white active:bg-gray-900 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => { window.location.reload()
      }}>Reload Page</Button>
      </>;
    }
  }

  return <header className="shadow p-4">
    {renderNetworkAlert()}
    <div className="container mx-auto flex justify-between items-center">
      <header>
        <h1 className="uppercase text-lg font-bold">
          <Link to="/" title="Home" className="flex items-center">
            <SiLetterboxd className="mr-2"></SiLetterboxd>
            Word Game
          </Link>
        </h1>
      </header>

      <div>{renderUserControls()}</div>
    </div>
  </header>;
}

export default Header;
