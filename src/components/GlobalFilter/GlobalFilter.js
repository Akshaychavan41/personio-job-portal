import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, lighten } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    top: "0 !important",
    flexGrow: 1,
    borderRadius: 17.5,
    boxShadow: `0 4px 9px 0 rgba(0, 0, 0, 0.02)`,
    backgroundColor: `#d3e5ff`,
    "&:hover": {
      backgroundColor: fade(`#d3e5ff`, 0.8),
    },
    width: "100%",
  },
  searchIcon: {
    width: theme.spacing(6),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    opacity: 0.2,
  },
  inputRoot: {
    width: `100%`,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: 12,
    height: 35,
    boxSizing: "border-box",
    color: theme.palette.text.main,
    "&::placeholder": {
      opacity: 0.5,
      fontWeight: 600,
      color: lighten(theme.palette.primary.main, 0.5),
    },
  },
}));

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  placeholder,
  setPageNo,
}) => {
  const classes = useStyles();
  const count = preGlobalFilteredRows.length;

  useEffect(() => {
    const keyHandler = function (e) {
      if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
        e.preventDefault();
        document.getElementById("globalSearchInput").focus();
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  });

  return (
    <div className={`${classes.search} searchContainer`}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={globalFilter || ""}
        onChange={(e) => {
          setPageNo && setPageNo("");
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={placeholder || `${count} records...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        type="search"
        id="globalSearchInput"
      />
    </div>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default GlobalFilter;
