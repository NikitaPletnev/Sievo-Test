import React, {SyntheticEvent, useState} from "react";
import { Box, Button, Menu } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FiltersSelectedInterface } from "../interfaces/FiltersSelectedInterface";
import FilterList from "./FilterList";
import { ColumnInterface } from "../interfaces/ColumnInterface";

interface FilterInterface {
  columns: ColumnInterface[];
  filters: FiltersSelectedInterface[];
  setFilters(filters: FiltersSelectedInterface[]): void;
}

const StyledButton = styled(Button)({
  marginRight: "10px",
  height: "100%",
  backgroundColor: "#B9D7EA",
  "&: hover": {
    backgroundColor: "#769FCD",
  },
});

const StyledMenu = styled(Menu)({
  marginTop: "60px",
  display: "flex",
});

const StyledAutocomplete = styled(Autocomplete)({
  width: "200px",
  marginRight: "10px",
});

const StyledBox = styled(Box)({
  display: "flex",
  padding: "0 10px",
});

const Filter = ({ columns, filters, setFilters }: FilterInterface) => {
  // State declaration
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterColumn, setFilterColumn] = useState<null | {
    key: string;
    label: string;
  }>(null);
  const [filterType, setFilterType] = useState<null | {
    key: string;
    label: string;
  }>(null);
  const [filterValue, setFilterValue] = useState<string>("");

  // Operators for filter
  const operators = [
    { key: "contains", label: "contains" },
    { key: "equals", label: "equals" },
    { key: "starts with", label: "starts with" },
    { key: "ends with", label: "ends with" },
    { key: "is empty", label: "is empty" },
    { key: "is not empty", label: "is not empty" },
  ];

  // Rebuild columns for Autocomplete components
  const prepareColumns = (): { label: string; key: string }[] => {
    return columns
      .map((opt) => {
        return { key: opt.field, label: opt.headerName };
      })
      .filter(({ key }) => {
        return !filters.find((opt) => {
          return key === opt?.column?.key;
        });
      });
  };

  const isDisabled = (): boolean => {
    return !filterColumn || !filterType;
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleSetFilter = () => {
    if (filterColumn && filterType) {
      const newFilter = {
        column: filterColumn,
        type: filterType,
        value: filterValue || "",
      };
      setFilters([...filters, newFilter]);
      clearFields();
    }
  };

  // Clearing Autocompletes ant TextField
  const clearFields = (): void => {
    setFilterColumn(null);
    setFilterType(null);
    setFilterValue("");
  };

  const deleteFilter = (columnKey: string): void => {
    const newFilters = filters.filter(({ column }) => {
      return column.key !== columnKey;
    });
    setFilters(newFilters);
    clearFields();
  };

  const renderFiltersList = () => {
    return (
      <Box>
        <FilterList filters={filters} deleteFilter={deleteFilter} />
      </Box>
    );
  };

  return (
    <Box>
      <StyledButton
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Filter
      </StyledButton>
      <StyledMenu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {renderFiltersList()}
        <StyledBox>
          <StyledAutocomplete
            size="small"
            title={"Columns"}
            value={filterColumn}
            options={prepareColumns()}
            onChange={(e: SyntheticEvent<Element, Event>, value) =>
              setFilterColumn(value as { key: string; label: string })
            }
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Columns" />
            )}
          />
          <StyledAutocomplete
            size="small"
            title={"Operators"}
            options={operators}
            value={filterType}
            onChange={(e, value) =>
              setFilterType(value as { key: string; label: string })
            }
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Operators" />
            )}
          />
          <TextField
            size="small"
            variant="standard"
            value={filterValue}
            label="Value"
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <Button
            color="primary"
            disabled={isDisabled()}
            onClick={handleSetFilter}
          >
            Add
          </Button>
        </StyledBox>
      </StyledMenu>
    </Box>
  );
};

export default Filter;
