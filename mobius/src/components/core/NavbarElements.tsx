import { useMainStore } from "../store"

const NavbarElements: React.FC = () => {

    const { isLoggedIn } = useMainStore()

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
                isLoggedIn() ?
                    <>
                        <li className="">
                            <button
                                onClick={() => {
                                    console.log("clicked")
                                    document.cookie = ''
                                    location.reload();
                                }}
                                className="font-bold hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Log out
                            </button>
                        </li>
                    </>
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
        </ul>
    </nav>
}

export default NavbarElements