/**
 *
 * RepoListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import ListItem from '../../components/ListItem';
import get from 'lodash/get';
import './repoListItemStyle.scss';
import { FormattedNumber } from 'react-intl';
export default function RepoListItem(props) {
  useInjectReducer({ key: 'repoListItem', reducer });

  const currentUser = useSelector(state => get(state, 'currentUser'));
  const { item } = props;
  let nameprefix = '';

  // If the repository is owned by a different person than we got the data for
  // it's a fork and we should show the name of the owner
  if (item.owner.login !== currentUser) {
    nameprefix = `${item.owner.login}/`;
  }

  // Put together the content of the repository
  const content = (
    <div className="wrapper">
      <a href={item.html_url} target="_blank" className="repoLink">
        {nameprefix + item.name}
      </a>
      <a href={`${item.html_url}/issues`} target="_blank" className="issueLink">
        <div className="issueIcon" />
        <FormattedNumber value={item.open_issues_count} />
      </a>
    </div>
  );

  // Render the content into a list item
  return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />;
}

RepoListItem.propTypes = {};
