import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";

const formSchema = z.object({
	tasks: z.array(
		z.object({
			name: z
				.string()
				.min(1, "Task名は必須です")
				.max(100, "100文字以内で入力してください"),
			schedule: z.string().optional(), // scheduleをstring型に変更
			complete: z.boolean().optional().default(false),
		}),
	),
});

interface AddTasksFormProps {
	onTasksAdd: (
		tasks: { name: string; schedule?: string; complete: boolean }[],
	) => void;
}

export function AddTasksForm({ onTasksAdd }: AddTasksFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			tasks: [{ name: "", schedule: "", complete: false }],
		},
		resolver: zodResolver(formSchema),
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "tasks",
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const tasks = data.tasks.map((task) => ({
			name: task.name,
			schedule: task.schedule || undefined,
			complete: task.complete,
		}));
		onTasksAdd(tasks);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<div className="flex justify-between mb-4">
					<Button
						variant="outline"
						type="button"
						onClick={() => append({ name: "", schedule: "", complete: false })}
					>
						<Plus className="mr-2" />
						NEW
					</Button>
					<Button type="submit" disabled={!form.formState.isValid}>
						保存する
					</Button>
				</div>
				<Table className="w-full border-collapse border border-gray-200">
					<thead className="bg-gray-100">
						<TableRow>
							<TableHead className="w-8/12">Task</TableHead>
							<TableHead className="w-2/12">Schedule</TableHead>
							<TableHead className="w-1/12">Complete?</TableHead>
							<TableHead className="w-1/12">Delete</TableHead>
						</TableRow>
					</thead>
					<TableBody>
						{fields.map((field, index) => (
							<TableRow key={field.id} className="hover:bg-gray-50">
								<TableCell className="w-8/12">
									<FormField
										control={form.control}
										name={`tasks.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="taskを入力"
														{...field}
														className="text-sm"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</TableCell>
								<TableCell className="w-2/12">
									<FormField
										control={form.control}
										name={`tasks.${index}.schedule`}
										render={({ field }) => (
											<FormItem>
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
								</TableCell>
								<TableCell className="text-center">
									<FormField
										control={form.control}
										name={`tasks.${index}.complete`}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</TableCell>
								<TableCell className="text-center">
									<Button
										variant="outline"
										size="icon"
										type="button"
										onClick={() => remove(index)}
									>
										<X />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</form>
		</Form>
	);
}
