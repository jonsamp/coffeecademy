import React from 'react';
import PropTypes from 'prop-types';
import s from './index.scss';

const propTypes = {
  src: PropTypes.string
};

function Image(props) {
  return <img src={props.src} className={s.presentationImage} />;
}

Image.propTypes = propTypes;

export default Image;
