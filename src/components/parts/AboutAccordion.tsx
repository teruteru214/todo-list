import {
	ListTodo,
	Pencil,
	Plus,
	Square,
	SquareCheck,
	Trash2,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

export function AboutAccordion() {
	return (
		<Accordion type="single" collapsible className="w-full mt-4">
			<AccordionItem value="item-1">
				<AccordionTrigger>使い方</AccordionTrigger>
				<AccordionContent className="space-y-4">
					<ul className="flex items-center">
						<Plus />
						<p>・・・Taskの作成</p>
					</ul>
					<ul className="flex items-center">
						<ListTodo />
						<p>・・・Task(全件)の表示</p>
					</ul>
					<ul className="flex items-center">
						<SquareCheck />
						<p>・・・Task(完了)の表示</p>
					</ul>
					<ul className="flex items-center">
						<Square />
						<p>・・・Task(未完了)の表示</p>
					</ul>
					<ul className="flex items-center">
						<Pencil />
						<p>・・・Taskの編集</p>
					</ul>
					<ul className="flex items-center">
						<Trash2 />
						<p>・・・Taskの削除</p>
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
