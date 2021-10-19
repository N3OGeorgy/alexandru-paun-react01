import {useContext} from "react";
import {AppContest} from "../contexts/AppContext";
import MetaImage from "../legacy/MetaImage";
import ProductDetails from "./ProductDetails";

export const Product = () => {
  const { dispatch, state } = useContext(AppContest);
  const { selected: product} = state;

  const navigateHome = () => {
    dispatch({
        type: 'setScreen',
        payload: 'home',
    })
  };

  return <section className="row">
    <div className="col-12 mb-4 d-flex justify-content-between">
      <h2>{product.name}</h2>
      <buttton type="button" className="btn btn-sm btn-outline-warning" title="Go back" onClick={navigateHome}>
        Home
      </buttton>
    </div>

    <div className="col-12 mb-4 text-center">
      <MetaImage term={product.name}></MetaImage>
    </div>

    <div className="col-12 mb-4">
      <h5 className="mb-2">Specifications</h5>
      <ProductDetails product={product}></ProductDetails>
    </div>

    <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-between">
      <buttton type="button" className="btn btn-outline-warning flex-grow-1 me-2" title="Go back" onClick={navigateHome}>
        Home
      </buttton>

      <button className="btn btn-warning btn-xl flex-grow-1" title={`Add ${product.name} to cart`} type="button">Add to cart</button>
    </div>
    </section>;
}

export default Product;
