import React from 'react';
import { FiltersSelectedInterface } from '../interfaces/FiltersSelectedInterface';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

interface FilterListInterface {
    filters: FiltersSelectedInterface[];
    deleteFilter: (columnKey: string) => void;
}

const useStyles = makeStyles({
    listItem: {
        background: '#B9D7EA',
        marginBottom: '5px',
        borderRadius: '5px',
    },
    listContainer: {
        padding: '0 10px',
    },
});

const FilterList = ({ filters, deleteFilter }: FilterListInterface) => {
    const classes = useStyles();
    if (!filters?.length) {
        return null;
    }
    const renderFiltersList = (): React.ReactNode => {
        return filters.map((opt) => {
            return (
                <Box className={classes.listItem} key={opt.column.key}>
                    <Button
                        onClick={() => {
                            deleteFilter(opt.column.key);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <span>{opt.column.label}&nbsp;</span>
                    <span>{opt.type.label}&nbsp;</span>
                    <span>{opt.value}</span>
                </Box>
            );
        });
    };
    return <Box className={classes.listContainer}>{renderFiltersList()}</Box>;
};

export default FilterList;
