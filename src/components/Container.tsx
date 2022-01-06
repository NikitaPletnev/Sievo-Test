import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import TableContainer from './Table/TableContainer';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: '#F7FBFC',
        top: 0,
        left: 0,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

const Container = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Header />
            <TableContainer />
        </Box>
    );
};

export default Container;
