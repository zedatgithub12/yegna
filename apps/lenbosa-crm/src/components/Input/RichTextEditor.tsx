"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import cn from "@yegna-systems/ui/cn";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { ErrorMessage } from "formik";
import { Text } from "../ui/typography";

const RichTextEditor = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  return (
    <div>
      <div className="flex p-1 border bg-white border-b-0 rounded-t-lg">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor?.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor?.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor?.isActive("underline") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <UnderlineIcon size={18} />
        </button>

        <div className="border-l border-gray-300 h-6 mx-2"></div>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor?.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor?.isActive("orderedList")
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <ListOrdered size={18} />
        </button>

        <div className="border-l border-gray-300 h-6 mx-2"></div>

        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded ${
            editor?.isActive({ textAlign: "left" })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded ${
            editor?.isActive({ textAlign: "center" })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded ${
            editor?.isActive({ textAlign: "right" })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <AlignRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded ${
            editor?.isActive({ textAlign: "justify" })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <AlignJustify size={18} />
        </button>
      </div>

      <EditorContent
        name="description"
        editor={editor}
        className={cn(className)}
      />
      <ErrorMessage name="description">
        {(msg) => <Text className="text-red-500">{msg}</Text>}
      </ErrorMessage>
    </div>
  );
};

export default RichTextEditor;
