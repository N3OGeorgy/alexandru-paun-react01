import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/creators/auth";
import {UserStats} from "../components/profile";
import {useAuth} from "../hooks";
import { CgSpinnerTwo } from 'react-icons/cg';

export const RankPage = ({match}) => {
  const dispatch = useDispatch();
  const userId = match.params.id;
  const { authenticated, established } = useAuth();

  const {user} = useSelector(({users}) => {
    return {
      user: users.entities[userId]
    }
  });

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return <div className="mx-auto p-4 container">
    {
      established && authenticated ?
        <>
          <header>
            <h1 className="text-3xl bold">User Rank {user.id}</h1>
          </header>

          <section className="mt-8">
            <UserStats { ...user.stats } className = 'mt-8' entryClassName="p-5"></UserStats>
          </section>
        </>
      : <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo>
    }
  </div>
};

export default RankPage;
