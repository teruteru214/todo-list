export interface Task {
	id: number;
	done: boolean;
	name: string;
	schedule?: Date;
}

export interface TasksProp {
	tasks: Task[];
}
