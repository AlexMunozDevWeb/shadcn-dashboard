import LoginForm from "./login";
import FormRhfRadioGroup from "./radio-group";
import FormRhfSwitch from "./switch";
import FormDatePicker from "./date-picker";

export default function FormPage() {
  return (
    <div className="flex flex-col gap-6">
      <LoginForm />
      <FormRhfRadioGroup />
      <FormRhfSwitch />
      <FormDatePicker />
    </div>
  );
}
