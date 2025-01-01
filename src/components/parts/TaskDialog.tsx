import type { Task } from "../../types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { AddTasksForm } from "./AddTasksForm";
import { TaskForm } from "./TaskForm";

interface TaskDialogProps {
	onTasksAdd?: (
		tasks: { name: string; schedule?: string; complete: boolean }[],
	) => void;
	onTaskUpdate?: (task: Task) => void;
	triggerElement: React.ReactNode;
	task?: Task;
}

export function TaskDialog({
	onTasksAdd,
	onTaskUpdate,
	triggerElement,
	task,
}: TaskDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent className="sm:max-w-[900px]" key={task?.id || "new"}>
				{task && onTaskUpdate && (
					<>
						<DialogHeader>
							<DialogTitle>Taskの編集</DialogTitle>
						</DialogHeader>
						<TaskForm
							task={task}
							onTaskUpdate={onTaskUpdate}
							onClose={() =>
								document.activeElement?.dispatchEvent(
									new MouseEvent("click", { bubbles: true }),
								)
							}
						/>
					</>
				)}
				{onTasksAdd && <AddTasksForm onTasksAdd={onTasksAdd} />}
			</DialogContent>
		</Dialog>
	);
}
