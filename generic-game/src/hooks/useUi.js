import { useSelector } from 'react-redux';

export const useUi = () => {
  return useSelector(({ ui }) => {
    return {
      ...ui,
    };
  });
};
