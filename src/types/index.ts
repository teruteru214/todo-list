export interface Task {
	id: number;
	name: string;
	schedule?: string;
	complete: boolean;
}

export interface TasksProp {
	tasks: Task[];
}
