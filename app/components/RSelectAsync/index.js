/* eslint-disable no-underscore-dangle */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "./rselectAsyncStyle.scss";
import cs from "classnames";
import Select from "react-select";
import Request from "utils/request";
import { get, without, isEmpty, omit, map } from "lodash";
import { useDebounce } from "react-use";
import usePrevious from "../../utils/usePrevious";
import MenuList from "./MenuList";

const RSelectAsync = (props) => {
  const [page, setPage] = useState(1);
  const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [focus, setFocus] = useState(false);
  const {
    url,
    apiType,
    param,
    error,
    touched,
    components,
    onBlur,
    customOptions,
    styles,
    refreshOptions,
    shouldShowExtraComponentInList,
    extraMenuListProps,
    onOptionsLoad,
    shouldInitialLoad,
    allowEmptyKeyword,
    onSearchTextChange,
    distinct,
    innerRef,
    ...rest
  } = props;
  const prevUrl = usePrevious(url);
  useDebounce(
    () => {
      if (focus) loadOptionsOnOpen(keyword);
    },
    200,
    [keyword, focus, refreshOptions]
  );
  useEffect(() => {
    if (shouldInitialLoad) loadOptionsOnOpen("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const loadOptionsOnOpen = useCallback(
    async (keyWord) => {
      if (url) {
        setLoading(true);
        setPage(1);
        setIsMoreDataAvailable(true);
        const resp = await Request({
          url,
          method: apiType,
          params: {
            ...(distinct && { distinct }),
            ...(keyWord || allowEmptyKeyword ? { [param]: keyWord } : {}),
          },
        });
        if (resp.status === 200) {
          const rs = get(resp, "data", []) || [];
          if (!isEmpty(rs)) {
            if (distinct) {
              const optionsPvt = map(rs, (opt) => ({ [distinct]: opt }));
              setOptions(optionsPvt.concat(customOptions));
            } else setOptions(rs.concat(customOptions));
          } else {
            setIsMoreDataAvailable(false);
            setOptions([].concat(customOptions));
          }
          if (url !== prevUrl && onOptionsLoad) {
            onOptionsLoad(rs);
          }
          if (distinct) {
            setIsMoreDataAvailable(false);
          }
        } else {
          setIsMoreDataAvailable(true);
          setOptions([].concat(customOptions));
          setPage(1);
        }

        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiType, customOptions, param, url]
  );

  const onInputChange = (text) => {
    setKeyword(text);
    if (props.onSearchTextChange) props.onSearchTextChange(text);
  };

  const loadMoreOptions = async (hasMore) => {
    // Checking if we have more data or not
    if (!hasMore) {
      return;
    }
    setLoadingMoreData(true);
    const resp = await Request({
      url,
      method: apiType,
      params: {
        page: page + 1,
        [param]: keyword,
        ...(distinct && { distinct }),
      },
    });

    if (resp.status === 200) {
      const rs = get(resp, "data", []) || [];
      if (!isEmpty(rs)) {
        setPage((currentPage) => currentPage + 1);
        setIsMoreDataAvailable(true);
        setOptions(
          without([...options, ...rs], ...[].concat(customOptions)).concat(
            customOptions
          )
        );
      } else {
        setIsMoreDataAvailable(false);
      }
    } else {
      setOptions([].concat(customOptions));
      setPage(1);
      setIsMoreDataAvailable(true);
    }
    setLoadingMoreData(false);
  };
  return (
    <div
      className={cs(
        {
          rSelectAsyncIsInvalid: touched && error,
          rSelectAsyncHasLeftIcon: props.leftIcon,
        },
        "rSelectAsyncRoot"
      )}
    >
      {props.leftIcon && (
        <span className="rSelectAsyncLeftIcon">{props.leftIcon}</span>
      )}

      <Select
        ref={innerRef}
        classNamePrefix="rselect"
        isLoading={loading}
        onFocus={() => {
          setFocus(true);
          setKeyword("");
        }}
        onBlur={() => {
          setFocus(false);
          // eslint-disable-next-line no-unused-expressions
          onBlur && onBlur();
        }}
        onInputChange={onInputChange}
        options={loading ? [] : options}
        menuListProps={{
          loadMoreOptions,
          hasMore: !loadingMoreData && isMoreDataAvailable,
          loading: loadingMoreData,
          shouldShowExtraComponentInList,
          extraMenuListProps,
        }}
        components={{
          ...components,
          MenuList,
          // DropdownIndicator,
        }}
        styles={{
          option: (provided, state) => {
            const customOptionStyles = get(
              styles,
              "option",
              (dataProvided) => dataProvided
            );
            return customOptionStyles(
              {
                ...provided,
                ":active": {
                  backgroundColor: "#f6f9fc",
                },
                color: "#525f7f",
                ...(state.isSelected || state.isFocused
                  ? {
                      backgroundColor: "#f6f9fc",
                      color: "#212529",
                    }
                  : {}),
              },
              state
            );
          },
          ...omit(styles, ["option"]),
        }}
        {...rest}
      />

      {error && touched && (
        <div className="rSelectAsyncInvalidFeedback">{error}</div>
      )}
    </div>
  );
};

RSelectAsync.propTypes = {
  url: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  customOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RSelectAsync.defaultProps = {
  param: "q", // /api?q=..
  isClearable: true,
  shouldShowExtraComponentInList: false,
  placeholder: "",
  apiType: "GET",
  getOptionLabel: (option) => option.text,
  getOptionValue: (option) => option._id,
  onChange: () => {},
  components: {},
  customOptions: [],
  styles: {},
  shouldInitialLoad: true,
};

export default RSelectAsync;

// all Props : https://react-select.com/props
