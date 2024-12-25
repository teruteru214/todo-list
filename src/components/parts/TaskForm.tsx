import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogClose } from "../ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
	name: z
		.string()
		.min(1, "Task名は必須です")
		.max(100, "100文字以内で入力してください"),
	schedule: z.string().optional(),
	complete: z.boolean().optional().default(false),
});

interface TaskFormProps {
	task: { id: number; name: string; schedule?: string; complete: boolean };
	onTaskUpdate: (task: {
		id: number;
		name: string;
		schedule?: string;
		complete: boolean;
	}) => void;
	onClose: () => void;
}

export function TaskForm({ task, onTaskUpdate, onClose }: TaskFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: task.name,
			schedule: task.schedule || "",
			complete: task.complete,
		},
		resolver: zodResolver(formSchema),
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const taskData = {
			id: task.id,
			name: data.name,
			schedule: data.schedule || undefined,
			complete: data.complete,
		};
		onTaskUpdate(taskData);
		form.reset();
		onClose();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Task名</FormLabel>
							<FormControl>
								<Textarea placeholder="task名を決めてください" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="schedule"
					render={({ field }) => (
						<FormItem className="flex flex-col w-36">
							<FormLabel className="mb-1">実行予定日</FormLabel>
							<FormControl>
								<Input
									type="date"
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="complete"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="mb-1">
								Taskが完了済みの場合はチェックを入れてください
							</FormLabel>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogClose asChild>
					<Button
						type="submit"
						className="w-full"
						disabled={!form.formState.isValid}
					>
						更新する
					</Button>
				</DialogClose>
			</form>
		</Form>
	);
}
