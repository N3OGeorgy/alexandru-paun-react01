import {useContext} from "react";
import { AppContext } from '../contexts/AppContext';

export const ProductCartButton = ({product}) => {
  const { name} = product;
  const { dispatch } = useContext(AppContext);

  const navigateToPdp = () => {
    dispatch({
      type: 'setScreen',
      payload: 'productPage'
    });

    dispatch({
      type: 'setSelected',
      payload: product,
    });
  }


  return <button className="btn-link bg-dark" title={`Details for ${name}`} type="button" onClick={navigateToPdp}>{name}</button>
}

export default ProductCartButton;
