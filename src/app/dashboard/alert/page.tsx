import { CheckIcon, RocketIcon, InfoIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/modules/components/ui/alert";
import { uiText } from "@/modules/data/ui-text";

export default function PageDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <RocketIcon />
        <AlertTitle>{uiText.demo.alert.paymentSuccessful}</AlertTitle>
        <AlertDescription>
          {uiText.demo.alert.paymentDescription}
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <InfoIcon />
        <AlertTitle>{uiText.demo.alert.featureAvailable}</AlertTitle>
        <AlertDescription>
          {uiText.demo.alert.featureDescription}
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckIcon />
        <AlertTitle>{uiText.demo.alert.success}</AlertTitle>
        <AlertDescription>
          {uiText.demo.alert.featureDescription}
        </AlertDescription>
      </Alert>
    </div>
  );
}
