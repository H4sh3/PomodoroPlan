import { useEffect, useState } from "react"
import useSound from 'use-sound';


const POMODURATIONS = [10 * 60, 20 * 60, 25 * 60, 30 * 60]
const BREAKDURATIONS = [2 * 60, 5 * 60, 10 * 60, 15 * 60]

export default function PomodoroTimer() {


    const [playBreakEnd] = useSound('/public/break.wav', { volume: 0.5 });

    const [playPomodoroEnd] = useSound('/public/pomodoro.wav', { volume: 0.5 });

    const [secondsPassed, setSecondsPassed] = useState(0)
    const [pomodoSeconds, setPomodoSeconds] = useState(POMODURATIONS[2])
    const [targetSeconds, setTargetSeconds] = useState(pomodoSeconds)
    const [breakSeconds, setBreakSeconds] = useState(BREAKDURATIONS[1])


    const [running, setRunning] = useState(false)

    const [showSettings, setShowSettings] = useState(true)


    const [breakActive, setBreakActive] = useState(false)

    const changeStartSeconds = (t: number) => {
        setRunning(false)
        setSecondsPassed(0)
        setPomodoSeconds(t)
        setTargetSeconds(t)
    }

    const changeBreakDuration = (t: number) => {
        setBreakSeconds(t)
    }

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setSecondsPassed(secondsPassed => secondsPassed + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [running]);

    const secondsLeft = targetSeconds - secondsPassed
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft - minutes * 60

    if (breakActive && (seconds - secondsPassed) == 3) {
        playBreakEnd()
    }

    if (running && minutes === 0 && seconds === 0) {

        if (breakActive) {
            setRunning(false)
            setBreakActive(false)
            // after break we set duration to selected pomoduration
            setTargetSeconds(pomodoSeconds)
        } else {
            // starting a break after pomodoro is done
            setTargetSeconds(breakSeconds)
            setBreakActive(true)
            playPomodoroEnd()
        }

        setSecondsPassed(0)
    }

    return <div className="flex flex-col items-center justify-center gap-4 light:bg-orange-500 pt-4">
        <div onClick={() => setShowSettings(!showSettings)} className="flex flex-row justify-end hover:bg-green-400 cursor-pointer select-none p-2 border-2 border-green-500 rounded-xl">
            Settings
        </div>
        {
            showSettings && <div className="border-2 border-gray-200 flex flex-col gap-2">
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex flex-col gap-1 items-center">
                        <div className="underline">
                            Pomodoro Duration
                        </div>
                        <div className="flex flex-row gap-2 p-2">
                            {
                                POMODURATIONS.map((t, i) => {
                                    return <div key={i} className={`${t === pomodoSeconds ? 'border-green-500 border-4' : 'border-gray-200 border-2'} rounded-lg p-2 cursor-pointer select-none`}
                                        onClick={() => changeStartSeconds(t)}
                                    >
                                        {t / 60} minutes
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex flex-col gap-1 items-center">
                        <div className="underline">
                            Break Duration
                        </div>
                        <div className="flex flex-row gap-2 p-2">
                            {
                                BREAKDURATIONS.map((t, i) => {
                                    return <div key={i} className={`${t === breakSeconds ? 'border-green-500 border-4' : 'border-gray-200 border-2'} rounded-lg p-2 cursor-pointer select-none`}
                                        onClick={() => changeBreakDuration(t)}
                                    >
                                        {t / 60} minutes
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            breakActive && <div className="text-green-500">
                Time to take a break...
            </div>
        }
        <div className="text-4xl font-bold py-8">
            {`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
        </div>

        <button className={`p-2 border-2 cursor-pointer rounded-xl ${running ? 'border-red-500 light:bg-red-200 ' : 'border-green-500 light:bg-green-200'}`} onClick={() => setRunning(!running)}>
            {
                running ? 'Stop!' : 'Start!'
            }
        </button>
    </div>
}