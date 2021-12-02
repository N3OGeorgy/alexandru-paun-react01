import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ImUser} from "react-icons/im";

export const Users = () => {
  const users = useSelector((state) => {
    const {entities: users} = state.users;
    return users;
  });

  if(Object.entries(users).length <= 0) {
    return <>no users</>;
  }

  return <ul className="border rounded-md sadow">
    {
      Object.values(users).map(({id, stats}) => {
        return <li className="border-b p-3" key={id}>
          <Link to={`/ranks/${id}`} className="flex justify-between items-center">
            <ImUser></ImUser>
            <span className="truncate inline-block w-32">{id}</span>
            <span>Games Played: {stats.gamesPlayed}</span>
          </Link>
        </li>
      })
    }
  </ul>
};

export default Users;
