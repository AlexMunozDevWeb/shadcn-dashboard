import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  { 
    id: "item-1",
    value: "shipping", 
    title: "What are your shipping options?", 
    content: "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders." 
  },
  { 
    id: "item-2",
    value: "returns",
    title: "What is your return policy?",
    content: "Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7 business days." 
  },
  { 
    id: "item-3",
    value: "support",
    title: "How can I contact customer support?",
    content: "Reach us via email, live chat, or phone. We respond within 24 hours during business days."
  }, 
]

export default function AccordionDemo() {
  return (
    <div>
      <Accordion multiple defaultValue={["shipping"]} className="max-w-lg">
        {
          items.map((item) => (
            <AccordionItem value={item.value} key={item.id}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          )) 
        }
      </Accordion>
    </div>
  )
}
