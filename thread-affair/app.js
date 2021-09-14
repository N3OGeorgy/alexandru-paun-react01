const test = () => {
  const testVar = <h1>hi</h1>;

  console.log(testVar);
}

test();

class NewsletterForm extends React.Component {
  state = {
    email: '',
    inputMessage: '',
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

    setTimeout(() => {
      console.log('yes!');
    }, 3000);
    alert(this.state.email);
  }

  onInputChange = (event) => {
    this.setState({
      email: event.target.value
    });
    console.log('test');
  }
  render () {
    return <form
    onSubmit={this.onSubmit}
    className="form-newsletter container"
  >
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
      />

      {
        this.state.inputMessage.length > 0 ? (<div className="message">{this.state.inputMessage}</div>) : null
      }
    </div>

    <button type="submit" title="Subscribe">Subscribe</button>
  </form>;
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);
