import { ListTodo, Plus, Square, SquareCheck } from "lucide-react";
import { useTaskManager } from "../../hooks";
import type { TasksProp } from "../../types";
import { Button } from "../ui/button";
import { TaskDialog } from "./TaskDialog";
import TaskTable from "./TaskTable";

function TaskMenu({ tasks: initialTasks }: TasksProp) {
	const {
		filteredTasks,
		filter,
		setFilter,
		addTask,
		updateTask,
		toggleTaskDone,
		deleteTask,
	} = useTaskManager(initialTasks);

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
				<div className="space-x-4">
					<Button
						variant={filter === "all" ? "default" : "outline"}
						size="icon"
						onClick={() => setFilter("all")}
					>
						<ListTodo />
					</Button>
					<Button
						variant={filter === "completed" ? "default" : "outline"}
						size="icon"
						onClick={() => setFilter("completed")}
					>
						<SquareCheck />
					</Button>
					<Button
						variant={filter === "incomplete" ? "default" : "outline"}
						size="icon"
						onClick={() => setFilter("incomplete")}
					>
						<Square />
					</Button>
				</div>
			</div>
			<TaskTable
				tasks={filteredTasks} // フィルタリングされたタスクを表示
				onToggleTaskDone={toggleTaskDone}
				onDeleteTask={deleteTask}
				onUpdateTask={updateTask}
			/>
		</div>
	);
}

export default TaskMenu;
