import {
    filterData,
    filterRoles,
    getColumns,
    getRows,
    getWidth,
    toUpperCaseFirstLetter,
} from '../components/Table/helpers/helper';
import {jest} from '@jest/globals';
jest.useFakeTimers();
const testData = [
    {
        category: 'Office supplies',
        complexity: 'Hazardous',
        currency: 'USD',
        description: 'Substitute Crème fraîche with evaporated milk in ice-cream products',
        project: 2,
        responsible: 'Clark Kent',
        savings_amount: 3722.41684,
        start_date: '2016-01-02T00:00:00+00:00',
    },
];

const testFilter1 = [
    { column: { key: 'category', label: 'Category' }, type: { key: 'contains', label: 'contains' }, value: 'app' },
];
const testFilter2 = [
    { column: { key: 'category', label: 'Category' }, type: { key: 'contains', label: 'contains' }, value: 'fic' },
];

it('getColumns func test', () => {
    expect(getColumns(testData)).toContainEqual({ field: 'category', headerName: 'Category', width: 200 });
});

it('getRows func test', () => {
    expect(Object.keys(getRows(testData)[0])).toHaveLength(9);
});

it('getWidth func test', () => {
    expect(getWidth('category')).toEqual(200);
    expect(getWidth('description')).toEqual(500);
    expect(getWidth('project')).toEqual(100);
});

it('filtersRoles func test', () => {
    expect(filterRoles('contains', '21', '1')).toBeTruthy();
    expect(filterRoles('equals', '21', '1')).toBeFalsy();
    expect(filterRoles('starts with', '121', '1')).toBeTruthy();
    expect(filterRoles('ends with', 'weather', 'er')).toBeTruthy();
    expect(filterRoles('is empty', 'null', '')).toBeTruthy();
    expect(filterRoles('is not empty', 'null', '')).toBeFalsy();
});

it('filterData func test', () => {
    expect(filterData(testFilter1, testData)).toHaveLength(0);
    expect('category' in filterData(testFilter2, testData)[0]).toBeTruthy();
});

it('toUpperCaseFirstLetter func test', () => {
    expect(toUpperCaseFirstLetter('weather')).toEqual('Weather');
});
