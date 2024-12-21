export interface Task {
	id: number;
	name: string;
	schedule?: Date;
	complete: boolean;
}

export interface TasksProp {
	tasks: Task[];
}
