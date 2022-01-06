import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    '@keyframes rotate': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        height: '30px',
        width: '30px',
        position: 'absolute',
        top: '50%',
        right: 'calc(50% - 60px)',
        borderTop: '30px solid',
        borderRight: '30px solid',
        borderRadius: '100%',
        borderColor: '#B9D7EA',
        transition: 'all 0.5s ease',
        animation: '$rotate 1s cubic-bezier(1,0,0,1) infinite',
    },
    inCircle: {
        height: '40px',
        width: '40px',
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        borderRadius: '100%',
        background: '#F7FBFC',
    },
});

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.loader}>
            <div className={classes.inCircle} />
        </div>
    );
};

export default Loader;
