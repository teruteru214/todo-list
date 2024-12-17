import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../lib/utils";
import type { Task } from "../../types";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
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

interface TaskDialogProps {
	onTaskAdd: (task: Omit<Task, "id">) => void;
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
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: task?.name || "",
			schedule: task?.schedule
				? format(new Date(task.schedule), "yyyy-MM-dd")
				: "",
			complete: task?.done || false,
		},
		resolver: zodResolver(formSchema),
	});

	const [date, setDate] = React.useState<Date | undefined>(
		task?.schedule ? new Date(task.schedule) : undefined,
	);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (task) {
			onTaskUpdate?.({
				...task,
				name: data.name,
				schedule: data.schedule ? new Date(data.schedule) : undefined,
				done: data.complete || false,
			});
		} else {
			onTaskAdd({
				name: data.name,
				schedule: data.schedule ? new Date(data.schedule) : undefined,
				done: data.complete || false,
			});
		}
		form.reset();
		setDate(undefined);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]" key={task?.id || "new"}>
				<DialogHeader>
					<DialogTitle>
						{task ? "Taskを編集してください" : "Taskを記入してください"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
														format(date, "PPP")
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
						{!task && (
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
						)}
						<Button type="submit" className="w-full">
							{task ? "更新する" : "登録する"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}