import React, { useEffect, useState } from "react"
import { createNewTask, getTaskList, STATUS, Task, updateTask } from "~/api/calls"

const CreateTaskComponent: React.FC<UsesTasksProps> = ({ tasks, setTasks }) => {
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = () => {
        console.log("yo")
        setLoading(true)
        createNewTask(description).then(res => {
            if (res.status === STATUS.SUCCESS) {
                setTasks([...tasks, res.tasks[0]])
            }
        }).finally(() => setLoading(false))
    }

    return <div className="flex flex-col justify-center items-center gap-2">
        <div>
            New task
        </div>
        <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-row justify-center">
            <button onClick={submit}
                disabled={loading}
                className="w-full text-center py-3 rounded bg-green hover:bg-green-dark focus:outline-none my-1 border-gray-500 border-2 px-4"
            >
                Submit
            </button>
        </div>
    </div >
}

interface UsesTasksProps {
    tasks: Task[]
    setTasks: (t: Task[]) => void
}

const TaskList: React.FC<UsesTasksProps> = ({ tasks, setTasks }) => {

    const [deleteSure, setDeleteSure] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [loading, setLoading] = useState(false)


    const deleteTask = (uuid: string, i: number) => {

        setSelectedIndex(i)

        if (!deleteSure) {
            setDeleteSure(true)
            return
        }

        if (i !== selectedIndex) {
            setSelectedIndex(i)
            return
        }

        setLoading(true)
        updateTask(uuid, ["delete"]).then(res => {
            if (res.status === STATUS.SUCCESS)
                setTasks(tasks.filter(t => t.uuid !== uuid))
        }).finally(() => setLoading(false))

        setDeleteSure(false)
        setSelectedIndex(-1)
    }

    const finishedTask = (uuid: string) => {
        updateTask(uuid, ["finished"]).then(res => {
            if (res.status === STATUS.SUCCESS) {
                const updatedTasks = tasks.map(t => {
                    if (t.uuid === uuid) {
                        t.finished = !t.finished
                    }
                    return t
                })
                setTasks(updatedTasks)
            }
        })
    }

    const isSelectedTaskForDelete = (i: number) => i == selectedIndex

    return <div className="grid grid-cols-4 gap-4 pt-12">
        <div className="col-span-4 text-center text-2xl">
            Todo List
        </div>
        {
            tasks.map((t, i) => {
                return <React.Fragment key={i}>
                    <div className="flex flex-row justfify-around">
                        <button onClick={() => finishedTask(t.uuid)}>
                            {
                                t.finished ? <>
                                    ✅
                                </> :
                                    <>
                                        ⃝
                                    </>
                            }
                        </button>
                    </div>
                    <div className="col-span-2">
                        {t.description}
                    </div>
                    <button
                        onClick={() => deleteTask(t.uuid, i)}
                        disabled={loading}
                    >
                        {
                            deleteSure && isSelectedTaskForDelete(i) ? <>
                                Delete?
                            </>
                                : <>
                                    🗑
                                </>
                        }
                    </button>
                    <div className="col-span-4 border-b border-gray-300"></div>
                </React.Fragment>
            })
        }
    </div>
}

export default function TaskManagerComponent() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTaskList().then(r => {
            setTasks(r.tasks)
        })
    }, [])

    return <div className="flex flex-row justify-center">
        <div className="flex flex-col gap-4 xl:w-1/2 p-4">
            <TaskList tasks={tasks} setTasks={setTasks} />
            <CreateTaskComponent tasks={tasks} setTasks={setTasks} />
        </div>
    </div>
}

