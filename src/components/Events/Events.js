import React, { useState } from "react";
import axios from "axios";
import Event from "../Event/Event";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Events.css";

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      cantConnectToAPI: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get("https://events.prephoops.com/api/event-list")
      .then((response) => {
        this.setState({ isLoading: false });
        this.setState({ events: response.data });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        this.setState({ cantConnectToAPI: true });
      });
  }

  render() {
    const { events, isLoading, cantConnectToAPI } = this.state;
    const { onSelect } = this.props;

    if (isLoading) {
      return <Loader loading={isLoading} />;
    }

    return (
      <div className="events">
        {events
          ? events.map((event, index) => (
              <Event key={index} event={event} onSelect={onSelect} />
            ))
          : null}
        {cantConnectToAPI ? (
          <Button onClick={() => this.props.history.push("/checkout")} block>
            Proceed to Checkout
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Events;
