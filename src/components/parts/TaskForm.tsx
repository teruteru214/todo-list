import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
	task: { id: number; name: string; schedule?: Date; complete: boolean };
	onTaskUpdate: (task: {
		id: number;
		name: string;
		schedule?: Date;
		complete: boolean;
	}) => void;
}

export function TaskForm({ task, onTaskUpdate }: TaskFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: task.name,
			schedule: task.schedule
				? format(new Date(task.schedule), "yyyy-MM-dd")
				: "",
			complete: task.complete,
		},
		resolver: zodResolver(formSchema),
	});

	const [date, setDate] = useState<Date | undefined>(
		task.schedule ? new Date(task.schedule) : undefined,
	);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const taskData = {
			id: task.id,
			name: data.name,
			schedule: data.schedule ? new Date(data.schedule) : undefined,
			complete: data.complete,
		};
		onTaskUpdate(taskData);
		form.reset();
		setDate(undefined);
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
						<FormItem className="flex flex-col">
							<FormLabel className="mb-1">実行予定日</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className={cn(
												"justify-start text-left font-normal",
												!date && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2" />
											{date ? (
												format(date, "yyyy/MM/dd")
											) : (
												<span>日にちを入力してください</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<Calendar
											mode="single"
											selected={date}
											onSelect={(selectedDate) => {
												setDate(selectedDate);
												field.onChange(
													selectedDate
														? format(selectedDate, "yyyy-MM-dd")
														: "",
												);
											}}
										/>
									</PopoverContent>
								</Popover>
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
				<Button
					type="submit"
					className="w-full"
					disabled={!form.formState.isValid}
				>
					更新する
				</Button>
			</form>
		</Form>
	);
}
