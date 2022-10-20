import {
  IconBold,
  IconCode,
  IconH1,
  IconH2,
  IconItalic,
  IconLink,
  IconList,
  IconListNumbers,
  IconPrompt,
  IconQuote,
  IconSeparator,
  IconStrikethrough,
} from "@tabler/icons";
import { Editor } from "@tiptap/react";
import { useCallback } from "react";

interface IMenubarProp {
  editor: Editor;
}

export default function Menubar({ editor }: IMenubarProp) {
  const getFocus = () => editor.chain().focus();
  const isActive = (type: string, options?: any) => {
    return editor.isActive(type, options ?? {}) ? "text-lime-500" : "";
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      getFocus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    getFocus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  const menus = [
    [
      {
        icon: IconBold,
        onClick: () => getFocus().toggleBold().run(),
        isActive: isActive("bold"),
      },
      {
        icon: IconItalic,
        onClick: () => getFocus().toggleItalic().run(),
        isActive: isActive("italic"),
      },
      {
        icon: IconStrikethrough,
        onClick: () => getFocus().toggleStrike().run(),
        isActive: isActive("strike"),
      },
      {
        icon: IconCode,
        onClick: () => getFocus().toggleCode().run(),
        isActive: isActive("code"),
      },
    ],
    [
      {
        icon: IconH1,
        onClick: () => getFocus().toggleHeading({ level: 1 }).run(),
        isActive: isActive("heading", { level: 1 }),
      },
      {
        icon: IconH2,
        onClick: () => getFocus().toggleHeading({ level: 2 }).run(),
        isActive: isActive("heading", { level: 2 }),
      },
      {
        icon: IconList,
        onClick: () => getFocus().toggleBulletList().run(),
        isActive: isActive("bulletList"),
      },
      {
        icon: IconListNumbers,
        onClick: () => getFocus().toggleOrderedList().run(),
        isActive: isActive("orderedList"),
      },
      {
        icon: IconPrompt,
        onClick: () => getFocus().toggleCodeBlock().run(),
        isActive: isActive("codeBlock"),
      },
    ],
    [
      {
        icon: IconQuote,
        onClick: () => getFocus().toggleBlockquote().run(),
        isActive: isActive("blockquote"),
      },
      {
        icon: IconSeparator,
        onClick: () => getFocus().setHorizontalRule().run(),
      },
      {
        icon: IconLink,
        onClick: setLink,
        isActive: isActive("link")
      }
    ],
  ];

  return (
    <div className="flex flex-col gap-2">
      {menus.map((group) => {
        return (
          <div className="flex">
            {group.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  className={`gap-2 px-2 py-1 bg-slate-50/80 border border-l-0 first:rounded-l-lg last:rounded-r-lg first:border-l ${item.isActive}`}
                  onClick={item.onClick}
                >
                  <Icon size={18} stroke={1.5} />{" "}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
