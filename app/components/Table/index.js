/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { get } from "lodash";

// TODO: Need to change this with illustration created by design team
const NoRecordsFound = () => (
  <div className="d-flex justify-content-between align-items-center flex-column w-100">
    <span className="display-4">No records found!</span>
  </div>
);

const Table = ({
  keyField,
  search,
  data,
  columns,
  paginationOptions,
  noDataIndication: NoDataIndication,
  onTableChange,
  id,
  rootClassName,
  ...rest
}) => {
  const componentRef = useRef(null);
  const [isSearched, setSearched] = useState(false);
  const [isInitialCall, setInitialCall] = useState(true);

  const fetchData = async () => {
    const { defaultSorted } = rest;
    const initialParams = {
      sortOrder: get(defaultSorted, "[0].order"),
      sortField: get(defaultSorted, "[0].dataField"),
      filters: {},
      page: 1,
      sizePerPage: 50,
      searchText: "",
      data: [],
    };
    // sending event type init on first fetch request
    await onTableChange("init", initialParams);
    setInitialCall(false);
  };

  // we are using this method to make a initial API call, as we can't use async/await in effect
  // calling another function from it on initial render
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isSearched && !data.length && !rest.loading ? (
        <NoDataIndication />
      ) : (
        <ToolkitProvider
          data={data}
          keyField={keyField}
          columns={columns}
          search={search}
        >
          {(props) => (
            <>
              <div id={id} className={rootClassName}>
                <BootstrapTable
                  wrapperClasses="table-responsive"
                  ref={componentRef}
                  {...props.baseProps}
                  // {...(paginationOptions
                  //   ? {
                  //       pagination: paginationFactory({
                  //         sizePerPage: 50,
                  //         alwaysShowAllBtns: true,
                  //         showTotal: false,
                  //         withFirstAndLast: false,
                  //         hideSizePerPage: true,
                  //         ...paginationOptions,
                  //       }),
                  //     }
                  //   : {})}
                  noDataIndication={
                    (props.searchProps.searchText && data.length === 0) ||
                    isSearched
                      ? NoRecordsFound
                      : NoDataIndication
                  }
                  onTableChange={async (type, params) => {
                    // if we do not return from here, on initial render it will call API two times.
                    // First is from out useEffect and after then from table
                    // so to avoid that we are returning from here
                    if (isInitialCall) {
                      return;
                    }
                    if (type === "search") {
                      setSearched(true);
                      // when searching making sure query has page 1 so updating params
                      params = {
                        ...params,
                        page: 1,
                      };
                    }
                    if (type === "sort") {
                      // when sorting making sure query has page 1 so updating params
                      params = {
                        ...params,
                        page: 1,
                      };
                    }
                    await onTableChange(type, params);
                    if (!params.searchText && type === "search") {
                      setSearched(false);
                    }
                  }}
                  overlay={overlayFactory({
                    spinner: true,
                    // className: classes.loading,
                    styles: {
                      overlay: (base) => ({
                        ...base,
                        background: "rgba(0, 0, 0, 0.1)",
                      }),
                    },
                  })}
                  {...rest}
                />
              </div>
            </>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

Table.propTypes = {
  keyField: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  paginationOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  search: PropTypes.bool,
  onTableChange: PropTypes.func,
  noDataIndication: PropTypes.func,
};

Table.defaultProps = {
  data: [],
  columns: [],
  paginationOptions: {},
  search: true,
  onTableChange: () => {},
  noDataIndication: () => <div className="px-3"> No Data Available</div>,
};

export default Table;
