import { useCallback, useMemo, useState } from "react";
import type { Task } from "../types";

export async function fetchTasks(): Promise<Task[]> {
	try {
		const response = await fetch(
			"https://todo-back-ffctg6fgh0aadsg8.eastasia-01.azurewebsites.net//api/tasks",
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch tasks: ${response.statusText}`);
		}
		const fetchedTasks: Task[] = await response.json();
		return fetchedTasks;
	} catch (error) {
		alert("タスクの取得に失敗しました。再試行してください。");
		console.error(error);
		throw error;
	}
}

export function useTaskManager(initialTasks: Task[]) {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
		"all",
	);

	const addTasks = useCallback(
		async (newTasks: Omit<Task, "id">[]) => {
			const previousTasks = [...tasks];

			const maxId =
				tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;

			const tempTasks = newTasks.map((task, index) => ({
				id: maxId + index + 1,
				...task,
			}));
			setTasks((prevTasks) => [...prevTasks, ...tempTasks]);

			try {
				const response = await fetch(
					"https://todo-back-ffctg6fgh0aadsg8.eastasia-01.azurewebsites.net//api/tasks/bulk-create",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newTasks),
					},
				);
				if (!response.ok) {
					throw new Error("Failed to add tasks.");
				}
			} catch (error) {
				alert("タスクの追加に失敗しました。");
				console.error(error);
				setTasks(previousTasks);
			}
		},
		[tasks],
	);

	const updateTask = useCallback(
		async (updatedTask: Task) => {
			const previousTasks = [...tasks];

			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === updatedTask.id ? updatedTask : task,
				),
			);

			try {
				const response = await fetch(
					`https://todo-back-ffctg6fgh0aadsg8.eastasia-01.azurewebsites.net//api/tasks/${updatedTask.id}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(updatedTask),
					},
				);
				if (!response.ok) {
					throw new Error("Failed to update task.");
				}
			} catch (error) {
				alert("タスクの更新に失敗しました。");
				console.error(error);
				setTasks(previousTasks);
			}
		},
		[tasks],
	);

	const toggleTaskComplete = useCallback(
		async (taskId: number) => {
			const previousTasks = [...tasks];

			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId ? { ...task, complete: !task.complete } : task,
				),
			);

			try {
				const response = await fetch(
					`https://todo-back-ffctg6fgh0aadsg8.eastasia-01.azurewebsites.net//api/tasks/${taskId}/toggle-complete`,
					{
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							complete: !previousTasks.find((task) => task.id === taskId)
								?.complete,
						}),
					},
				);
				if (!response.ok) {
					throw new Error("Failed to toggle task completion.");
				}
			} catch (error) {
				alert("タスクの完了状態の変更に失敗しました。");
				console.error(error);
				setTasks(previousTasks);
			}
		},
		[tasks],
	);

	const deleteTask = useCallback(
		async (taskId: number) => {
			const previousTasks = [...tasks];

			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

			try {
				const response = await fetch(
					`https://todo-back-ffctg6fgh0aadsg8.eastasia-01.azurewebsites.net//api/tasks/${taskId}`,
					{
						method: "DELETE",
					},
				);
				if (!response.ok) {
					throw new Error("Failed to delete task.");
				}
			} catch (error) {
				alert("タスクの削除に失敗しました。");
				console.error(error);
				setTasks(previousTasks);
			}
		},
		[tasks],
	);

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
