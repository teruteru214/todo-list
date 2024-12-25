import { useEffect, useState } from "react";

import { AboutAccordion } from "./components/parts/AboutAccordion";
import TaskMenu from "./components/parts/TaskMenu";
import { fetchTasks } from "./hooks";
import type { Task } from "./types";

function App() {
	const [tasks, setTasks] = useState<Task[]>([]); //Task初期値の保持のみに使用。
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadTasks = async () => {
			try {
				const fetchedTasks = await fetchTasks();
				setTasks(fetchedTasks);
			} catch {
				alert("初期タスクの取得に失敗しました。");
			} finally {
				setIsLoading(false);
			}
		};

		loadTasks();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-center text-3xl font-bold mt-8">Todo list</h1>
			<div className="w-full max-w-screen-lg px-8 mx-8 py-12">
				{isLoading ? (
					<div className="flex justify-center my-48" aria-label="読み込み中">
						<div className="animate-spin h-10 w-10 border-4 border-black rounded-full border-t-transparent" />
					</div>
				) : (
					<TaskMenu tasks={tasks} />
				)}
				<AboutAccordion />
			</div>
		</div>
	);
}

export default App;
