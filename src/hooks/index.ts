import { useCallback, useMemo, useState } from "react";
import type { Task } from "../types";

export function useTaskManager(initialTasks: Task[]) {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
		"all",
	);

	const addTask = useCallback(
		(newTask: Omit<Task, "id">) => {
			const newTaskWithId = {
				id: tasks.length + 1,
				...newTask,
			};
			setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
		},
		[tasks],
	);

	const updateTask = useCallback((updatedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task,
			),
		);
	}, []);

	const toggleTaskDone = useCallback((taskId: number) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, done: !task.done } : task,
			),
		);
	}, []);

	const deleteTask = useCallback((taskId: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	}, []);

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			if (filter === "completed") return task.done;
			if (filter === "incomplete") return !task.done;
			return true;
		});
	}, [tasks, filter]);

	return {
		tasks,
		filteredTasks,
		filter,
		setFilter,
		addTask,
		updateTask,
		toggleTaskDone,
		deleteTask,
	};
}

export const getDateClassName = (schedule: Date | undefined, done: boolean) => {
	return useMemo(() => {
		if (!schedule || done) return "";
		const today = new Date();
		const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
		const taskDate = new Date(schedule.setHours(0, 0, 0, 0));

		if (taskDate < todayMidnight) return "bg-red-500 text-white";
		if (taskDate.getTime() === todayMidnight.getTime())
			return "bg-yellow-500 text-white";
		return "";
	}, [schedule, done]);
};
