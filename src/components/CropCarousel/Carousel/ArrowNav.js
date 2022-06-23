import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import ForwardIcon from '@mui/icons-material/NavigateNext';
import BackIcon from '@mui/icons-material/NavigateBefore';

const ArrowNav = ({ handleClick, backward, className }) => {
  return (
    <div className={className}>
      <IconButton className="button" >
        {backward ? (
          <BackIcon onClick={handleClick} fontSize="large" />
        ) : (
          <ForwardIcon onClick={handleClick} fontSize="large" />
        )}
      </IconButton>
    </div>
  );
};

ArrowNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  backward: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

ArrowNav.defaultProps = {
  backward: false,
};

export default ArrowNav;
