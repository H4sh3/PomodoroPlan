import { useState } from "react"
import { authUser, sendSignUp } from "~/api/calls"

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [pw1, setPw1] = useState('')
    const [pw2, setPw2] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")

    const submitForm = () => {
        setStatus("")

        if (email.length === 0) {
            setStatus("email can'be empty!")
            return
        }

        if (pw1 !== pw2) {
            setStatus("password's don't match!")
            return
        }

        if (pw1.length === 0) {
            setStatus("Password can't be empty!")
            return
        }

        setLoading(true)

        const payload = {
            "email": email,
            "password": pw1
        }

        sendSignUp(payload)
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
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={pw2}
                        onChange={(e) => setPw2(e.target.value)}
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
                        className="bg-white w-full text-center py-3 rounded bg-green hover:bg-green-dark focus:outline-none my-1 border-gray-500 border-2">
                        Create Account
                    </button>
                    {
                        status.length > 0 && <div className="text-red-500 font-bold border-2 border-red-500 text-center bg-white mt-4 py-2 rounded-xl">
                            {status}
                        </div>
                    }
                </form>
            </div>

            <div className="text-grey-dark mt-6">
                Already have an account?
            </div>
            <a className="no-underline border-b border-blue text-blue" href="/signin">
                Sign in
            </a>
        </div>
    </div >
}
