import {Component} from "react";
import MetaImage from "./MetaImage";

const baseUrl = 'https://swapi.dev/api/films';

class Film extends Component {

  state = {
    busy: true,
  };

  // getFilm() {
  //   return fetch(baseUrl).then((response) => { return response.json()})
  //   .then((data) => {
  //     this.setState({
  //       films: data.results,
  //       busy: false,
  //     });
  //   }).catch((error) => {
  //     this.setState({
  //       errorMessage: error.message,
  //       busy: false
  //     });
  //   });
  // }

  render() {
    if(this.state.busy === true){
      return <p>...Loading</p>;
    }

    const buyButtonTitle = `Buy tickets for ${this.props.film.name}`;
    return <article className="row">
      <div className="col-12 d-flex mb-4 justify-content-between align-items-center">
        <h2>{this.props.film.name}</h2>

        <button className="btn btn-outline-light align-self-center" title="back" type="button" onClick={() => {
          this.props.deselectFilm();
        }}>Back</button>
      </div>

      <div className="col-12 col-md-4 text-center">
      <MetaImage term={this.props.film.name}></MetaImage>
      </div>

      <div className="col-12 col-md-8 mt-4 mt-md-0">
        <h3 className="mb-4">Details</h3>
        <table className="table table-striped table-dark">
          <tbody>
            <tr>
              <td colSpan="2">Films:</td>
            </tr>
            {this.props.film.films.map((film, i) => {
                return (<tr><td colSpan="2" key={i} film={film}>Film {film}</td></tr>)
              })}

            <tr>
              <td>Birth Year</td>
              <td className="bg-dark text-warning">{this.props.film.birth_year}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="col-12 text-center">
        <button className="btn btn-warning text-white" type="button" title={buyButtonTitle} onClick={() => {
          this.props.purchaseFilm();
        }}>{buyButtonTitle}</button>
      </div>
    </article>
  }
}

export default Film;
