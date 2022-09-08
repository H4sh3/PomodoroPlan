import { useState } from "react"
import { authUser, sendSignIn } from "~/api/calls"

export default function SignInPage() {

    const [email, setEmail] = useState('jane@doe.com')
    const [pw1, setPw1] = useState('test')

    const [loading, setLoading] = useState(false)

    const submitForm = () => {
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
                }
            })
    }

    return <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
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
                    className="w-full text-center py-3 rounded focus:outline-none my-1 border-gray-500 border-2">
                    Sign in
                </button>
            </div>

            <div className="text-grey-dark mt-6">
                Already have an account?
                <a className="no-underline border-b border-blue text-blue" href="../login/">
                    Log in
                </a>.
            </div>
        </div>
    </div >
}