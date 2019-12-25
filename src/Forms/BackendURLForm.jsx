import * as React from 'react';
import { Redirect } from "react-router-dom";

import Button from '../components/Button/Button.jsx';
import Group from '../components/Group/Group.jsx';
import Section from '../components/Section/Section.jsx';
import Text from '../components/Text/Text.jsx';
import TextInput from '../components/TextInput/TextInput.jsx';

class BackendURLForm extends React.Component {
  constructor(props) {
    super(props);

    let localstorageUrlCache = window.localStorage.getItem('terminal.backendUrl');

    this.state = {
      formSubmitted: false,
      backendURL: localstorageUrlCache ? localstorageUrlCache : ''
    };
  }

  onFormInitialize = event => {
    event.preventDefault();
    this.props.onSetBackendURL(this.state.backendURL.trim());
    this.setState({ formSubmitted: true })
  };

  onChangeBackendURL = str => {
    this.setState({ backendURL: str });
  };

  render() {
    const { backendURL } = this.state;
    if (this.state.formSubmitted) {
      return <Redirect to="/connect" />
    }
    return (
      <div>
        <Section>
          <form onSubmit={this.onFormInitialize}>
            <Group direction="column" spacing={18}>
              <Text size={16} color="dark">
                Connect to backend server
              </Text>

              <Group direction="column">
                <TextInput
                  placeholder="https://yourserver.herokuapp.com"
                  value={'https://prepnetwork-stripe.herokuapp.com/'}
                  ariaLabel="Backend URL"
                  onChange={this.onChangeBackendURL}
                />

                <Group direction="row" alignment={{ justifyContent: 'space-between' }}>
                  <Text size={12} color="lightGrey">
                    Set up and deploy{' '}
                    {/* <Link href="https://github.com/stripe/example-terminal-backend" text="example backend" newWindow />,
                    then fill in the URL. */}
                  </Text>
                  <Button disabled={backendURL === '' || backendURL === null} color="primary" type="submit">
                    <Text color="white" size={14}>
                      Connect
                    </Text>
                  </Button>
                </Group>
              </Group>
            </Group>
          </form>
        </Section>
      </div>
    );
  }
}

export default BackendURLForm;
