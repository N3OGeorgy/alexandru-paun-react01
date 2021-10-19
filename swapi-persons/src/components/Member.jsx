import {Component} from "react";
import MetaImage from "./MetaImage";

class Member extends Component {
  render() {
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
                return (
                  <tr key={i}>
                    <td film={film}>
                      Film {film}
                    </td>
                    <td>
                    <button className="btn btn-sm btn-light" type="button" title={`View details`} onClick={() => {
                      this.props.viewFilm(film);
                    }}>Details</button>
                    <button className="btn btn-sm btn-warning" type="button" title={`Buy tickets`} onClick={() => {
                        this.props.purchaseFilm(film);
                      }}>Buy Tickets</button>
                    </td>
                  </tr>
                )
              })}

            <tr>
              <td>Birth Year</td>
              <td className="bg-dark text-warning">{this.props.film.birth_year}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  }
}

export default Member;
