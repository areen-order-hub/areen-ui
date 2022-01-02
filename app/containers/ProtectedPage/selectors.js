import _get from 'lodash/get';

export const isLoading = state => _get(state, 'authPage.isLoading', true);

export const isUser = state => _get(state, 'authPage.isUser', null);