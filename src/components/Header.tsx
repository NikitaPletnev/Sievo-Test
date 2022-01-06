import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    },
    text: {
        color: '#769FCD',
    },
});

const Header = () => {
    const classes = useStyles();
    return (
        <Box className={classes.header}>
            <Typography className={classes.text} variant="h3">
                Sievo Test Task
            </Typography>
        </Box>
    );
};

export default Header;
