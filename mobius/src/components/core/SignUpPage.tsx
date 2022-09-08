import { useState } from "react"
import { authUser, sendSignUp } from "~/api/calls"

export default function SignUpPage() {

    const [email, setEmail] = useState('jane@doe.com')
    const [pw1, setPw1] = useState('test')
    const [pw2, setPw2] = useState('test')

    const [loading, setLoading] = useState(false)

    const pwNotEqual = pw1 !== pw2

    const submitForm = () => {
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
                }
            })
    }

    return <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
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
                    pwNotEqual && <div className="border-red-500 rounded-xl text-red-500">
                        Passwords don't match!
                    </div>
                }
                {
                    loading && <div className="text-green-500">
                        loading...
                    </div>
                }
                <button
                    disabled={loading}
                    onClick={submitForm}
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green hover:bg-green-dark focus:outline-none my-1 border-gray-500 border-2">
                    Create Account
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
