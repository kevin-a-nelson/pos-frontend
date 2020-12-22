import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from 'axios';

export default class Scanner extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });

      axios
        .post(`http://localhost:8000/api/claim-ticket/${1}`)
        .then((res) => {
          if (res.data.alreadyClaimed) {
            this.props.history.push('/claim-ticket-fail')
          } else {
            this.props.history.push('/claim-tickets-success')
          }
        })
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%", maxWidth: '400px' }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}
