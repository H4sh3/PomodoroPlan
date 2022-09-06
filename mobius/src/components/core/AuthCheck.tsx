import { useEffect } from "react";
import { getLoginStatus, StatusResponse } from "~/api/auth";
import { useMainStore } from "../store";

const AuthCheck = () => {
    const { setAuthStatus, authStatus } = useMainStore()
    useEffect(() => {
        if (authStatus.length === 0) {
            getLoginStatus().then((res: StatusResponse) => {
                setAuthStatus(res.status)
            }).catch(() => {
                console.error("backend down")
            })
        }
    }, []);

    return <></>
}

export default AuthCheck