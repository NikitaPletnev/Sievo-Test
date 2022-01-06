import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { getData } from './helpers/getter';
import Loader from './loader/Loader';
import Table from './Table';
import Search from './Tools/Search';
import Filter from './Tools/Filter';
import { FiltersSelectedInterface } from './interfaces/FiltersSelectedInterface';
import { filterData, getColumns } from './helpers/helper';

const useStyles = makeStyles({
    container: {
        display: 'block',
        padding: '0 20px',
    },
    toolsContainer: {
        marginBottom: '20px',
        borderRadius: '5px',
        background: '#FFFFFF',
        display: 'flex',
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
});

const TableContainer = () => {
    // Styles
    const classes = useStyles();
    // State declaration
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState([]);
    const [filters, setFilters] = useState<FiltersSelectedInterface[]>([]);

    // Data getting
    useEffect(() => {
        getData().then((response) => {
            setData(response);
            setLoading(false);
        });
    }, []);

    const setSearch = (searchString: string): void => {
        setSearchData(
            filterData(filters, data)?.filter((opt) => {
                return Object.values(opt).find((el: any) => {
                    return el.toString().toLowerCase().includes(searchString.toLowerCase());
                });
            }) as any,
        );
    };

    // Set filters and rebuild data
    const handleFilter = (filters: FiltersSelectedInterface[]): void => {
        setFilters(filters);
        setSearchData(filterData(filters, data) as any);
    };

    const renderTools = (): React.ReactNode => {
        if (loading) {
            return null;
        }
        return (
            <Box className={classes.toolsContainer}>
                <Filter filters={filters} columns={getColumns(data)} setFilters={handleFilter} />
                <Search setSearch={setSearch} />
            </Box>
        );
    };

    const renderTableContent = (): React.ReactNode => {
        if (loading) {
            return <Loader />;
        }
        return (
            <Box className={classes.tableContainer}>
                <Table data={searchData?.length ? searchData : data} />
            </Box>
        );
    };

    return (
        <Box className={classes.container}>
            {renderTools()}
            {renderTableContent()}
        </Box>
    );
};

export default TableContainer;
