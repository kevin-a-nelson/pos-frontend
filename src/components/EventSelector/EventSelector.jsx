import React from 'react';
import axios from 'axios';
import Event from '../Event/Event.jsx'


class EventSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null
        }
    }

    componentWillMount() {
        axios.get("https://events.prephoops.com/event-list")
            .then(response => {
                const events = response.data
                this.setState({ events })
            })
            .catch(error => console.log("There was an error loading the API"))
    }

    render() {
        const { events } = this.state
        return (
            <div>
                {
                    true ?
                        <Event />
                        :
                        null
                }
            </div>
        );
    }
}

export default EventSelector

