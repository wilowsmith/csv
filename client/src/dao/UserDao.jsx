import { USER_SERVICE } from "../const/UserConst";
import ServiceWrapper from "../utils/ServiceWrapper";

/**
 * Data Access for the User API
 * @name UserDao
 * @param props
 * @return {null|*}
 */
const UserDao = (props) => {
    const { action, token, username } = props;
    const bearer = `Bearer ${token}`;
    const options = {
        headers: {
            Authorization: bearer
        },
        withCredentials: true
    };
    switch (action) {
        case "userDetailsRead":
            options.method = "GET";
            options.url = `${USER_SERVICE}/${username}/details.json`;
            return ServiceWrapper.serviceCall({
                options,
                ...props
            });
        default:
            return null;
    }
};

export default UserDao;
