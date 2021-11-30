import { useAuth } from '../../hooks';

export const Authorize = ({children}) => {
  const { authenticated, established } = useAuth();

  return <>
    {!established ? ' .. logging ..' : authenticated ? children : 'Please login first'}
    </>;
};
