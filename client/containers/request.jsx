import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../containers/loader.jsx';

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: null
    };
    makeRequest(this.props.url).then(data => {
      this.setState({
        loaded: true,
        data: data
      });
    });
  }

  render() {
    if (this.state.loaded) {
      return this.props.children(this.state.data);
    }
    return <Loader />;
  }
}

Request.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

module.exports = Request;

function makeRequest(url, callback) {
  return fetch(url)
    .then(res => {
      if (res.ok) return res.json();
      throw 'HTTP Error ' + res.status;
    })
    .catch(err => {
      console.error('Fetch error', err);
    });
}
