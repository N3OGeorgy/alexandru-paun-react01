const defaultTitle = 'Swapi Vehicles';

export const Logo = ({ title }) => {
  const displayTitle = title !== undefined ? title : defaultTitle;
  return (
    <span>{displayTitle}</span>
  )
}

export default Logo;
