import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Copyright() {
    const companyDetails = {
        title: "PentaValue",
        url: "https://pentavalue.com"
    }
    
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href={companyDetails.url}>
            {companyDetails.title}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }