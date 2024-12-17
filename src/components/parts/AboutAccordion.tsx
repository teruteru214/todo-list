import { Filter, Pencil, Plus, SquareCheckBigIcon, Trash2 } from "lucide-react";
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
						<Filter />
						<p>・・・Taskの絞り込み</p>
					</ul>
					<ul className="flex items-center">
						<SquareCheckBigIcon />
						<p>・・・Task完了時にチェック</p>
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
