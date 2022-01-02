import _get from "lodash/get";

export const notifications = (state) =>
  _get(state, "rtNavBar.notifications", []);
export const unreadNotifications = (state) =>
  _get(state, "rtNavBar.unreadNotifications", 0);

export const getName = (cookie) => _get(cookie, "user.name", "User");
export const getId = (cookie) => _get(cookie, "user.id", null);
