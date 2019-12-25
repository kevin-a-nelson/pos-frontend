import React from 'react'
import ConnectionInfo from '../../ConnectionInfo/ConnectionInfo.jsx'
import Readers from '../../Forms/Readers.jsx'

class Connect extends React.Component {

  render() {
    return (
      <div className="connect">
        <ConnectionInfo
          backendURL={this.props.backendURL}
          reader={this.props.reader}
          onSetBackendURL={this.props.onSetBackendURL}
          onClickDisconnect={this.props.disconnectReader}
        />
        <Readers
          onClickDiscover={() => this.discoverReaders(false)}
          onSubmitRegister={this.props.onSubmitRegister}
          readers={this.props.readers}
          onConnectToReader={this.props.connectToReader}
          handleUseSimulator={this.props.connectToSimulator}
        />
      </div>
    )
  }
}

export default Connect;