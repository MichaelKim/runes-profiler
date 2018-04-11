import React from 'react';
import PropTypes from 'prop-types';

import Background from '../containers/background.jsx';
import Header from '../containers/header.jsx';
import Footer from '../containers/footer.jsx';
import Loader from '../containers/loader.jsx';
import Profile from '../containers/profile.jsx';
import Update from '../containers/update.jsx';
import RunesDisplay from '../containers/runesdisplay.jsx';
import { makeRequest } from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: {},
      selectedPath: -1,
      showUpdateError: false
    };
  }

  componentDidMount() {
    makeRequest(
      '/test?name=' + this.props.name + '&region=' + this.props.region
    )
      .then(data => {
        this.setState({
          loaded: true,
          data: data,
          selectedPath: 0
        });
      })
      .catch(err => {
        console.error('Fetch error', err);
      });
  }

  render() {
    const { selectedPath, loaded, data } = this.state;

    return (
      <div>
        <Background index={selectedPath} />
        <Header />
        {loaded ? (
          <div id="center">
            <div id="stats" className="fadein">
              <div id="stats-top">
                <Profile
                  imageId={data.profileData.icon}
                  name={data.profileData.name}
                />
                <Update lastUpdated={data.profileData.lastUpdated} />
              </div>
              <RunesDisplay
                data={data}
                onSelect={i => this.setState({ selectedPath: i })}
              />
            </div>
		        <Footer />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired
};

module.exports = App;
