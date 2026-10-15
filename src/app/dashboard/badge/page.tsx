import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex gap-4">
      <Badge variant="default">Badge</Badge>
      <Badge variant="destructive">Badge</Badge>
      <Badge variant="secondary">Badge</Badge>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="info">Badge</Badge>
      <Badge variant="success">Badge</Badge>
    </div>
  );
}