import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/components/ui/accordion";
import { uiText } from "@/modules/data/ui-text";

const items = [
  {
    id: "item-1",
    value: "shipping",
    title: uiText.demo.accordion.shippingTitle,
    content: uiText.demo.accordion.shippingContent,
  },
  {
    id: "item-2",
    value: "returns",
    title: uiText.demo.accordion.returnsTitle,
    content: uiText.demo.accordion.returnsContent,
  },
  {
    id: "item-3",
    value: "support",
    title: uiText.demo.accordion.supportTitle,
    content: uiText.demo.accordion.supportContent,
  },
];

export default function AccordionDemo() {
  return (
    <div>
      <Accordion multiple defaultValue={["shipping"]} className="max-w-lg">
        {items.map((item) => (
          <AccordionItem value={item.value} key={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
