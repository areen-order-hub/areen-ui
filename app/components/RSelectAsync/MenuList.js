import React from "react";
import "./rselectAsyncStyle.scss";
import { components } from "react-select";
import get from "lodash/get";
import Loading from "components/Loaders";
import InfiniteScroll from "react-infinite-scroller";

const MenuList = (listProps) => {
  const loadMoreOptions = get(
    listProps,
    "selectProps.menuListProps.loadMoreOptions"
  );
  const hasMore = get(listProps, "selectProps.menuListProps.hasMore");
  const loading = get(listProps, "selectProps.menuListProps.loading");
  const selectedValue = get(listProps, "selectProps.value");
  const shouldShowExtraComponentInList = get(
    listProps,
    "selectProps.menuListProps.shouldShowExtraComponentInList"
  );
  const Extra = get(listProps, "selectProps.menuListProps.extraMenuListProps");
  return (
    <components.MenuList {...listProps}>
      <InfiniteScroll
        pageStart={1}
        initialLoad={false}
        loadMore={() => loadMoreOptions(hasMore)}
        hasMore={hasMore}
        useWindow={false}
        className="d-flex flex-column"
      >
        {listProps.children}
        {loading ? <Loading key="loader" size={50} /> : null}
        {!loading && !listProps.isLoading && shouldShowExtraComponentInList ? (
          <Extra.component
            value={selectedValue}
            hasValue={listProps.hasValue}
          />
        ) : null}
      </InfiniteScroll>
    </components.MenuList>
  );
};

export default MenuList;
