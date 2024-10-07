import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  SimpleUploadAdapter,
  SpecialCharacters,
  Strikethrough,
  TextTransformation,
  Underline,
  Undo,
  EditorConfig,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { Spin } from "antd";
import tokenMethod from "../../utils/tokenMethod";
import { ENV } from "../../constant/environments";

type EditorType = {
  handleChange: (arg1: string) => void;
  initialData: string;
  initialDataLoading: boolean;
  itemSlug?: string | number;
};

export default function Editor({
  handleChange,
  initialData = "",
  initialDataLoading = false,
  itemSlug = "",
}: EditorType) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    if (!itemSlug || initialData) {
      setIsLayoutReady(true);
    }

    return () => setIsLayoutReady(false);
  }, [initialData, itemSlug, initialDataLoading]);

  const editorConfig: EditorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertImage",
        "blockQuote",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      AutoImage,
      AutoLink,
      SimpleUploadAdapter,
      Autosave,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      SpecialCharacters,
      Strikethrough,
      TextTransformation,
      Underline,
      Undo,
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "resizeImage",
      ],
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    initialData: initialData,
    simpleUpload: {
      uploadUrl: `${ENV.BASE_URL}admin/uploads/ckeditor`,
      headers: { Authorization: `Bearer ${tokenMethod?.get()?.accessToken}` },
    },
    htmlSupport: {
      allowEmpty: ["img", "span", "i"],
      allow: [
        {
          name: "img",
          attributes: { key: "src", value: true },
          classes: true,
          styles: true,
        },
      ],
    },
    placeholder: "Type or paste your content here!",
  };
  const _onChange = (_: any, editor: ClassicEditor) => {
    handleChange(editor.data.get());
  };
  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef} className="min-h-[300px]">
              {isLayoutReady ? (
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  onChange={_onChange}
                />
              ) : (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                  <Spin className="z-10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
