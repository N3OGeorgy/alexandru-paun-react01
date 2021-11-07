import ProductCartButton from './ProductCartButton';

export const CartTotals = ({cart}) => {

  const renderTableRows = () => {
    return cart.map((cartItem) => {
      console.log(cartItem);
      const {name,cost_in_credits} = cartItem;

      return <tr key={name}>
        <td>
          <ProductCartButton product={cartItem}></ProductCartButton>
        </td>
        <td>{cost_in_credits}</td>
      </tr>
    });
  }

  const renderTotalsRow = () => {
    const total = cart.reduce((total, {cost_in_credits: price}) => {
      return total += Number(price);
    }, 0);

    return <tr>
      <td>Total</td>
      <td>{total}</td>
    </tr>
  }

  return <table className="table table-dark">
    <tbody>
      { renderTableRows()}
      { renderTotalsRow()}
    </tbody>
  </table>
}

export default CartTotals;
