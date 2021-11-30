import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import { ProfileForm, Creature } from "../components/profile";
import {useAuth} from "../hooks";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import Button from "../components/ui/Button";
import {useDispatch} from "react-redux";
import {requestDeleteUserStats, requestDeleteUserProfile} from "../actions/creators/auth";
import { CgSpinnerTwo } from 'react-icons/cg';

export const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, authenticated, established } = useAuth();

  const forgetMyData = () => {
    dispatch(requestDeleteUserStats(user));
  }

  const deleteMyProfile = () => {
    dispatch(requestDeleteUserProfile(user));
  }

  useEffect(() => {
    if(!authenticated && established) {
      history.push('/');
    }
  }, [authenticated, history, established]);

  return <>{
        established && authenticated ? (
        <div className="container mx-auto p-4">
          <header>
            <h1>Profile</h1>
          </header>

          <section className="flex justify-between flex-wrap mt-8">
            <div className="w-full md:w-8/12">
              <h2 className="text-xl bold">User Info</h2>
              <div className="flex flex-col md:flex-row justify-between mt-8">
                <picture className="mr-8 inline-block rounded-full self-center overflow-hidden shadow mb-4 md:mb-0">
                  <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                </picture>
                <ul className="border rounded-md shadow flex-grow">
                  <li className="border-b p-3"><AiOutlineUser></AiOutlineUser>{`${user.firstName} ${user.lastName}`}</li>
                  <li className="border-b p-3"><AiOutlineMail></AiOutlineMail>{`${user.email}`}</li>
                  <li className="border-b p-3">
                    <Button skin="danger" className="text-xs m-1" onClick={forgetMyData}>Forget My Data</Button>
                    <Button skin="danger" className="text-xs m-1" onClick={deleteMyProfile}>Delete My Profile</Button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-4/12 flex justify-center mt-8 md:mt-0">
              <Creature></Creature>
            </div>
            <section className="mt-4 md:w-1/4 md:mt-12 mx-auto">
              <ProfileForm></ProfileForm>
            </section>
          </section>
        </div>
      ) : <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo>
      }</>


}

export default ProfilePage;
