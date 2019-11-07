// @flow
import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default (props) => {
  return (
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};
