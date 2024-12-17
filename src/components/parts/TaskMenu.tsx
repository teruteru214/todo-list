import { Filter, Plus, X } from "lucide-react";
import { useState } from "react";
import { useTaskManager } from "../../hooks";
import type { TasksProp } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskDialog } from "./TaskDialog";
import TaskTable from "./TaskTable";

function TaskMenu({ tasks }: TasksProp) {
	const {
		tasks: filteredTasks,
		addTask,
		updateTask,
		toggleTaskDone,
		deleteTask,
		setFilter,
		filterText,
	} = useTaskManager(tasks);

	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

	return (
		<div className="p-4 rounded-lg shadow-lg">
			<div className="my-4 flex justify-between">
				<TaskDialog
					onTaskAdd={addTask}
					triggerElement={
						<Button variant="outline" size="icon">
							<Plus />
						</Button>
					}
				/>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setIsFilterVisible((prev) => !prev)}
				>
					{isFilterVisible ? <X /> : <Filter />}
				</Button>
			</div>
			{isFilterVisible && (
				<Input
					placeholder="Taskの絞り込みができます"
					className="my-4"
					value={filterText}
					onChange={(e) => setFilter(e.target.value)}
				/>
			)}
			<TaskTable
				tasks={filteredTasks}
				onToggleTaskDone={toggleTaskDone}
				onDeleteTask={deleteTask}
				onUpdateTask={updateTask}
			/>
		</div>
	);
}

export default TaskMenu;
