import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from '../Event/Event.jsx'

const EventSelector = ({ setEvent, loading }) => {
    const [events, setEvents] = useState(null)

    useEffect(() => {
        axios.get("https://events.prephoops.com/event-list")
            .then(response => {
                setEvents(response.data)
            })
            .catch(error => console.log("There was an error loading the API"))
    }, [])

    if (loading) {
        return <h1>Loading ... </h1>
    }

    if (!events) {
        return <h1>No Events</h1>
    }

    return (
        <div>
            {
                events.map((event, index) =>
                    <Event
                        key={index}
                        event={event}
                        title={event.title}
                        image={"https://via.placeholder.com/250x150"}
                        state={event.location_state}
                        city={event.location_address_line_2}
                        setEvent={setEvent}
                    />)
            }
        </div>
    )
}

export default EventSelector

