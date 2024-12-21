import { useCallback, useMemo, useState } from "react";
import type { Task } from "../types";

export function useTaskManager(initialTasks: Task[]) {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
		"all",
	);

	const addTasks = useCallback(
		(newTasks: Omit<Task, "id">[]) => {
			const tasksWithIds = newTasks.map((task, index) => ({
				id: tasks.length + index + 1,
				...task,
			}));
			setTasks((prevTasks) => [...prevTasks, ...tasksWithIds]);
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

	const toggleTaskComplete = useCallback((taskId: number) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, complete: !task.complete } : task,
			),
		);
	}, []);

	const deleteTask = useCallback((taskId: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	}, []);

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			if (filter === "completed") return task.complete;
			if (filter === "incomplete") return !task.complete;
			return true;
		});
	}, [tasks, filter]);

	return {
		tasks,
		filteredTasks,
		filter,
		setFilter,
		addTasks,
		updateTask,
		toggleTaskComplete,
		deleteTask,
	};
}

export const getDateClassName = (
	schedule: string | undefined,
	complete: boolean,
) => {
	return useMemo(() => {
		if (!schedule || complete) return "";
		const today = new Date();
		const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
		const taskDate = new Date(schedule);

		if (taskDate < todayMidnight) return "bg-red-500 text-white";
		if (taskDate.getTime() === todayMidnight.getTime())
			return "bg-yellow-500 text-white";
		return "";
	}, [schedule, complete]);
};
