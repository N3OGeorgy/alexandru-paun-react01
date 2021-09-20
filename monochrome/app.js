class AddToCartButton extends React.Component {
  // v1
  state = {
    added: false,
    busy: false,
  }

  onClick = () => {

    if(this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      // request here

      dispatchEvent(new CustomEvent('cart:add', {
        detail: this.props.productId,
      }),);

      this.setState({
        busy: false,
        added: !this.state.added,
      })
    }, 1000);

  }

  render() {
    let {added,busy} = this.state;
    let addedClassList = added === true ? 'fas fa-check-square text-success' : 'far fa-plus-square';
    return <button type="button" className={`btn`} title={added === true ? 'Remove from Cart' : 'Add to Cart'}><i className={`${busy === true ? 'spinner-border spinner-border-sm' : addedClassList}`}  onClick={this.onClick}></i></button>
  }
}

class AddToWishlistButton extends React.Component {
  // v2
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      busy: false,
    }
  }

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {

      this.setState({
        busy: false,
        added: !this.state.added,
      })
    }, 1000);
  }

  render() {
    let {added,busy} = this.state;
    let addedClassList = (added === true ? 'fas fa-heart' : 'far fa-heart');
    return <button type="button" className={`btn`} onClick={this.onClick} title={added === true ? 'Remove from Wishlist' : 'Add to Wishlist'}><i className={`${busy === true ? 'spinner-border spinner-border-sm' : addedClassList}`} ></i></button>
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;
    return [<AddToWishlistButton key="a" productId={productId}></AddToWishlistButton>, <AddToCartButton key="b" productId={productId}></AddToCartButton>];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(<ProductControls key={index} productId={index}></ProductControls>, productTileControl);
})
