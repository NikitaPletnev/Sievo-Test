import { DataInterface } from '../interfaces/DataInterface';
import { ColumnInterface } from '../interfaces/ColumnInterface';
import { RowInterface } from '../interfaces/RowInterface';
import { FiltersSelectedInterface } from '../interfaces/FiltersSelectedInterface';

// Set data to columns objects for table
export const getColumns = (data: DataInterface[]): ColumnInterface[] => {
    return Object.keys(data[0]).map((opt) => {
        return { field: opt.replace(' ', '_'), headerName: toUpperCaseFirstLetter(opt), width: getWidth(opt) };
    });
};

// Set data to rows objects for table
export const getRows = (data: DataInterface[]): RowInterface[] => {
    return data.map((opt, index) => {
        const processedData: DataInterface = Object.fromEntries(
            Object.entries(opt).map((opt) => {
                if (opt[1] === 'NULL') {
                    return [[opt[0].replace(' ', '_')], ''];
                }
                if (opt[0].includes('date')) {
                    return [[opt[0].replace(' ', '_')], new Date(opt[1]).toLocaleDateString()];
                }
                return [[opt[0].replace(' ', '_')], opt[1]];
            }),
        );
        return { id: index, ...processedData };
    });
};

export const getWidth = (columnName: string): number => {
    switch (columnName) {
        case 'description':
            return 500;
        case 'project':
            return 100;
        default:
            return 200;
    }
};

export const filterRoles = (type: string, val1: string, val2: string): boolean => {
    switch (type) {
        case 'contains':
            return val1.includes(val2);
        case 'equals':
            return val1 === val2;
        case 'starts with':
            return val2.split('').every((opt, index) => {
                return val1[index] === opt;
            });
        case 'ends with':
            return val2
                .split('')
                .reverse()
                .every((opt, index) => {
                    return val1.split('').reverse().join('')[index] === opt;
                });
        case 'is empty':
            return val1 === 'null';
        case 'is not empty':
            return val1 !== 'null';
        default:
            return false;
    }
};

export const filterData = (filters: FiltersSelectedInterface[], data: DataInterface[]): DataInterface[] => {
    let dataFiltered = [...data];
    filters.map((opt) => {
        dataFiltered = dataFiltered.filter((el: any) => {
            return filterRoles(opt.type.key, el[opt.column.key].toString().toLowerCase(), opt.value.toLowerCase());
        });
    });
    return dataFiltered;
};

export const toUpperCaseFirstLetter = (string: string): string => {
    return string[0].toUpperCase() + string.substring(1);
};
