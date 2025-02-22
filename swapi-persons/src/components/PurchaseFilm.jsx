import {Component} from "react";
import './PurchaseFilm.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const columns = 10;
const ticketPrice = 3;

class PurchaseFilm extends Component {

  state = {
    selectedSeats: new Set()
  }

  toggleSeatSelect(seatKey) {
    const selectedSeats = new Set(this.state.selectedSeats);
    if(selectedSeats.has(seatKey)) {
      selectedSeats.delete(seatKey);
    } else {
      selectedSeats.add(seatKey);
    }

    this.setState({
      selectedSeats,
    })
  }

  renderSeats() {
    const seats = [];
    for(let i=0; i < rows.length; i++){
      for(let j=1; j <= columns; j++){
        const seatKey=`${rows[i]}-${j}`;
        const seatSelected = this.state.selectedSeats.has(seatKey);
        const cssClasses = `btn btn-sm py-2 ${seatSelected ? 'btn-warning' : 'btn-outline-dark'}`;

        seats.push(<button className={cssClasses} key={seatKey} type="button" title={seatKey} onClick={() => {
          this.toggleSeatSelect(seatKey);
        }}></button>);
      }
    }
    return seats;
  }

  purchseSeats = () => {
    const total = this.state.selectedSeats.size * ticketPrice;
    const orderObject = {
      seats: [...this.state.selectedSeats],
      total,
      filmName: this.props.film.title,
      filmId: this.props.film.episode_id,
    }

    console.log(JSON.stringify(orderObject));
  }

  renderTotalLines() {
    return Array.from(this.state.selectedSeats).map((selectedSeatKey) => {
      return <tr key={selectedSeatKey}>
        <td>Seat: {selectedSeatKey}</td>
        <td>USD {ticketPrice}</td>
      </tr>
    });
  }

  renderTotals() {
    const selectedSeats = this.state.selectedSeats.size;

    if(selectedSeats <= 0){
      return null;
    }

    const total = ticketPrice * selectedSeats;

    return <table className="table table-stripped table-dark">
      <tbody>
        {this.renderTotalLines()}
        <tr>
          <td className="fw-bold">Totals:</td>
          <td>USD {total}</td>
        </tr>
      </tbody>
    </table>
  }

  render() {
    const selectedTicketsCount = this.state.selectedSeats.size;
    const buttonTitle = `Buy tickets for ${this.props.film.title}`;

    return <section className="row">
      <header className="col-12 d-flex md-4 justify-content-between align-items-center">
        <h2>Purchase tickets for {this.props.film.title}</h2>
      </header>

      <div className="col-12 my-5">
        <div className="cinema">
          <div className="cinema__screen"></div>
          <div className="cinema__seats">{this.renderSeats()}</div>
        </div>
      </div>

      <div className="col-12">{this.renderTotals()}</div>

      <div className="col-12">
        {selectedTicketsCount > 0 ? <button className="btn btn-warning text-white" title={buttonTitle} onClick={this.purchseSeats}>Buy</button> : null}
        <button className="btn btn-outline-light float-end" title="Back" type="button" onClick={() => {
          this.props.cancelPurchase();
        }}>Back</button>
      </div>
    </section>;
  }
}

export default PurchaseFilm;
