import { Grid, CircularProgress } from '@mui/material';
import React from 'react';

export default function CircularLoading() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
}
