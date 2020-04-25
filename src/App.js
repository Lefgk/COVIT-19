import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Border from "./components/Border";
import Map2 from "./components/Map/";
import "leaflet/dist/leaflet.css";
import CountriesData from "./components/Map/custom.geo.json";
import "./components/style.css";

var tabledata = [];
var total_confirmed = 0;
var total_death = 0;
var arr = [];
var numii = null;
var CountriesStateData = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country1: "",
      flag1: "",
      cases1: null,
      deaths1: "",
      casesPerOneMillion1: "",
      deathsPerOneMillion1: "",
      InfoAPI: "",
      search1: "",
      hits: [],
      CountriesData: [],
      TotalDeaths: "",
      TotalCases: "",
      Rows: [],
      APIresult: [],
      total_confirmedS: "",
      total_deathS: "",
      loading: true,
      lat: 37.98381,
      lng: 23.727539,
      hasLocation: false,
      numi: null,
      zoom: 3,
    };
    this.updateSearch1 = this.updateSearch1.bind(this);
    this.getData1 = this.getData1.bind(this);
    this.updateValues = this.updateValues.bind(this);
    this.getlatlng = this.getlatlng.bind(this);
  }

  getData1() {
    this.getjson();
    console.log(this.state.search1);
    var correctlta = this.state.search1;
    fetch(`https://corona.lmao.ninja/v2/countries/${this.state.search1}`)
      .then(function(res) {
        return res.json();
      })

      .then((myJson) =>
        this.setState({
          country1: myJson.country,
          flag1: myJson.countryInfo.flag,
          cases1: myJson.cases,
          deaths1: myJson.deaths,
          casesPerOneMillion1: myJson.casesPerOneMillion,
          deathsPerOneMillion1: myJson.deathsPerOneMillion,
          lng: CountriesStateData.features[numii].geometry.coordinates[0][0][0]
            .slice(0, -1)
            .reduce(
              (previous, current) =>
                (current += previous) /
                CountriesStateData.features[
                  numii
                ].geometry.coordinates[0][0][0].slice(0, -1).length
            ),
          lat: CountriesStateData.features[numii].geometry.coordinates[0][0][0]
            .slice(1, 2)
            .reduce(
              (previous, current) =>
                (current += previous) /
                CountriesStateData.features[
                  numii
                ].geometry.coordinates[0][0][0].slice(1, 2).length
            ),
          zoom: 6,
        })
      );
    console.log(`"lat is" ${this.state.lat}`);
    console.log(`"lng is" ${this.state.lng}`);
    console.log(numii);
    console.log(
      CountriesStateData.features[numii].geometry.coordinates[0][0][0] ||
        CountriesStateData.features[numii].geometry.coordinates[0][0]
    );

    console.log(correctlta);
    console.log(this.state.lat);
  }

  componentDidMount() {
    fetch(`https://corona.lmao.ninja/v2/countries/`)
      .then(function(res) {
        return res.json();
      })

      .then(function(data) {
        for (let country in data) {
          tabledata.push([
            data[country]["country"],
            data[country]["cases"],
            data[country]["deaths"],
            data[country]["countryInfo"]["flag"],
          ]);

          total_confirmed += data[country]["cases"];
          total_death += data[country]["deaths"];
        }
      })

      .then(
        this.setState({
          total_confirmedS: total_confirmed,
          total_deathS: total_death,
        })
      )
      .then(this.updateValues);
  }

  updateValues() {
    this.setState({
      total_confirmedS: total_confirmed,
      total_deathS: total_death,
      loading: false,
    });
  }

  getlatlng(e) {
    this.setState({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
  }

  getjson() {
    var tempstate = this.state.search1;

    Object.keys(CountriesData).forEach(function(key) {
      arr.push(CountriesData[key]);
      CountriesStateData = CountriesData;
      for (var i = 0; i < CountriesData[key].length; i++) {
        if (CountriesData.features[i].properties.name === tempstate) {
          numii = i;
        }
      }
    });
  }

  updateSearch1(event) {
    this.setState({
      search1: event.target.value,
    });
  }

  render() {
    const {
      country1,
      deaths1,
      flag1,
      cases1,
      casesPerOneMillion1,
      deathsPerOneMillion1,
      loading,
      lat,
      lng,
      zoom,
    } = this.state;

    if (this.props.search1) {
    }

    return (
      <div id="central">
        <Header />
        <div id="border">
          <Border
            total_confirmed={total_confirmed}
            total_death={total_death}
            tabledata={tabledata}
            loading={loading}
          />
        </div>
        <div id="main">
          <div id="left">
            <input
              id="leftinputbutton"
              type="text"
              placeholder="Insert your Country"
              value={this.props.search1}
              onChange={this.updateSearch1}
            />
            <button id="submitbutton" name="submit" onClick={this.getData1}>
              Submit
            </button>
            <br></br>
            <img src={flag1} id="picture" alt=""></img>
            <div id="mainleft">
              <br></br>
              Country : {country1}
              <br></br>
              Cases : {cases1}
              <br></br>
              Deaths : {deaths1}
              <br></br>
              Cases per mil :{casesPerOneMillion1}
              <br></br>
              Deaths per mil :{deathsPerOneMillion1}
            </div>
          </div>
          <Map2
            width="640px"
            height="720px"
            id="map"
            lat={lat}
            lng={lng}
            zoom={zoom}
            onClick={this.movemap}
            getlatlng={this.getlatlng}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
