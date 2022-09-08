import { useEffect } from "react";
import { authUser, getLoginStatus, StatusResponse, unauthUser } from "~/api/calls";

export default function AuthCheck() {
    useEffect(() => {
        if (!window.sessionStorage.getItem("authStatus")) {
            getLoginStatus().then((res: StatusResponse) => {
                if (res.status === "authenticated") {
                    authUser()
                } else {
                    unauthUser()
                }
            }).catch(() => {
                console.error("backend down")
            })
        }
    }, []);

    return <></>
}