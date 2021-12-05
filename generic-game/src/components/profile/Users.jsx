import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ImUser} from "react-icons/im";

export const Users = () => {
  const {authUserId, users} = useSelector((state) => {
    const {entities: users} = state.users;
    const authUserId = state.auth.user.id;
    return {authUserId, users};
  });

  if(Object.entries(users).length <= 0) {
    return <>no users</>;
  }

  return <ul className="border rounded-md sadow">
    {
      Object.values(users).map(({id, stats}) => {
        const className = authUserId === id ? "border-b p-3 bg-yellow-100" : "border-b p-3";
        const linkPath = authUserId === id ? `/profile` : `/ranks/${id}`;
        return <li className={className} key={id}>
          <Link to={linkPath} className="flex justify-between items-center">
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
