import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from 'axios';

import "./Scanner.css"

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
        .post(`https://ticketing-payments-backend.herokuapp.com/api/claim-ticket-payment/4`)
        .then((res) => {
          if (res.data.alreadyClaimed) {
            this.props.history.push('/claim-ticket-fail')
          } else {
            this.props.history.push('/claim-ticket-success')
          }
        })
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div class="qr-reader">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p
          class="back-btn"
          onClick={() => this.props.history.push("/select-scanner-or-POS")}
        >
          Back
        </p>
      </div>
    );
  }
}
