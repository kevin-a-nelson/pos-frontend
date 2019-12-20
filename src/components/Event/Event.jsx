import React from 'react'


class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null
        }
    }

    render() {
        return (
            <h1>Event</h1>
        )
    }
}

export default Event