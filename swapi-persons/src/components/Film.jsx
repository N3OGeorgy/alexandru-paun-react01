import {Component} from "react";
import MetaImage from "./MetaImage";

class Film extends Component {

  state = {
    busy: true,
    film: [],
    errorMessage: ''
  };

  getFilm() {
    return fetch(this.props.filmUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({
        film: data,
        busy: false,
      });
    }).catch((error) => {
      this.setState({
        errorMessage: error.message,
        busy: false
      });
    });
  }

  componentDidMount() {
    this.getFilm();
  }

  render() {
    if(this.state.busy === true){
      return <p>...Loading</p>;
    }

    const buyButtonTitle = `Buy tickets for ${this.state.film.title}`;
    return <article className="row">
      <div className="col-12 d-flex mb-4 justify-content-between align-items-center">
        <h2>{this.state.film.title}</h2>

        <button className="btn btn-outline-light align-self-center" title="back" type="button" onClick={() => {
          this.props.deselectFilm();
        }}>Back</button>
      </div>

      <div className="col-12 col-md-4 text-center">
      <MetaImage term={this.state.film.title}></MetaImage>
      </div>

      <div className="col-12 col-md-8 mt-4 mt-md-0">
        <h3 className="mb-4">Details</h3>
        <table className="table table-striped table-dark">
          <tbody>
            <tr>
              <td>Opening</td>
              <td>{this.state.film.opening_crawl}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="col-12 text-center">
        <button className="btn btn-warning text-white" type="button" title={buyButtonTitle} onClick={() => {
          this.props.purchaseFilm(this.state.film);
        }}>{buyButtonTitle}</button>
      </div>
    </article>
  }
}

export default Film;
