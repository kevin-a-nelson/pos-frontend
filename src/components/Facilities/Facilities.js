import React from 'react';
import axios from 'axios';
import Facility from '../Facility/Facility'
import Loader from '../Loader/Loader'
import Button from 'react-bootstrap/Button'

import "./Facilities.css"

class Facilities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            facilities: null,
            cantConnectToAPI: false,
            isLoading: true,
        }
    }

    componentDidMount() {
        // axios.get(`http://localhost:8000/api/events/${this.props.event_id}/facilities`)
        axios.get(`RANDOM DOES NOT WORK API`)
            .then(response => {
                this.setState({ isLoading: false })
                this.setState({ facilities: response.data })
            })
            .catch(error => {
                this.setState({
                    facilities: [
                        {
                            id: 1,
                            title: "Solid Rock Basketball"
                        },
                        {
                            id: 2,
                            title: "Santa Fe Family Center"
                        },
                        {
                            id: 3,
                            title: "The Hive"
                        }
                    ]
                })
                this.setState({ isLoading: false })
            })
    }

    render() {
        const { facilities, isLoading } = this.state
        const { onSelect } = this.props

        if (isLoading) {
            return <Loader loading={isLoading} />
        }

        return (
            <div className="facilities">
                {
                    facilities ?
                        facilities.map((facility, index) =>
                            <Facility
                                key={index}
                                facility={facility}
                                onSelect={onSelect}
                            />)
                        : null
                }
                <Button onClick={() => this.props.history.push("/checkout")} block>Proceed to Checkout</Button>
            </div>
        )
    }
}

export default Facilities

