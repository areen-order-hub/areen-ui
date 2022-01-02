import Request from "utils/request";

export const logout = async () => {
    return await Request({
        url: "/api/auth/logout",
        method: "GET"
    });
};