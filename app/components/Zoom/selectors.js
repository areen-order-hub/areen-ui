import _get from "lodash/get";

export const userId = cookie => _get(cookie, 'user.name', null);