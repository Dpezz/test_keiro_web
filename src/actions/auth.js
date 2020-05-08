import Axios from "axios";
import { LOGIN } from ".";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import setPath from "../utils/roleAuth";

export const setCurrent = (user, error) => {
    return {
        type: LOGIN,
        payload: user,
        error,
    };
};

export const register = (data, history) => {
    return (dispatch) => {
        return Axios.post("http://localhost:8000/api/auth/register", data)
            .then((res) => {
                if (res.data.access_token) {
                    localStorage.setItem("token", res.data.access_token);
                    setAuthorizationToken(res.data.access_token);
                    dispatch(getAuth(res.data.access_token, history));
                } else {
                    dispatch(setCurrent(null, res.data.message));
                }
            })
            .catch((err) =>
                dispatch(
                    setCurrent(null, JSON.stringify(err.response.data.errors))
                )
            );
    };
};

export const login = (data, history) => {
    return (dispatch) => {
        return Axios.post("http://localhost:8000/api/auth/login", data)
            .then((res) => {
                if (res.data.access_token) {
                    localStorage.setItem("token", res.data.access_token);
                    setAuthorizationToken(res.data.access_token);
                    dispatch(getAuth(res.data.access_token, history));
                } else {
                    dispatch(setCurrent(null, JSON.stringify(res.data)));
                }
            })
            .catch((err) =>
                dispatch(
                    setCurrent(null, JSON.stringify(err.response.data.errors))
                )
            );
    };
};

export const getAuth = (token, history) => {
    return (dispatch) => {
        return Axios.get("http://localhost:8000/api/auth/profile").then(
            (res) => {
                dispatch(setCurrent(res.data.user, null));
                setPath(res.data.user, history);
            }
        );
    };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        setAuthorizationToken(null);
        dispatch(setCurrent(null, null));
    };
};
