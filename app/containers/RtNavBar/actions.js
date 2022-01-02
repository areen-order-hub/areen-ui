import _get from "lodash/get";
import { UPDATE_NOTIFICATIONS } from "./constants";
import { getNotifications, markRead } from "./rtNavBarApi";

export const fetchNotifications = () => {
  return async (dispatch) => {
    try {
      const { data } = await getNotifications();
      dispatch(updateNotifications(data));
    } catch (err) {
      console.error(err);
      dispatch(updateNotifications());
    }
  };
};

export const markAsRead = (id) => {
  return async (dispatch) => {
    try {
      await markRead(id, { status: "Read" });
      const { data } = await getNotifications();
      dispatch(updateNotifications(data));
    } catch (err) {
      console.error(err);
      dispatch(updateNotifications());
    }
  };
};

const updateNotifications = (payload = []) => ({
  type: UPDATE_NOTIFICATIONS,
  payload,
});
