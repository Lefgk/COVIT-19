import React from "react";

class Border extends React.Component {
  Comparator(a, b) {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  }

  render() {
    return (
      <div id="bordertext">
        <div id="borderleft">
          Cases<br></br>
          <span id="box_total_confirmed">
            {this.props.loading ? null : this.props.total_confirmed}
          </span>
        </div>

        <div id="borderight">
          Deaths<br></br>
          <span id="box_total_deathS">
            {this.props.loading ? null : this.props.total_death}
          </span>
        </div>

        {this.props.tabledata.sort(this.Comparator).map((value, key) => (
          <div id="itemsinborder">
            <div id="flags">
              <img src={value[3]} id="borderpicture" alt=""></img>
            </div>
            <div id="countrieslist1">{value[0]}</div>
            <div id="countrieslist3">{value[2]}</div>
            <div id="countrieslist2">{value[1]}</div>
          </div>
        ))}
        <div id="rules"></div>
      </div>
    );
  }
}

export default Border;
