import { Blocks } from 'react-loader-spinner';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';

export const Loader = () => {
  return (
    <Box>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </Box>
  )
}

Loader.propTypes = PropTypes.string.isRequired;