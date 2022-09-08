import { useEffect, useState } from "react"
import { isLoggedIn, logout, StatusResponse, unauthUser } from "~/api/auth"

export default function NavbarElements() {

    const [l, setL] = useState(false)

    useEffect(() => {
        setL(isLoggedIn())
    }, [isLoggedIn()])

    return <nav
        className="items-center w-full md:w-auto hidden md:flex text-gray-600 dark:text-slate-200"
        aria-label="Main navigation"
        id="menu"
    >
        <ul
            className="flex flex-col pt-8 md:pt-0 md:flex-row md:self-center collapse w-full md:w-auto collapsed text-xl md:text-base"
        >
            <li>
                <a
                    className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                    href="/"
                >Pomodoro
                </a>
            </li>
            {
                l ?
                    <li className="">
                        <button
                            onClick={() => {
                                logout().then((res: StatusResponse) => {
                                    if (res.status === "success") {
                                        unauthUser()
                                        location.reload();
                                    }
                                })
                            }}
                            className="font-bold hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                        >
                            Log out
                        </button>
                    </li>
                    :
                    <>
                        <li>
                            <a
                                className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                href="/signin"
                            >Sign in
                            </a>
                        </li>
                        <li>
                            <a
                                className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                href="/signup"
                            >Sign up
                            </a>
                        </li>
                    </>
            }
            <li className="flex flex-col justify-center items-center">
                <button
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                    aria-label="Toggle between Dark and Light mode"
                    data-aw-toggle-color-scheme
                >
                    💡
                </button>
            </li>
        </ul>
    </nav>
}