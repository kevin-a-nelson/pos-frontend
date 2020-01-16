import React, { useState } from 'react';
import axios from 'axios';
import Event from '../Event/Event'
import { Redirect } from 'react-router-dom';
import "./Events.css"

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: null,
            cantConnectToAPI: false
        }
    }

    componentDidMount() {
        axios.get("https://events-staging.prephoops.com/event-list")
            .then(response => {
                this.setState({ events: response.data })
            })
            .catch(error => {
                this.setState({ cantConnectToAPI: true })
            })
    }

    render() {

        const { events, cantConnectToAPI } = this.state
        const { onSelect } = this.props

        if (cantConnectToAPI) {
            return <Redirect to="/input-event" />
        }

        return (
            <div className="events">
                {
                    events ?
                        events.map((event, index) =>
                            <Event
                                key={index}
                                event={event}
                                image={"https://via.placeholder.com/250x150"}
                                onSelect={onSelect}
                            />)
                        : null
                }
            </div>
        )
    }
}

export default Events

