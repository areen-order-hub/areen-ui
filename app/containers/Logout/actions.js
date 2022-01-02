import { logout } from './logoutApi';
import history from "../../utils/history";

export const onLogout = () => {
    return async (dispatch) => {
        try {
            await logout();
            history.push("/");
            return;
        }
        catch(err) { }
    }
}