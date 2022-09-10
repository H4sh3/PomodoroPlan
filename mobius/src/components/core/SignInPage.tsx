import { useState } from "react"
import { authUser, sendSignIn } from "~/api/calls"

export default function SignInPage() {

    const [email, setEmail] = useState('')
    const [pw1, setPw1] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")

    const submitForm = () => {
        setStatus("")
        setLoading(true)

        const payload = {
            "email": email,
            "password": pw1
        }

        sendSignIn(payload)
            .then((res) => {
                setLoading(false)
                if (res.status === "success") {
                    authUser()
                    window.location.href = '/'
                } else {
                    setStatus(res.status)
                }
            })
    }

    return <div className="pt-4 flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-gray-300 px-6 py-8 rounded shadow-md text-black w-full">
                <form action="javascript:void(0);">
                    <h1 className="mb-8 text-3xl text-center">Sign in</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={pw1}
                        onChange={(e) => setPw1(e.target.value)}
                    />
                    {
                        loading && <div className="text-green-500">
                            loading...
                        </div>
                    }
                    <button
                        disabled={loading}
                        onClick={submitForm}
                        type="submit"
                        className="bg-white w-full text-center py-3 rounded focus:outline-none my-1 border-gray-500 border-2">
                        Sign in
                    </button>
                    {
                        status.length > 0 && <div className="text-red-500 font-bold border-2 border-red-500 text-center bg-white mt-4 py-2 rounded-xl">
                            {status}
                        </div>
                    }
                </form>
            </div>
            <div className="text-grey-dark mt-6">
                Don't have an account yet?
            </div>
            <a className="no-underline border-b border-blue text-blue" href="/signup">
                Sign up
            </a>
        </div>
    </div >
}