import { useSelector } from 'react-redux';

export const useProfileColors = () => {
  // selectors run on each dispatch
  const creature = useSelector(({ profile }) => {
    return profile.creature;
  });
  return creature;
};

export default useProfileColors;
