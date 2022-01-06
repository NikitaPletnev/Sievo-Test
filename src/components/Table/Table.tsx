import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DataInterface } from './interfaces/DataInterface';
import { makeStyles } from '@mui/styles';
import { Box } from '@material-ui/core';
import { getColumns, getRows } from './helpers/helper';

interface TableInterface {
    data: DataInterface[];
}

const useStyles = makeStyles({
    table: {
        width: '100%',
        height: '100%',
    },
});

const Table = ({ data }: TableInterface) => {
    const classes = useStyles();

    return (
        <Box className={classes.table}>
            <DataGrid
                rows={getRows(data)}
                columns={getColumns(data)}
                autoHeight={true}
                density={'comfortable'}
                hideFooter={true}
            />
        </Box>
    );
};

export default Table;
