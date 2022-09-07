import { useEffect, useState } from "react"



const POMODURATIONS = [10 * 60, 20 * 60, 25 * 60, 30 * 60]

export default function PomodoroTimer() {

    const [secondsPassed, setSecondsPassed] = useState(0)

    const [startSeconds, setStartSeconds] = useState(POMODURATIONS[2])

    const [running, setRunning] = useState(false)

    const changeStartSeconds = (t: number) => {
        setRunning(false)
        setSecondsPassed(0)
        setStartSeconds(t)
    }

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setSecondsPassed(secondsPassed => secondsPassed + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [running]);

    const secondsLeft = startSeconds - secondsPassed
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft - minutes * 60

    if (running && minutes === 0 && seconds === 0) {
        setRunning(false)
    }

    return <div className="flex flex-col justify-center items-center p-4 gap-4">
        <div className="text-2xl">
            Start a pomodoro!
        </div>
        <div className="flex flex-row gap-4">
            {
                POMODURATIONS.map((t, i) => {
                    return <div key={i} className={`${t === startSeconds ? 'border-green-500 border-4' : 'border-gray-200 border-2'} rounded-lg p-2 cursor-pointer select-none`}
                        onClick={() => changeStartSeconds(t)}
                    >
                        {t / 60} minutes
                    </div>
                })
            }
        </div>

        <div className="text-4xl font-bold py-8">
            {`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
        </div>

        <button className={`p-4 border-2 cursor-pointer rounded-xl ${running ? 'border-red-500 light:bg-red-200 text-red-500' : 'border-green-500 light:bg-green-200'}`} onClick={() => setRunning(!running)}>
            {
                running ? 'Stop!' : 'Start!'
            }
        </button>
    </div >
}