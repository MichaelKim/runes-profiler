import React from 'react';
import PropTypes from 'prop-types';

import Header from '../containers/header.jsx';
import Footer from '../containers/footer.jsx';
import Loader from '../containers/loader.jsx';

import KeystonesDisplay from './keystonesdisplay.jsx';
import PagesDisplay from './pagesdisplay.jsx';
import { makeRequest } from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: {}
    };

    makeRequest('/champ?name=' + this.props.name)
      .then(data => {
        this.setState({
          loaded: true,
          data: data
        });
      })
      .catch(error => {
        console.error('Fetch error', err);
      });
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.loaded ? (
          <div id="center" className="fadein">
            <div style={{ margin: '0 auto 70px auto', width: '800px' }}>
              <div
                style={{
                  marginTop: '12px',
                  borderBottom: '2px solid #f0e6d2',
                  boxSizing: 'border-box'
                }}
              >
                <img
                  style={{ width: '100px', height: '100px' }}
                  src={'../assets/champion/' + this.state.data.name + '.png'}
                />
                <h1
                  style={{
                    display: 'inline',
                    position: 'relative',
                    bottom: '38px',
                    left: '10px'
                  }}
                >
                  {this.state.data.name}
                </h1>
              </div>
              <div style={{ display: 'flex' }}>
                <KeystonesDisplay data={this.state.data.keystones} />
                <PagesDisplay data={this.state.data.pages} />
              </div>
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
  name: PropTypes.string.isRequired
};

module.exports = App;
