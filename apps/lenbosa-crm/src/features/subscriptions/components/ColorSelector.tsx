"use state";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typography";
import { Title } from "@yegna-systems/ui/typography";
import { ErrorMessage, useFormikContext } from "formik";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PiPalette } from "react-icons/pi";

export default function ColorSelection({}) {
  const { values, setFieldValue } = useFormikContext<SubscriptionFormValues>();
  const [inputValue, setInputValue] = useState("");

  //eslint-disable-next-line
  const handleAddColor = (event: any) => {
    event.preventDefault();

    if (inputValue.trim() && !values.color.includes(inputValue)) {
      setFieldValue("color", [...values.color, inputValue.trim()]);
      setInputValue("");
    }

    document.getElementById("colorField")?.focus();
  };

  const handleRemoveColor = (colorToRemove: string) => {
    const filteredColors = values?.color?.filter(
      (color) => color !== colorToRemove
    );
    setFieldValue("color", filteredColors);
  };

  return (
    <div className="mt-6">
      <div>
        <Title as="h6" className="font-normal w-full mb-2">
          Subscription Plan Color
        </Title>
        <div className="grid grid-cols-5 md:grid-cols-5 gap-2">
          <Input
            name="color"
            id="colorField"
            type="text"
            variant="outline"
            size="lg"
            prefix={<PiPalette className="w-5 h-5 text-gray-500" />}
            className="flex-1 outline-none bg-transparent col-span-4"
            placeholder="Enter Color Codes"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" && handleAddColor(event)
            }
          />
          <Button
            type="button"
            name="submitButton"
            variant="outline"
            size="lg"
            color="primary"
            className="border px-4 py-2 rounded-lg border-primary text-sm transition gap-2 p-4 col-span-1 w-full "
            onClick={handleAddColor}
          >
            <Plus size={18} />{" "}
            <Text className="font-medium text-primary">{"Add Color"}</Text>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
          {values.color.map((color) => (
            <div
              key={color}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span
                className="w-3 h-3 rounded-full "
                style={{
                  backgroundColor: color ?? color,
                }}
              />
              <span>{color}</span>
              <button
                type="button"
                className="text-gray-600 hover:text-red-500 text-lg"
                onClick={() => handleRemoveColor(color)}
              >
                &times;
              </button>
            </div>
          ))}
          <ErrorMessage name="color">
            {(msg) => <Text className="text-red-500">{msg}</Text>}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
}
