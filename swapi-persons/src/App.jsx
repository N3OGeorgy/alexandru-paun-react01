import { Component, Fragment } from "react";
import Member from "./components/Member";
import Films from "./components/Films";
import Film from "./components/Film";
import PurchaseFilm from "./components/PurchaseFilm";
import Search from "./components/Search";

const baseUrl = 'https://swapi.dev/api/people';

class App extends Component {
  state = {
    busy: true,
    films: [],
    errorMessage: '',
    hasSearchResults: false,
    selectedMember: null,
    filmUrl: null,
    viewFilmDetails: false,
    puchasingFilm: '',
    purchasing: false
  };

  getFilms() {
    this.setState({
      busy: true,
    });

    // promise chaining
    return fetch(baseUrl).then((response) => { return response.json()})
    .then((data) => {
      this.setState({
        films: data.results,
        busy: false,
      });
    }).catch((error) => {
      this.setState({
        errorMessage: error.message,
        busy: false
      });
    });
  }

  clearSearchResults() {
    this.getFilms().then(() => {
      this.setState({
        hasSearchResults: false,
      });
    });
  }

  componentDidMount() {
    this.getFilms();
  }

  renderFilms(){
    return <>
    <h2>Available persons</h2>
    <Films films={this.state.films}

    selectFilm={(film) => {
      this.setState({
        selectedMember: film,
      });
    }}

    purchaseFilm={(film) => {
      this.setState({
        selectedMember: film,
        purchasing: true
      })
    }}></Films>
    {this.state.hasSearchResults ? <button className="btn btn-warning text-white" title="See all movies" type="button" onClick={() => {
      this.clearSearchResults();
    }}>See all movies</button> : (<></>)}
    </>;
  }

  renderFilm() {
    return <Member film={this.state.selectedMember}

    viewFilm={(film) => {
      this.setState({
        filmUrl: film,
        viewFilmDetails: true,
      });
    }}

    deselectMember={ () => {
      this.setState({
        selectedMember: null,
      });
    }}
    ></Member>
  }

  renderMainScreen() {
    if(this.state.busy === true){
      return <p>...Loading</p>;
    }

    if(this.state.busy === false && this.state.errorMessage.length > 0) {
      return <>{this.state.errorMessage}</>;
    }

    if(this.state.purchasing === true) {
      return <PurchaseFilm film={this.state.puchasingFilm}

      cancelPurchase={() => {
        this.setState({
          purchasing: false,
          selectFilm: null
        })
      }}
      ></PurchaseFilm>
    }
    if(this.state.viewFilmDetails === true) {
      return <Film filmUrl={this.state.filmUrl}
        deselectFilm={ () => {
          this.setState({
            filmUrl: null,
            viewFilmDetails: false
          });
        }}

        purchaseFilm={(film) => {
          this.setState({
            puchasingFilm: film,
            purchasing: true,
          })
        }}
        ></Film>
    }
    return this.state.selectedMember !== null ? this.renderFilm() : this.renderFilms();
  }

  render() {
    return <Fragment>
      <header className="navbar-expand-md navbar-dark fixed-top bg-dark">
        <nav className="container d-flex justify-content-between">
          <h1 className="display-6 text-warning">Swapi Persons</h1>

          <Search onSearchResults={(films) => {
            this.setState({
              films,
              hasSearchResults: true,
              selectedMember: null,
            });
          }} placeholder="Search a Person"></Search>
        </nav>
      </header>

      <main className="container mt-5 pt-5">
        {
          this.renderMainScreen()
        }
      </main>
    </Fragment>;
  }
}

export default App;
