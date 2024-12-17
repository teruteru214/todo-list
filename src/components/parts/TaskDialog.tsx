import type { Task } from "../../types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { TaskForm } from "./TaskForm";

interface TaskDialogProps {
	onTaskAdd: (task: { name: string; schedule?: Date; done: boolean }) => void;
	onTaskUpdate?: (task: Task) => void;
	triggerElement: React.ReactNode;
	task?: Task;
}

export function TaskDialog({
	onTaskAdd,
	onTaskUpdate,
	triggerElement,
	task,
}: TaskDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]" key={task?.id || "new"}>
				<DialogHeader>
					<DialogTitle>
						{task ? "Taskを編集できます" : "Taskの作成ができます"}
					</DialogTitle>
				</DialogHeader>
				<TaskForm
					task={task}
					onTaskAdd={onTaskAdd}
					onTaskUpdate={onTaskUpdate}
				/>
			</DialogContent>
		</Dialog>
	);
}
