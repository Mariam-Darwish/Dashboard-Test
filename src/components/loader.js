import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    loader: {
        color:'primary', 
        variant: 'indeterminate' ,
        thickness: 5,
        disableShrink: true,
        size: 60
    }
  }));


export default function CircularUnderLoad() {
    const classes = useStyles();
    return  <CircularProgress className={classes.loader} />;
}