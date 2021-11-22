import classes from "./CustomTable.module.scss";

import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import React, { useEffect, useState, createRef, useCallback } from "react";
import GlobalFilter from "../GlobalFilter/GlobalFilter";
import { Box } from "@material-ui/core";
import CustomSelect from "../CustomSelect/CustomSelect";
import RippleLoader from "../RippleLoader/RippleLoader";

const CustomTable = ({
  columnsList,
  isFormEditable,
  sideData,
  tableTitle,
  categoryFilterOptions,
  showTableLoader,
  filterByColumns,
  sortByColumns,
  getFilterSortingOptions,
  initialValues,
  enableSearchFilter,
  searchKey,
  ...rest
}) => {
  const [localData, setLocalData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(initialValues.search || "");
  const [filterByColTypes, setFilterByColTypes] = useState();
  const [selectedFilterType, setSelectedFilterType] = useState(
    initialValues.filterType
  );
  const [filterOptions, setFilterOptions] = useState();
  const [selectedFilterOptions, setSelectedFilterOptions] = useState(
    initialValues.filterBy
  );
  const [sortByColTypes, setSortByColTypes] = useState();
  const [selectedSortType, setSelectedSortType] = useState(
    initialValues.sortBy
  );
  const [sortOrder, setSortOrder] = useState([
    { id: 1, label: "ASC" },
    { id: 2, label: "DSC" },
  ]);
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    initialValues.sortOrder || 1
  );
  const tableEleRef = createRef();

  const loadPageData = useCallback(() => {
    setLocalData(sideData);
    setFilterByColTypes(
      columnsList.filter((col) => filterByColumns.includes(col.accessor))
    );
    setSortByColTypes(
      columnsList.filter((col) => sortByColumns.includes(col.accessor))
    );
  }, [sideData]);

  useEffect(() => {
    if (sideData) {
      if (tableEleRef && tableEleRef.current) {
        tableEleRef.current.scrollTop = 0;
      }
      loadPageData();
    }
  }, [sideData, loadPageData]);

  useEffect(() => {
    filterLocalData();
    const sortFilterObj = {
      search: globalFilter,
      filterType: selectedFilterType,
      filterOption: selectedFilterOptions,
      sortType: selectedSortType,
      sortOrder: selectedSortOrder,
    };
    enableSearchFilter && sideData && getFilterSortingOptions(sortFilterObj);
  }, [
    globalFilter,
    selectedFilterOptions,
    selectedSortType,
    selectedSortOrder,
    sideData,
  ]);

  useEffect(() => {
    if (selectedFilterType && sideData) {
      const options = new Set();
      sideData.forEach((element) => {
        options.add(element[selectedFilterType]);
      });
      setFilterOptions(
        [...options].map((item) => {
          return { id: item, name: item };
        })
      );
    }
  }, [selectedFilterType, sideData]);

  const filterLocalData = () => {
    sideData &&
      setLocalData((old) => {
        let filteredData = [...sideData];
        if (globalFilter) {
          filteredData = filteredData.filter(
            (item) => item[searchKey].toLowerCase().indexOf(globalFilter) !== -1
          );
        }
        if (selectedFilterOptions) {
          filteredData = filteredData.filter(
            (item) => item[selectedFilterType] === selectedFilterOptions
          );
        }
        if (selectedSortType) {
          filteredData = sortDataSet(filteredData);
        }
        return filteredData;
      });
  };

  const sortDataSet = (filteredData) => {
    return filteredData.sort((a, b) => {
      let tempA;
      let tempB;
      if (isDate(a[selectedSortType])) {
        tempA = new Date(a[selectedSortType]);
        tempB = new Date(b[selectedSortType]);
      } else {
        tempA = a[selectedSortType].toUpperCase();
        tempB = b[selectedSortType].toUpperCase();
      }

      if (selectedSortOrder === 1) {
        return tempA > tempB ? 1 : -1;
      } else {
        return tempA > tempB ? -1 : 1;
      }
    });
  };

  function isDate(dateStr) {
    return !isNaN(new Date(dateStr).getDate());
  }

  const generateHeaderColumns = (start, limit) => {
    const elems = [];
    columnsList.map((column, index) => {
      if (index < limit && index >= start) {
        elems.push(
          <div
            key={index}
            className={`${classes.cell} ${
              column.sticky ? classes.sticky : ""
            } ${
              classes.headingCell
            } MuiTypography-root jss247 MuiTypography-subtitle1 ${
              classes[column.colHeaderClass]
            }`}
            style={column.style || {}}
          >
            {column.name}
            <span className={classes.subtext}>{column.subText}</span>
          </div>
        );
      }
    });
    return elems;
  };

  const generateRegularColumns = (value, column) => {
    return (
      <div
        className={`${classes.cell} MuiTypography-root jss247 MuiTypography-subtitle1`}
        style={column.style || {}}
      >
        {column?.cell ? column.cell(value) : value}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <span className={classes.title}>{tableTitle}</span>
      {enableSearchFilter && (
        <div className={`${classes["custom-filter"]} ${classes["mb-1"]}`}>
          <div className={classes["w-40"]}>
            <GlobalFilter
              preGlobalFilteredRows={[]}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              className={classes.globalFilter}
              placeholder={`Search by ${searchKey}`}
            />
          </div>
          <div className={`${classes["w-60"]} ${classes["custom-filter"]}`}>
            <Box ml={2}>
              <span className={`${classes["select-label"]}`}>Filter Type</span>
              <CustomSelect
                options={filterByColTypes}
                selected={selectedFilterType}
                changeCallback={(val) => {
                  if (!val) {
                    setFilterOptions([]);
                    setSelectedFilterOptions(null);
                  }
                  setSelectedFilterType(val);
                }}
                Icon={FilterIcon}
                formControlClass=""
                includeClear={true}
                valueField={"accessor"}
                labelField={"name"}
              />
            </Box>
            <Box ml={2}>
              <span className={`${classes["select-label"]}`}>
                Filter Options
              </span>
              <CustomSelect
                options={filterOptions}
                selected={selectedFilterOptions}
                changeCallback={(val) => {
                  setSelectedFilterOptions(val);
                }}
                Icon={FilterIcon}
                formControlClass=""
                includeClear={true}
                valueField={"id"}
                labelField={"name"}
                disabled={!selectedFilterType}
              />
            </Box>
            <Box ml={2}>
              <span className={`${classes["select-label"]}`}>Sort Type</span>
              <CustomSelect
                options={sortByColTypes}
                selected={selectedSortType}
                changeCallback={(val) => {
                  setSelectedSortType(val);
                }}
                Icon={SortIcon}
                formControlClass=""
                includeClear={true}
                valueField={"accessor"}
                labelField={"name"}
              />
            </Box>
            <Box ml={2}>
              <span className={`${classes["select-label"]}`}>Order</span>
              <CustomSelect
                options={sortOrder}
                selected={selectedSortOrder}
                changeCallback={(val) => {
                  setSelectedSortOrder(val);
                }}
                Icon={SortIcon}
                formControlClass=""
                includeClear={true}
                valueField={"id"}
                labelField={"label"}
              />
            </Box>
          </div>
        </div>
      )}
      <div
        className={`${classes["sticky-table"]} ${
          showTableLoader ? classes["loader-table"] : ""
        }`}
      >
        <RippleLoader className={classes["loader"]} show={showTableLoader} />
        {!showTableLoader && (
          <div className={classes["table-body"]} ref={tableEleRef}>
            <div className={`${classes.row} ${classes.header}`}>
              {generateHeaderColumns(0, columnsList.length)}
            </div>

            {localData.map((ele, index) => {
              return (
                <div key={index} className={`${classes.row}`}>
                  {columnsList.map((col) => {
                    return generateRegularColumns(ele[col.accessor], col);
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTable;
