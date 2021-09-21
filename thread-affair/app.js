const test = () => {
  const testVar = <h1>hi</h1>;

  console.log(testVar);
};

test();

const ADD_TO_CART_EVENT = 'cart:add';
const REMOVE_TO_CART_EVENT = 'cart:remove';
const ADD_TO_WISHLIST_EVENT = 'wl:add';
const REMOVE_FROM_WISHLIST_EVENT = 'wl:remove';

class NewsletterForm extends React.Component {
  state = {
    email: '',
    inputMessage: '',
    busy: false,
    submitted: false,
    submittedValue: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    if (!this.validateEmail(email)) {
      this.setState({
        inputMessage: 'Please use a valid email',
      });
      console.log(email);
      return;
    }

    this.setState({
      busy: true,
    });

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
  };

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log('test');
  };

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <div className="container">
            Hello {this.state.submittedValue}, ty for!
          </div>
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
  };

  onClick = () => {
    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      // request here

      dispatchEvent(
        new CustomEvent(
          this.state.added ? REMOVE_TO_CART_EVENT : ADD_TO_CART_EVENT,
          {
            detail: {
              productId: this.props.productId,
            },
          },
        ),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 1000);
  };

  render() {
    return (
      <button
        className={`product-control ${
          this.state.added === true ? 'active' : ''
        } ${this.state.busy === true ? 'busy' : ''}`}
        type="button"
        title={this.state.added === true ? 'Remove From Cart' : 'Add to Cart'}
        onClick={this.onClick}
      >
        {' '}
        <span>
          {this.state.added === true
            ? `PID: ${this.props.productId} in cart`
            : 'Add to Cart'}
        </span>{' '}
        <i className="fas fa-spinner icon"></i>
      </button>
    );
  }
}

class AddToWishlistButton extends React.Component {
  // v2
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      busy: false,
    };
  }

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      const { productId } = this.props;
      dispatchEvent(
        new CustomEvent(
          this.state.added ? REMOVE_FROM_WISHLIST_EVENT : ADD_TO_WISHLIST_EVENT,
          {
            detail: {
              productId, // productId = productId
            },
          },
        ),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 1000);
  };

  render() {
    const { added, busy } = this.state;
    const className =
      'product-control' +
      ' ' +
      (added ? 'active' : '') +
      ' ' +
      (busy ? 'busy' : '');
    return (
      <button
        className={className}
        type="button"
        onClick={this.onClick}
        title={added === true ? 'Remove from Wishlist' : 'Add to Wishlist'}
        disabled={busy}
      >
        <span>
          <i className={added === true ? 'fas fa-heart' : 'far fa-heart'}></i>
        </span>
        <i className="fas fa-spinner icon"></i>
      </button>
    );
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;
    return [
      <AddToCartButton key="a" productId={productId}></AddToCartButton>,
      <AddToWishlistButton key="b" productId={productId}></AddToWishlistButton>,
    ];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls key={index} productId={index}></ProductControls>,
    productTileControl,
  );
});

class HeaderCounters extends React.Component {
  state = {
    cartItemsCount: 0,
    wishlistItemsCount: 0,
    cartItems: [],
    wishlistItems: [],
    showWishlistButton: true,
  };

  showProducts(collectionName, displayName) {
    let message = '';
    const bucket = displayName.toLowerCase();

    if (this.state[collectionName] < 1) {
      message = `There are no products in your ${bucket}`;
    } else {
      message = `There are the pids in your ${bucket}: ${
        this.state[`${bucket}Items`]
      }`;
    }

    alert(message);
  }

  productCartAction = (event) => {
    const { productId } = event.detail;
    const eventType = event.type;
    let { cartItemsCount, cartItems } = this.state;

    switch (eventType) {
      case ADD_TO_CART_EVENT:
        cartItemsCount++;
        cartItems.push(productId);
        break;
      case REMOVE_TO_CART_EVENT:
        cartItemsCount--;
        cartItems = cartItems.filter(function (item) {
          return item != productId;
        });
        break;
    }
    this.setState({
      cartItemsCount,
      cartItems,
    });
    console.log(this.state);
  };

  productWishlistAction = (event) => {
    alert('on');
    const { productId } = event.detail;
    const eventType = event.type;
    const { wishlistItems } = this.state;
    let newProductIds = [];
    let productCount = 0;

    switch (eventType) {
      case ADD_TO_WISHLIST_EVENT:
        newProductIds =
          wishlistItems.length === 0
            ? [productId]
            : [...wishlistItems, productId];
        break;

      case REMOVE_FROM_WISHLIST_EVENT:
        for (let i = 0; i < wishlistItems.length; i++) {
          if (wishlistItems[i] === productId) {
            continue;
          }
          newProductIds.push(wishlistItems[i]);
        }
        break;
    }

    productCount = newProductIds.length;
    this.setState({
      wishlistItemsCount: productCount,
      wishlistItems: newProductIds,
    });
  };

  componentDidMount() {
    addEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    addEventListener(REMOVE_TO_CART_EVENT, this.productCartAction);

    addEventListener(ADD_TO_WISHLIST_EVENT, this.productWishlistAction);
    addEventListener(REMOVE_FROM_WISHLIST_EVENT, this.productWishlistAction);
  }

  componentWillUnmount() {
    removeEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    removeEventListener(REMOVE_TO_CART_EVENT, this.productCartAction);

    removeEventListener(ADD_TO_WISHLIST_EVENT, this.productWishlistAction);
    removeEventListener(REMOVE_FROM_WISHLIST_EVENT, this.productWishlistAction);
  }

  render() {
    const { wishlistItemsCount, cartItemsCount } = this.state;
    return (
      <React.Fragment>
        <button
          title="add"
          type="button"
          onClick={() => {
            this.setState({
              showWishlistButton: !this.state.showWishlistButton,
            });
          }}
        >
          Remove wishlist
        </button>
        <div className="header-counters">
          {this.state.showWishlistButton ? (
            <div className="header-counter">
              <span className="qty">{wishlistItemsCount}</span>
              <i
                className="fas fa-heart icon"
                onClick={() => {
                  this.showProducts('wishlistItemsCount', 'Wishlist');
                }}
              ></i>
            </div>
          ) : null}

          <div className="header-counter">
            <span className="qty">{cartItemsCount}</span>
            <i
              className="fas fa-shopping-cart icon"
              onClick={() => {
                this.showProducts('cartItemsCount', 'Cart');
              }}
            ></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
ReactDOM.render(<HeaderCounters></HeaderCounters>, headerCounters);
