import _get from "lodash/get";

export const updates = (state) => _get(state, "whatsNew.updates", []);
