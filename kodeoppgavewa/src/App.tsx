/**@jsx jsx */

import React, { Component } from "react";
import { array, object, number } from "prop-types";
import "./App.css";
import { css, jsx } from "@emotion/core";
import Film from "./FIlm";
import Modal from "./Modal";

interface Istate {
  filmer: any[];
  isModalOpen: boolean;
  rekkefølge: number;
  search: string;
  searchD: string;
  Action: boolean;
  Adventure: boolean;
  SciFi: boolean;
  title: boolean;
  year: boolean;
  metascoreAsc: boolean;
  imdbRating: boolean;
  runtime: boolean;
  director: boolean;
  boxOffice: boolean;
  sokFilm: string;
}

interface Iprops {}

class App extends React.Component<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      filmer: [],
      isModalOpen: false,
      rekkefølge: 1,
      search: "",
      searchD: "",
      Action: false,
      Adventure: false,
      SciFi: false,
      title: true,
      year: true,
      metascoreAsc: true,
      imdbRating: true,
      runtime: true,
      director: true,
      boxOffice: true,
      sokFilm: ""
    };

    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByYear = this.sortByYear.bind(this);
    this.sortByMetascore = this.sortByMetascore.bind(this);
    this.sortImdbRating = this.sortImdbRating.bind(this);
    this.sortRuntime = this.sortRuntime.bind(this);
    this.sortBoxOffice = this.sortBoxOffice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.commitFilters = this.commitFilters.bind(this);
    this.sortByDirector = this.sortByDirector.bind(this);
    this.leggTilFilm = this.leggTilFilm.bind(this);
  }

  Url1 = "http://www.omdbapi.com/?i=tt1285016&apikey=2175fa84"; //The Social Network
  Url2 = "http://www.omdbapi.com/?i=tt1431045&apikey=2175fa84"; //Deadpool
  Url3 = "http://www.omdbapi.com/?i=tt1201607&apikey=2175fa84"; //Harry Potter and the Deathly Hallows: Part 2
  Url4 = "http://www.omdbapi.com/?i=tt0258463&apikey=2175fa84"; //The Bourne Identity
  Url5 = "http://www.omdbapi.com/?i=tt1220719&apikey=2175fa84"; //Ip Man
  Url6 = "http://www.omdbapi.com/?i=tt2294629&apikey=2175fa84"; //Frozen

  componentDidMount() {
    this.getDataAPI();
  }

  //Henter noen filmer for å sette opp tabellen
  async getDataAPI() {
    let tempFilmer: any = [];

    let response = await fetch(this.Url1);
    let data = await response.json();
    tempFilmer.push(data);

    response = await fetch(this.Url2);
    data = await response.json();
    tempFilmer.push(data);

    response = await fetch(this.Url3);
    data = await response.json();
    tempFilmer.push(data);

    response = await fetch(this.Url4);
    data = await response.json();
    tempFilmer.push(data);

    response = await fetch(this.Url5);
    data = await response.json();
    tempFilmer.push(data);

    response = await fetch(this.Url6);
    data = await response.json();
    tempFilmer.push(data);

    this.setState({ filmer: tempFilmer });
  }

  //Gjør modal true eller false
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  //Sorteringsfunksjoner
  sortByTitle() {
    let tempFilmer = this.state.filmer;

    if (!this.state.title) {
      tempFilmer.sort(function(a, b) {
        return a.Title > b.Title ? 1 : -1;
      });

      this.setState({ filmer: tempFilmer, title: true });
    }

    if (this.state.title) {
      tempFilmer.sort(function(a, b) {
        return a.Title < b.Title ? 1 : -1;
      });

      this.setState({ filmer: tempFilmer, title: false });
    }
  }

  sortByDirector() {
    let tempFilmer = this.state.filmer;

    if (!this.state.director) {
      tempFilmer.sort(function(a, b) {
        return a.Director > b.Director ? 1 : -1;
      });

      this.setState({ filmer: tempFilmer, director: true });
    }

    if (this.state.director) {
      tempFilmer.sort(function(a, b) {
        return a.Director < b.Director ? 1 : -1;
      });

      this.setState({ filmer: tempFilmer, director: false });
    }
  }

  sortByYear() {
    if (!this.state.year) {
      this.setState(prevState => {
        this.state.filmer.sort((a, b) => a.Year - b.Year);
      });
      this.setState({ year: true });
    } else {
      this.setState(prevState => {
        this.state.filmer.sort((a, b) => b.Year - a.Year);
      });
      this.setState({ year: false });
    }
  }

  sortByMetascore() {
    if (!this.state.metascoreAsc) {
      this.setState(prevState => {
        this.state.filmer.sort((a, b) => a.Metascore - b.Metascore);
      });
      this.setState({ metascoreAsc: true });
    } else {
      this.setState(prevState => {
        this.state.filmer.sort((a, b) => b.Metascore - a.Metascore);
      });
      this.setState({ metascoreAsc: false });
    }
  }

  sortImdbRating() {
    if (!this.state.imdbRating) {
      this.setState(prevState => {
        this.state.filmer.sort((a, b) => a.imdbRating - b.imdbRating);
      });
      this.setState({ metascoreAsc: true });
    } else {
      this.setState(prevState => {
        this.state.filmer.sort((a, b) => b.imdbRating - a.imdbRating);
      });
      this.setState({ imdbRating: false });
    }
  }

  sortRuntime() {
    if (!this.state.runtime) {
      this.setState(prevState => {
        this.state.filmer.sort(
          (a, b) =>
            parseInt(a.Runtime.substring(0, 3)) -
            parseInt(b.Runtime.substring(0, 3))
        );
      });
      this.setState({ runtime: true });
    } else {
      this.setState(prevState => {
        this.state.filmer.sort(
          (a, b) =>
            parseInt(b.Runtime.substring(0, 3)) -
            parseInt(a.Runtime.substring(0, 3))
        );
      });
      this.setState({ runtime: false });
    }
  }

  sortBoxOffice() {
    if (!this.state.boxOffice) {
      this.setState(prevState => {
        this.state.filmer.sort(
          (a, b) =>
            parseInt(a.BoxOffice.substring(1)) -
            parseInt(b.BoxOffice.substring(1))
        );
      });
      this.setState({ boxOffice: true });
    } else {
      this.setState(prevState => {
        this.state.filmer.sort(
          (a, b) =>
            parseInt(b.BoxOffice.substring(1)) -
            parseInt(a.BoxOffice.substring(1))
        );
      });
      this.setState({ boxOffice: false });
    }
  }

  //endrer index som skal sendes som prop i modalen, slik at han vet hvilken film han skal vise som modal
  endreIndex(tall: number) {
    this.setState({ rekkefølge: tall });
  }

  //inputfelter
  handleChange = (teksten: string) => {
    this.setState({ search: teksten });
  };

  handleChangeD = (teksten: string) => {
    this.setState({ searchD: teksten });
  };

  handleChangeFilm = (teksten: string) => {
    this.setState({ sokFilm: teksten });
  };

  //filtermetoder som ikke er i bruk
  handleAction = () => {
    this.setState({ Action: !this.state.Action });
  };

  handleAdventure = () => {
    this.setState({ Adventure: !this.state.Adventure });
  };

  handleSciFi = () => {
    this.setState({ SciFi: !this.state.SciFi });
  };

  commitFilters() {
    let tempFilmer: any = [];

    if (this.state.Action) {
      tempFilmer = this.state.filmer.filter(each => {
        return each.Genre.indexOf("Action") !== -1;
      });
    }
    return tempFilmer;
  }

  // gjør det mulig å søke etter filmen med API-et, og legger filmen til i listen av filmer. Det er ikke behandling av
  // feilsøk. Det tas heller ikke hensyn til filmer med samme titel. Han tar den første han finner om det er flere med
  // samme navn.
  async leggTilFilm() {
    let tempFilmer = this.state.filmer;

    let UrlS = "http://www.omdbapi.com/?s=";
    let Api = "&apikey=2175fa84";
    let search = this.state.sokFilm;
    let UrlI = "http://www.omdbapi.com/?i=";

    let Url = UrlS + search + Api;

    let response = await fetch(Url);
    let data = await response.json();

    let imdbKode = data.Search[0].imdbID;

    let sisteUrl = UrlI + imdbKode + Api;

    response = await fetch(sisteUrl);
    data = await response.json();
    tempFilmer.push(data);

    this.setState({ filmer: tempFilmer });
  }

  render() {
    // Filtrerer filmlisten utifra om en søker på film-tittler eller directors, og returnerer en liste som rendres.
    let filteredMovies =
      this.state.search.length > 0
        ? this.state.filmer.filter(each => {
            return each.Title.indexOf(this.state.search) !== -1;
          })
        : this.state.filmer.filter(each => {
            return each.Director.indexOf(this.state.searchD) !== -1;
          });

    return (
      <div>
        <div id="tittel">
          <h1>Filmtabell</h1>
        </div>
        <Modal
          show={this.state.isModalOpen}
          onClose={this.toggleModal}
          index={this.state.rekkefølge}
          filmer={this.state.filmer}
        />

        {/* 
        Begynte å lage filter for sjangere, men fikk det ikke helt til
        <form>
          Action
          <input
            type="checkbox"
            name="Action"
            checked={this.state.Action}
            onChange={this.handleAction}
          />
          Adventure
          <input
            type="checkbox"
            name="Adventure"
            checked={this.state.Adventure}
            onChange={this.handleAdventure}
          />
          Sci-Fi
          <input
            type="checkbox"
            name="Sci-Fi"
            checked={this.state.SciFi}
            onChange={this.handleSciFi}
          />
          <input type="button" value="Submit" onClick={this.commitFilters} />
        </form> */}

        <form>
          Search movies in table:
          <input
            type="text"
            value={this.state.search}
            onChange={(e: any) => this.handleChange(e.target.value)}
          />
          Search director in table:
          <input
            type="text"
            value={this.state.searchD}
            onChange={(e: any) => this.handleChangeD(e.target.value)}
          />
        </form>
        <div className="Filmer">
          <table id="myTable">
            <tbody>
              <tr>
                <th onClick={this.sortByTitle}>Title</th>
                <th onClick={this.sortByYear}>Year</th>
                <th>Genre</th>
                <th onClick={this.sortRuntime}>Runtime</th>
                <th onClick={this.sortByDirector}>Director</th>
                <th onClick={this.sortBoxOffice}>BoxOffice</th>
                <th onClick={this.sortByMetascore}>MetaRating</th>
                <th onClick={this.sortImdbRating}>ImdbRating</th>
              </tr>
              {filteredMovies.map((each, index) => {
                return (
                  <tr onClick={() => this.endreIndex(index)}>
                    <td
                      onClick={this.toggleModal}
                      key={each.Metascore + Math.random() * 1000}
                    >
                      {each.Title}
                    </td>
                    <td key={each.Metascore + Math.random() * 1000}>
                      {each.Year}
                    </td>

                    <td key={each.Metascore + Math.random() * 1000}>
                      {each.Genre}
                    </td>
                    <td key={each.Metascore + Math.random() * 1000}>
                      {each.Runtime}
                    </td>
                    <td key={each.Metascore + Math.random() * 1000}>
                      {each.Director}
                    </td>
                    <td key={each.Metascore + Math.random() * 1000}>
                      {each.BoxOffice}
                    </td>
                    <td key={each.Metascore + Math.random() * 1000}>
                      {each.Metascore}
                    </td>
                    <td key={each.imdbRating + Math.random() * 1000}>
                      {each.imdbRating}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <input
            type="text"
            value={this.state.sokFilm}
            onChange={(e: any) => this.handleChangeFilm(e.target.value)}
          />
          <input
            type="submit"
            onClick={this.leggTilFilm}
            value="Add movie to table"
          />
        </div>
      </div>
    );
  }
}

export default App;
