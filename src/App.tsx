import { AboutAccordion } from "./components/parts/AboutAccordion";
import TaskMenu from "./components/parts/TaskMenu";

const tasks = [
	{
		id: 1,
		name: "リーダブルコードを読む",
		schedule: "2024-12-17",
		complete: false,
	},
	{
		id: 2,
		name: "新しいAPIのドキュメントを確認",
		schedule: "2024-12-16",
		complete: true,
	},
	{
		id: 3,
		name: "バグ修正を行う",
		schedule: "2024-12-20",
		complete: false,
	},
];

function App() {
	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-center text-3xl font-bold mt-8">Todo list</h1>
			<div className="w-full max-w-screen-lg px-8 mx-8 py-12">
				<TaskMenu tasks={tasks} />
				<AboutAccordion />
			</div>
		</div>
	);
}

export default App;
