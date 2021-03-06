import React, { Component } from 'react';
import Contact from '../Contact/Contact';
import './Trails.css';

class TrailFinder extends Component {
  // Edit About component or pages/about.jsx to include your information.
  render() {
    return (
      <div className="main-content">
        <h2>Difficulty Level</h2>
        <div className="trail-pin__container">
          <div>
            <div className="trail-pin">
              <img
                src="https://mt.googleapis.com/vt/icon/name=icons/onion/1493-wht-blank_maps-4x.png&filter=ff4186F0"
                alt="blue-pin"
              />
              Easy
            </div>
            <div className="trail-pin">
              <img
                src="https://mt.googleapis.com/vt/icon/name=icons/onion/1493-wht-blank_maps-4x.png&filter=ff62AF44"
                alt="green-pin"
              />
              Easy/Moderate
            </div>
            <div className="trail-pin">
              <img
                src="https://mt.googleapis.com/vt/icon/name=icons/onion/1493-wht-blank_maps-4x.png&filter=ffF4B400"
                alt="yellow-pin"
              />
              Moderate
            </div>
          </div>

          <div>
            <div className="trail-pin">
              <img
                src="https://mt.googleapis.com/vt/icon/name=icons/onion/1493-wht-blank_maps-4x.png&filter=ffF8971B"
                alt="orange-pin"
              />
              Moderate/Difficult
            </div>
            <div className="trail-pin">
              <img
                src="https://mt.googleapis.com/vt/icon/name=icons/onion/1493-wht-blank_maps-4x.png&filter=ffDB4436"
                alt="red-pin"
              />
              Difficult
            </div>
          </div>
        </div>
        <iframe
          title="thh-map"
          src="https://www.google.com/maps/d/embed?mid=1sCNANxiTadBW6BQmQ-lF71kYEm4"
          width="710"
          height="700"
          className="trail-map"
        />

        <Contact description="If you have a particular trail you recommend, let us know by filling
          out the form below!" />
      </div>
    );
  }
}

export default TrailFinder;
