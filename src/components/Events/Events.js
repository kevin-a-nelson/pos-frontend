import React, { useState } from 'react';
import axios from 'axios';
import Event from '../Event/Event'
import Loader from '../Loader/Loader'
import { Redirect } from 'react-router-dom';
import "./Events.css"

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: null,
            cantConnectToAPI: false,
            isLoading: true,
        }
    }

    componentDidMount() {
        axios.get("https://events.prephoops.com/api/event-list")
            .then(response => {
                this.setState({ isLoading: false })
                this.setState({ events: response.data })
            })
            .catch(error => {
                this.setState({ isLoading: false })
            })
    }

    render() {
        const { events, cantConnectToAPI, isLoading } = this.state
        const { onSelect } = this.props

        if (isLoading) {
            return <Loader loading={isLoading} />
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

