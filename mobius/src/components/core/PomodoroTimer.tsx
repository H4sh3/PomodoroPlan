import { useEffect, useState } from "react"

import useSound from 'use-sound';
import { isServer, Task, updateTask } from "~/api/calls";


export const emptyTask: Task = {
    description: '',
    finished: false,
    uuid: ''
}

const POMODURATIONS = [10 * 60, 20 * 60, 25 * 60, 30 * 60]
const BREAKDURATIONS = [2 * 60, 5 * 60, 10 * 60, 15 * 60]

const breakTimeString = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds - m * 60
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

export default function PomodoroTimer() {
    const [playBreakEnd] = useSound('/sounds/break.wav', { volume: 0.5 });
    const [playPomodoroEnd] = useSound('/sounds/pomodoro.wav', { volume: 0.5 });

    const [secondsPassed, setSecondsPassed] = useState(0)
    const [pomodoSeconds, setPomodoSeconds] = useState(POMODURATIONS[2])
    const [targetSeconds, setTargetSeconds] = useState(pomodoSeconds)
    const [breakSeconds, setBreakSeconds] = useState(BREAKDURATIONS[1])


    const [running, setRunning] = useState(false)

    const [showSettings, setShowSettings] = useState(false)

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

    const [task, setTask] = useState(emptyTask)

    useEffect(() => {
        const taskString: string = !isServer ? localStorage.getItem("task") : ''
        if (taskString && taskString.length > 0) {
            setTask(JSON.parse(taskString))
        }
    }, [])

    return <div className="flex flex-col items-center justify-center gap-4 light:bg-orange-500 pt-4">
        {
            breakActive && <div className="text-green-500">
                Time to take a break...
            </div>
        }
        {
            task.description.length > 0 && <div className="p-2 xl:w-1/2 text-center flex flex-col gap-2 items-center">
                <div className="text-2xl underline">
                    Active Task
                </div>
                <div>
                    {task.description}
                </div>
                {
                    <button onClick={() => {
                        updateTask(task.uuid, ["finished"]).then(() => {
                            // clear current task
                            setTask(emptyTask)
                            window.localStorage.removeItem("task")
                        })
                    }}
                        className="p-2 border-2 cursor-pointer rounded-xl border-green-500 light:bg-green-200"
                    >
                        Finished
                    </button>
                }
            </div>
        }
        <div className="text-4xl font-bold py-8 flex flex-col items-center">
            <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-1 justify-center items-center">
                    {`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                    {
                        !running && <div className="text-gray-400 text-xs">
                            {`Break ${breakTimeString(breakSeconds)} `}
                        </div>
                    }
                </div>
            </div>
            {
                !showSettings && !running && <button onClick={() => setShowSettings(!showSettings)} className="scale-50 border border-gray-100 rounded-xl">
                    <div className="p-2">
                        🔧
                    </div>
                </button>
            }
        </div>
        {
            showSettings && <div className="flex flex-col gap-2 p-2 border-2 border-gray-600 justify-center items-center">
                <div className="w-full flex flex-row justify-end">
                    <button onClick={() => setShowSettings(!showSettings)} className="cursor-pointer select-none p-2 border-2 rounded-xl">
                        X
                    </button>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex flex-col gap-1 items-center">
                        <div className="underline">
                            Pomodoro Duration
                        </div>
                        <div className="flex flex-row gap-2 p-2">
                            {
                                POMODURATIONS.map((t, i) => {
                                    return <div key={i} className={`${t === pomodoSeconds ? 'border-green-500 border-2' : 'border-gray-500 border-2'} rounded-lg p-2 cursor-pointer select-none`}
                                        onClick={() => changeStartSeconds(t)}
                                    >
                                        {t / 60} min
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
                                    return <div key={i} className={`${t === breakSeconds ? 'border-green-500 border-2' : 'border-gray-500 border-2'} rounded-lg p-2 cursor-pointer select-none`}
                                        onClick={() => changeBreakDuration(t)}
                                    >
                                        {t / 60} min
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
        <button className={`p-2 border-2 cursor-pointer rounded-xl ${running ? 'border-red-500 light:bg-red-200 ' : 'border-green-500 light:bg-green-200'} `} onClick={() => setRunning(!running)}>
            {
                running ? 'Stop' : 'Start'
            }
        </button>
    </div>
}