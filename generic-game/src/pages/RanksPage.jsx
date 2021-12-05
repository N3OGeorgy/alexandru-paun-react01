import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUsers} from "../actions/creators/auth";
import {useAuth} from "../hooks";
import { Users } from "../components/profile/Users";
import { CgSpinnerTwo } from 'react-icons/cg';

export const RanksPage = () => {
  const dispatch = useDispatch();
  const { authenticated, established } = useAuth();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return <div className="p-4 container mx-auto">
    {
    established && authenticated ?
      <>
        <header>
          <h1 className="text-3xl bold">Ranks</h1>
        </header>

        <section className="mt-8">
          <Users></Users>
        </section>
      </>
      : <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo>
    }
  </div>;
};

export default RanksPage;
