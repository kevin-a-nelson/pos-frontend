import React from 'react'
import Client from "./client"
import BackendUrl from "./static/BackendUrl"
import Loader from "./components/Loader"
import ErrorMessage from "./components/ErrorMessage"
import App from "./App"
import {
  useHistory
} from "react-router-dom"


class AppWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errorOccured: false,
      errorMsg: null,
      history: useHistory(),
      client: new Client(BackendUrl),
      terminal: this.client.initTerminal(),
    }
  }

  withLoader = async (inputFn, inputFnArgs) => {
    this.setState({ loading: true })
    this.setState({ errorOccured: false })
    try {
      await inputFn(inputFnArgs);
    } catch (error) {
      this.setState({ errorOccured: true })
      this.setState({ errorMsg: `${error}` })
    } finally {
      this.setState({ loading: false })
      this.state.history.push("/checkout")
    }
  }

  render() {
    return (
      <div>
        <Loader
          active={this.state.loading}
          text="Loading ... "
        >
        </Loader>
        <ErrorMessage
          errorMsg={this.state.errorMsg}
          errorOccured={this.state.errorOccured}
        />
        <App
          client={this.state.client}
          terminal={this.state.terminal}
          withLoader={this.withLoader}
        />
      </div >
    )
  }
}

export default AppWrapper