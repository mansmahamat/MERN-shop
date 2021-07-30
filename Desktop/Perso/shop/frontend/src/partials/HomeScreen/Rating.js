import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStare } from '@fortawesome/free-regular-svg-icons';

const Rating = ({ value, text, color }) => {
  return (
    <div>
      <span>
        <FontAwesomeIcon
          color={color}
          icon={value >= 1 ? faStar : value >= 0.5 ? faStarHalfAlt : faStare}
        />
      </span>

      <span>
        <FontAwesomeIcon
          color={color}
          icon={value >= 2 ? faStar : value >= 1.5 ? faStarHalfAlt : faStare}
        />
      </span>

      <span>
        <FontAwesomeIcon
          color={color}
          icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalfAlt : faStare}
        />
      </span>

      <span>
        <FontAwesomeIcon
          color={color}
          icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalfAlt : faStare}
        />
      </span>

      <span>
        <FontAwesomeIcon
          color={color}
          icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalfAlt : faStare}
        />
      </span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#fdcc0D',
};

export default Rating;
