import React from 'react';
import PropTypes from 'prop-types';
import './CircularProgressBar.scss';

export const CircularProgressBar = (dialProps) => {
  const {
    name,
    radius,
    stroke,
    progress,
  } = dialProps;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={name}
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

CircularProgressBar.dialProps = {
  name: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  stroke: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default CircularProgressBar;
