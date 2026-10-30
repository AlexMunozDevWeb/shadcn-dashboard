"use client";
import { Badge } from "@/modules/components//ui/badge";
import { Checkbox } from "@/modules/components//ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/modules/components//ui/field";
import { useState } from "react";
import { uiText } from "@/modules/data/ui-text";

export default function CheckboxGroup() {
  const [terms, setTermns] = useState(true);
  return (
    <FieldSet>
      <FieldLegend variant="label">{uiText.demo.checkbox.legend}</FieldLegend>
      <FieldDescription>{uiText.demo.checkbox.description}</FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-hard-disks-ljj-checkbox"
            name="finder-pref-9k2-hard-disks-ljj-checkbox"
            onCheckedChange={(value: boolean) => setTermns(value)}
            defaultChecked
          />
          <FieldLabel
            htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
            className="font-normal"
          >
            {uiText.demo.checkbox.hardDisks}
          </FieldLabel>
        </Field>
        {terms ? (
          <Badge>{uiText.demo.checkbox.great}</Badge>
        ) : (
          <Badge variant="destructive">{uiText.demo.checkbox.warning}</Badge>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
