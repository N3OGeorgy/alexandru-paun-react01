import {useContext} from "react";
import {AppContest} from "../contexts/AppContext";
import MetaImage from "../legacy/MetaImage";

export const ProductTile = ({product}) => {
  const { name, model } = product;
  const { dispatch } = useContext(AppContest);
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


  return <article className="col-6 col-md-3 mb-6 d-flex flex-column">
    <header className="flex-grow1 text-center mb-4">
      <h5 className="text-warning text-left">{ name }</h5>
      <h6>({ model })</h6>

      <MetaImage term={name}></MetaImage>
    </header>

    <section className="mt-2 text-center">
      <button className="btn btn-warning" title={`Details for ${name}`} type="button" onClick={navigateToPdp}>Details</button>
    </section>
  </article>
}

export default ProductTile;
