import React, { useState } from 'react';
import axios from 'axios';
import Event from '../Event/Event'
import Loader from '../Loader/Loader'
import { Redirect } from 'react-router-dom';

import SelectOption from './SelectOption';

import "../Events/Events.css"

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
        axios.get(this.props.api)
            .then(response => {
                this.setState({ isLoading: false })
                this.setState({ events: response.data })
            })
            .catch(error => {
                this.setState({ isLoading: false })
            })
    }

    render() {
        const { events, isLoading } = this.state
        const { onSelect, titleKey, subTitleKey } = this.props

        if (isLoading) {
            return <Loader loading={isLoading} />
        }

        return (
            <div className="events">
                {
                    events ?
                        events.map((event, index) =>
                            <div>
                                <SelectOption
                                    event={event}
                                    title={event[titleKey]}
                                    key={index}
                                    onSelect={onSelect}
                                    img={null}
                                    subTitle={event[subTitleKey]}
                                />
                            </div>
                        )
                        : null
                }
            </div>
        )
    }
}

export default Events

