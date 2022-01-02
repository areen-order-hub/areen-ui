/**
 *
 * HomePage
 *
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import messages from "./messages";
import ReposList from "../../components/ReposList";
import "./homePageStyle.scss";
import get from "lodash/get";
import { changeUsername, loadRepos } from "./actions";
export default function HomePage({}) {
  useInjectReducer({ key: "homePage", reducer });
  const dispatch = useDispatch();
  const username = useSelector((state) => get(state, "homePage.username"));
  const loading = useSelector((state) => get(state, "global.loading"));
  const error = useSelector((state) => get(state, "global.error"));
  const repos = useSelector((state) =>
    get(state, "global.userData.repositories")
  );
  const onSubmitForm = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos(username));
  };
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  const onChangeUsername = (evt) => dispatch(changeUsername(evt.target.value));
  return (
    <div className="homePage">
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Areen Order Hub application homepage"
        />
      </Helmet>
      <div className="text-center">
        <h2>
          <FormattedMessage {...messages.startProjectHeader} />
        </h2>
        <p>
          <FormattedMessage {...messages.startProjectMessage} />
        </p>
        <div className="section">
          <h2>
            <FormattedMessage {...messages.trymeHeader} />
          </h2>
          <form className="mb-4" onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <span className="prefix">
                <FormattedMessage {...messages.trymeAtPrefix} />
              </span>
              <input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </form>
          <ReposList {...reposListProps} />
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {};
