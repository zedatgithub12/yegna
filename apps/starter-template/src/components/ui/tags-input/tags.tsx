import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { Text, Title } from "../typography";
import { Input } from "../input";
import { Button } from "../button";
import { ErrorMessage } from "formik";

type TagsInputProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagsInput = ({
  title,
  description,
  buttonLabel,
  tags,
  setTags,
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  //eslint-disable-next-line
  const handleAddTag = (event: any) => {
    event.preventDefault();

    if (inputValue.trim() && !tags.includes(inputValue)) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }

    document.getElementById("inputField")?.focus();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 p-2 justify-between w-full my-4">
      <div className="col-span-4 ">
        <Title as="h6" className="font-medium">
          {title ? title : "Tags"}
        </Title>
        <Text as="p" className="text-gray-400 text-sm mt-0.5 font-normal">
          {description ? description : "Add tags here"}
        </Text>
      </div>
      <div className="col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <Input
            name="tagsTextField"
            id="inputField"
            type="text"
            variant="outline"
            size="lg"
            prefix={<Tag className="w-5 h-5 text-gray-500" />}
            className="flex-1 outline-none bg-transparent col-span-2"
            placeholder="Enter Tag"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleAddTag(event)}
          />
          <Button
            name="submitButton"
            variant="outline"
            size="lg"
            color="primary"
            className="border px-4 py-2 rounded-lg border-primary text-sm transition gap-2 p-4 col-span-1 w-full "
            onClick={handleAddTag}
          >
            <Plus size={18} />{" "}
            <Text className="font-medium text-primary">
              {buttonLabel ? buttonLabel : "Add More Tag"}
            </Text>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{tag}</span>
              <button
                className="text-gray-600 hover:text-red-500 text-lg"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </div>
          ))}
          <ErrorMessage name="tags">
            {(msg) => <Text className="text-red-500">{msg}</Text>}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
