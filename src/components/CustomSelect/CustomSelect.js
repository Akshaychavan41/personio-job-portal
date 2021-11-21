import { ReactComponent as DropdownIcon } from "../../assets/icons/triangle.svg";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, lighten } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    display: "flex",
    height: 26,
    "&.withIcon": {
      flexDirection: "row",
      height: 33,
      "& .MuiInputBase-root": {
        minWidth: 120,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "0 8px 8px 0",
      },
    },
    "&  .MuiFormLabel-filled.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      display: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 3,
      border: `solid 0.6px ${lighten(theme.palette.primary.main, 0.5)}`,
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
      top: `50%`,
      transform: `translateY(-50%)`,
      transition: `all .2s ease-in`,
      "&.MuiSelect-iconOpen": {
        transform: `rotate(180deg) translateY(-50%)`,
        top: `calc(50% - 7px)`,
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "3px 24px 4px 6px",
      backgroundColor: "#e4f0fc",
      fontSize: 12,
      color: theme.palette.common.black,
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(5px, 9px) scale(1)",
      fontSize: 12,
      color: theme.palette.primary.main,
      opacity: 0.4,
      "&.MuiInputLabel-shrink": {
        transform: "translate(5px, 9px) scale(1)",
      },
      top: -2,
      "&.withIcon": {
        left: theme.spacing(4),
        top: 2,
      },
    },
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 0.6,
        borderBottomWidth: 2,
      },
    },
  },
  clearListItem: {
    fontSize: 10,
    justifyContent: `flex-end`,
    display: `flex`,
    padding: `0 ${theme.spacing(2)}px`,
    textDecoration: `underline`,
    color: theme.palette.primary.main,
    "&.MuiListItem-root.Mui-selected:hover, &.MuiListItem-root.Mui-selected": {
      backgroundColor: "transparent",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  iconContainer: {
    width: theme.spacing(4),
    border: `solid 0.6px ${lighten(theme.palette.primary.main, 0.5)}`,
    borderRight: "none",
    background: "#e4f0fc",
    borderRadius: "8px 0 0 8px",
    display: "flex",
    padding: "0 8px",
    alignItems: "center",
    "& svg": {
      width: theme.spacing(2),
    },
  },
}));

export default function CustomSelect({
  placeholder,
  options,
  selected,
  changeCallback,
  isRequired,
  Icon,
  formControlClass,
  includeClear = false,
  useKeys,
  valueField,
  labelField,
  disabled,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    changeCallback(event.target.value);
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        className={`${classes.formControl} ${
          Icon && "withIcon"
        } ${formControlClass}`}
      >
        <InputLabel
          id="demo-simple-select-outlined-label"
          className={Icon && "withIcon"}
        >
          {placeholder}
        </InputLabel>
        {Icon && (
          <div className={classes.iconContainer}>
            <Icon />
          </div>
        )}
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selected || ""}
          onChange={handleChange}
          error={isRequired ? !selected : false}
          disabled={disabled}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
          IconComponent={DropdownIcon}
        >
          {includeClear && (
            <MenuItem value={""} classes={{ root: classes.clearListItem }}>
              clear
            </MenuItem>
          )}
          {options &&
            options.map((option, ind) => {
              if (useKeys) {
                return (
                  <MenuItem value={option.id} key={ind}>
                    {option.name}
                  </MenuItem>
                );
              } else if (option?.__proto__.constructor.name === "Object") {
                return (
                  <MenuItem value={option[valueField]} key={ind}>
                    {option[labelField]}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem value={option} key={ind}>
                    {option}
                  </MenuItem>
                );
              }
            })}
        </Select>
      </FormControl>
    </div>
  );
}
