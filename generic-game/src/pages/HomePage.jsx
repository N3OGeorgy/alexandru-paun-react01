import {useAuth} from "../hooks";

export const HomePage = () => {
  const { authenticated, established } = useAuth();

  return <div className="p-4 container mx-auto">
    {
      !established ? '... spinner here' : authenticated ? 'logged in' : (<div className="text-center">
      <button className="w-75 md:max-w-xl w-3/4 py-20 border rounded-md shadow hover:bg-gray-100" type="buton">Login to get started</button>
    </div>)
    }

  </div>;
}

export default HomePage;
