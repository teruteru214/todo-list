import { Pencil, Trash2 } from "lucide-react";
import { memo } from "react";
import type { Task } from "../../types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { TaskDialog } from "./TaskDialog";

interface TaskTableProps {
	tasks: Task[];
	onToggleTaskComplete: (taskId: number) => void;
	onDeleteTask: (taskId: number) => void;
	onUpdateTask: (task: Task) => void;
}

function TaskTable({
	tasks,
	onToggleTaskComplete,
	onDeleteTask,
	onUpdateTask,
}: TaskTableProps) {
	return tasks.length > 0 ? (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/12 text-left">Complete?</TableHead>
					<TableHead className="w-8/12 text-left">Task</TableHead>
					<TableHead className="w-1/12 text-center">Schedule</TableHead>
					<TableHead className="w-1/12 text-center">Edit</TableHead>
					<TableHead className="w-1/12 text-center">Delete</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{tasks.map((task) => (
					<TableRow key={task.id}>
						<TableCell className="text-left">
							<Checkbox
								checked={task.complete}
								onCheckedChange={() => onToggleTaskComplete(task.id)}
							/>
						</TableCell>
						<TableCell
							className={`text-left ${
								task.complete ? "line-through text-gray-400" : ""
							}`}
						>
							{task.name}
						</TableCell>
						<TableCell
							className={`text-center ${
								!task.complete && task.schedule
									? (
											() => {
												const today = new Date();
												const todayMidnight = new Date(
													today.setHours(0, 0, 0, 0),
												);
												const taskDate = new Date(task.schedule);

												if (taskDate < todayMidnight)
													return "bg-red-500 text-white";
												if (taskDate.getTime() === todayMidnight.getTime())
													return "bg-yellow-500 text-white";
												return "";
											}
										)()
									: ""
							}`}
						>
							{task.schedule
								? new Date(task.schedule).toLocaleDateString()
								: "未設定"}
						</TableCell>
						<TableCell className="text-center">
							<TaskDialog
								onTaskUpdate={onUpdateTask}
								triggerElement={
									<Button variant="outline" size="icon">
										<Pencil />
									</Button>
								}
								task={task}
							/>
						</TableCell>
						<TableCell className="text-center">
							<Button
								variant="outline"
								size="icon"
								onClick={() => onDeleteTask(task.id)}
							>
								<Trash2 />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<div className="flex flex-col items-center justify-center h-64">
			<img src="/cat.webp" alt="Empty" className="w-64 h-64" />
			<p className="-mt-10 mb-20">タスクがありません...</p>
		</div>
	);
}

export default memo(TaskTable);
