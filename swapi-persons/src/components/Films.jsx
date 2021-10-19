import {Component} from "react";
import MetaImage from "./MetaImage";

class Films extends Component {
  renderFilms() {
    if( this.props.films.length <= 0){
      return <p>No films found</p>;
    }
    return this.props.films.map((film) => {
      const {name, height, mass} = film;
      const id = height + mass;

      return <article key={id} className="col-6 col-md-3 p-4 mb-2 d-flex flex-column">
        <header>
          <h6 className="text-warning text-left">{name}</h6>
        </header>

        <section>
          {/* <MetaImage term={name}></MetaImage> */}
        </section>

        <section className="d-flex justify-content-between">
          <button className="btn btn-sm btn-light" type="button" title={`View details about ${name}`} onClick={() => {
            this.props.selectFilm(film);
          }}>Details</button>
        </section>
      </article>
    });
  }
  render() {
    // console.log(this.props.films);
    return <section className="row">{this.renderFilms()}</section>;
  }
}

export default Films;
