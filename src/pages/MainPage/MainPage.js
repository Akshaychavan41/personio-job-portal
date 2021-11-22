import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { useQueryParam, StringParam } from "use-query-params";
import { getCandidatesList } from "../../services/main.service";
import { calculateAge, getUrlSearchParam } from "../../utils/helper";
import "./main.scss";
function MainPage(props) {
  const [pageData, setPageData] = useState();

  const [sortBy, setSortBy] = useQueryParam("sortBy", StringParam);
  const [search, setSearch] = useQueryParam("search", StringParam);
  const [filterType, setFilterType] = useQueryParam("filterType", StringParam);
  const [filterBy, setFilterBy] = useQueryParam("filterBy", StringParam);
  const [sortOrder, setSortOrder] = useQueryParam("sortOrder", StringParam);
  const [showTableLoader, setShowTableLoader] = useState(false);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    console.log(getUrlSearchParam("sortBy", window.location.href));
    setSortBy(getUrlSearchParam("sortBy", window.location.href) || undefined);
    setSearch(getUrlSearchParam("search", window.location.href) || undefined);
    setFilterType(
      getUrlSearchParam("filterType", window.location.href) || undefined
    );
    setFilterBy(
      getUrlSearchParam("filterBy", window.location.href) || undefined
    );
    setSortOrder(
      getUrlSearchParam("sortOrder", window.location.href) || undefined
    );
    fetchCantidatesData();
  }, []);

  const fetchCantidatesData = async () => {
    setShowTableLoader(true);
    const { data } = await getCandidatesList();
    if (data.error) {
      setPageError(true);
    } else {
      setPageData(data.data);
      setPageError(false);
    }

    setShowTableLoader(false);
  };

  const getFilterSortingOptions = (obj) => {
    setSearch(obj.search || undefined);
    setFilterType(obj.filterType || undefined);
    setFilterBy(obj.filterOption || undefined);
    setSortBy(obj.sortType || undefined);
    setSortOrder(obj.sortOrder || undefined);
  };

  const AgeCell = (props) => {
    return calculateAge(props);
  };
  const StatusCell = (props) => {
    return (
      <p style={{ margin: "0px", padding: "4px" }} className={props}>
        {props}
      </p>
    );
  };

  const columnsList = [
    {
      name: "Name",
      accessor: "name",
      style: {
        width: "200px",
        textAlign: "left",
      },
    },
    {
      name: "Email",
      accessor: "email",
      style: {
        width: "250px",
        textAlign: "left",
      },
    },
    {
      name: "Age",
      accessor: "birth_date",
      style: {
        width: "100px",
        textAlign: "left",
      },
      cell: AgeCell,
    },
    {
      name: "Experience",
      accessor: "year_of_experience",
      style: {
        width: "80px",
        textAlign: "left",
      },
    },
    {
      name: "Postion Applied",
      accessor: "position_applied",
      style: {
        width: "150px",
        textAlign: "left",
      },
    },
    {
      name: "Applied On",
      accessor: "application_date",
      style: {
        width: "150px",
        textAlign: "left",
      },
    },
    {
      name: "Status",
      accessor: "status",
      style: {
        width: "100px",
      },
      cell: StatusCell,
    },
  ];

  return (
    <div className="main__container">
      <h1>Applications</h1>
      {pageError && (
        <h5 style={{ color: "red" }}> Error while Fetching Data</h5>
      )}
      <div className="table__container">
        <CustomTable
          columnsList={columnsList}
          sideData={pageData}
          enableSearchFilter
          filterByColumns={["position_applied", "status"]}
          sortByColumns={[
            "position_applied",
            "application_date",
            "year_of_experience",
          ]}
          showTableLoader={showTableLoader}
          getFilterSortingOptions={getFilterSortingOptions}
          searchKey={"name"}
          initialValues={{
            search: search,
            sortBy: sortBy,
            filterBy: filterBy,
            filterType: filterType,
            sortOrder: sortOrder,
          }}
        />
      </div>
    </div>
  );
}

export default MainPage;
