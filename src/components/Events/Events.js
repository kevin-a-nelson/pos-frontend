import React, { useState } from 'react';
import axios from 'axios';
import Event from '../Event/Event'
import { Redirect } from 'react-router-dom';
import "./Events.css"

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: null
        }
    }

    componentWillMount() {
        axios.get("https://events.prephoops.com/event-list")
            .then(response => {
                this.setState({ events: response.data })
                console.log("WTF")
            })
            .catch(error => () => console.log)
    }

    render() {

        const { events } = this.state
        const { onSelect } = this.props

        return (
            <div className="events">
                {
                    events ?
                        events.map((event, index) =>
                            <Event
                                key={index}
                                event={event}
                                title={event.title}
                                image={"https://via.placeholder.com/250x150"}
                                state={event.location_state}
                                city={event.location_address_line_2}
                                onSelect={onSelect}
                            />)
                        : null
                }
            </div>
        )
    }
}

// const Events = ({ setEvent }) => {
//     const [events, setEvents] = useState(null)

//     useEffect(() => {
//         axios.get("https://events.prephoops.com/event-list")
//             .then(response => {
//                 setEvents(response.data)
//                 console.log(response.data)
//             })
//             .catch(error => () => console.log)
//     }, [])

//     if (!events || events.length === 0) {
//         // Redirect if events API is down
//         console.log("redirected")
//         return <Redirect to="/input-event" />
//     }

//     return (
//         <div>
//             {
//                 events.map((event, index) =>
//                     <Event
//                         key={index}
//                         event={event}
//                         title={event.title}
//                         image={"https://via.placeholder.com/250x150"}
//                         state={event.location_state}
//                         city={event.location_address_line_2}
//                         setEvent={setEvent}
//                     />)
//             }
//         </div>
//     )
// }

export default Events

