const test = () => {
  const testVar = <h1>hi</h1>;

  console.log(testVar);
}

test();

class NewsletterForm extends React.Component {
  state = {
    email: '',
    inputMessage: '',
    busy: false,
    submitted: false,
    submittedValue: '',
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    if(!this.validateEmail(email)) {
      this.setState({
        inputMessage: 'Please use a valid email'
      });
      console.log(email);
      return;
    }

    this.setState({
      busy: true,
    })

    setTimeout(() => {
      console.log('yes!');

      this.setState({
        busy: false,
        submitted: true,
        email: '',
        submittedValue: this.state.email,
      });
    }, 3000);
    alert(this.state.email);
  }

  onInputChange = (event) => {
    this.setState({
      email: event.target.value
    });
    console.log('test');
  }

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <div className="container">Hello {this.state.submittedValue}, ty for!</div>
        ) : (
          <form onSubmit={this.onSubmit} className="form-newsletter container">
            <label htmlFor="field-newsletter">
              Subscribe to our <span>newsletter</span>
            </label>

            <div>
              <input
                type="text"
                name="field-newsletter"
                id="field-newsletter"
                value={this.state.email}
                onChange={this.onInputChange}
                placeholder="enter your email address to receive the latest news!"
              ></input>

              {this.state.inputMessage.length > 0 ? (
                <div className="message">{this.state.inputMessage}</div>
              ) : null}
            </div>

            <button
              type="submit"
              title="Subscribe"
              disabled={this.state.busy}
              className={`${this.state.busy === true ? 'busy' : ''}`}
            >
              {this.state.busy ? (
                <i className="fas fa-spinner icon"></i>
              ) : (
                'Subsribe'
              )}
            </button>
          </form>
        )}
      </div>
    );
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);

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
    return <button className={`product-control ${this.state.added === true ? 'active' : ''} ${this.state.busy === true ? 'busy' : ''}`} type="button" title={this.state.added === true ? 'Remove From Cart' : "Add to Cart"} onClick={this.onClick}> <span>{this.state.added === true ? `PID: ${this.props.productId} in cart` : 'Add to Cart' }</span> <i className="fas fa-spinner icon"></i></button>;
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
    let className = 'product-control' + ' ' + (added ? 'active' : '') + ' ' + (busy ? 'busy' : '');
    return <button className={className} type="button" onClick={this.onClick} title={added === true ? 'Remove from Wishlist' : 'Add to Wishlist'} disabled={busy}><span><i className={added === true ? 'fas fa-heart' : 'far fa-heart'}></i></span><i className="fas fa-spinner icon"></i></button>;
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;
    return [<AddToCartButton key="a" productId={productId}></AddToCartButton>, <AddToWishlistButton key="b" productId={productId}></AddToWishlistButton>];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(<ProductControls key={index} productId={index}></ProductControls>, productTileControl);
})
