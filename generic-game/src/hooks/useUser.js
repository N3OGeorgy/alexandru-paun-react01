import { useSelector } from 'react-redux';

export const useUser = (userId) => {
  return useSelector(({ users }) => {
    const user = users.entities[userId];
    return user;
  });
};
