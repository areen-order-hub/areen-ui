import _map from "lodash/map";
import _isObject from "lodash/isObject";
import _get from "lodash/get";
import useGetFieldFromObjects from "./useGetFieldFromObject";

export const permissions = {
  ADD_A_CLIENT: "add a client",
  UPDATE_A_CLIENT: "update a client",
  DELETE_A_CLIENT: "delete a client",

  ADD_A_SPOC: "add a spoc",
  UPDATE_A_SPOC: "update a spoc",
  DELETE_A_SPOC: "delete a spoc",

  ADD_A_POSITION: "add a position",
  UPDATE_A_POSITION: "update a position",
  DELETE_A_POSITION: "delete a position",
  ADD_MY_POSITION: "add my position",
  UPDATE_MY_POSITION: "update my position",
  DELETE_MY_POSITION: "delete my position",

  ADD_A_CANDIDATE: "add a candidate",
  UPDATE_A_CANDIDATE: "update a candidate",
  DELETE_A_CANDIDATE: "delete a candidate",
  ADD_MY_CANDIDATE: "add my candidate",
  UPDATE_MY_CANDIDATE: "update my candidate",
  DELETE_MY_CANDIDATE: "delete my candidate",

  VIEW_CLIENT_CONTRACTS: "view client contracts",

  VERIFY_CANDIDATE: "verify candidate",
  VERIFY_MY_CANDIDATE: "verify my candidate",

  VIEW_RECRUITERS: "view recruiters",

  SEND_EMAIL: "send email",
  SEND_EMAIL_TO_MY_CLIENT: "send email to my client",

  DOWNLOAD_POSITION_TRACKER: "download position tracker",
};

export const useAccess = (permissions, eitherOr = true) => {
  const userPermissions =
    useGetFieldFromObjects("authPage", "permissions", []) || [];
  const isPermissionAllowed = (permission) =>
    userPermissions.includes(permission);

  const finalPermissions = [].concat(permissions);
  const allPermissions = _map(finalPermissions, (perm) => {
    const isAllowed = isPermissionAllowed(
      _isObject(perm) ? _get(perm, "permission") : perm
    );
    const operation = _get(perm, "operation", "and");
    const otherBoolean = _get(perm, "value", true);
    switch (operation) {
      case "and":
        return isAllowed && otherBoolean;
      default:
        return isAllowed || otherBoolean;
    }
  });

  if (eitherOr) {
    return allPermissions.some((perm) => !!perm);
  }
  return allPermissions.every((perm) => !!perm);
};
