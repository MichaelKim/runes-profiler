import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ imageId, name }) => {
  return (
    <div className="profile">
      <img
        className="profile-image"
        src={'http://ddragon.leagueoflegends.com/cdn/8.9.1/img/profileicon/' + imageId + '.png'}
      />
      <h1 className="profile-name">{name}</h1>
    </div>
  );
};

Profile.propTypes = {
  imageId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

module.exports = Profile;
