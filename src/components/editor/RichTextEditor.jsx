import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Typography from '@tiptap/extension-typography';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../ui/Button';

const {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiCode,
  FiGrid,
  FiTrash2,
  FiType,
  FiImage,
  FiPaperclip,
  FiPlus,
  FiMinus,
} = FiIcons;

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  return (
    <div className="border-b border-gray-200 p-2 bg-white sticky top-0 z-10 flex flex-wrap gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiBold} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiItalic} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiUnderline} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-100' : ''}
      >
        H1
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''}
      >
        H2
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-100' : ''}
      >
        H3
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiList} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiAlignLeft} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiAlignCenter} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiAlignRight} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiAlignJustify} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiCode} />
      </Button>
      <Button variant="outline" size="sm" onClick={addTable}>
        <SafeIcon icon={FiGrid} />
      </Button>
      <Button variant="outline" size="sm" onClick={addImage}>
        <SafeIcon icon={FiImage} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const url = window.prompt('Enter the link URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive('link') ? 'bg-gray-100' : ''}
      >
        <SafeIcon icon={FiLink} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
      >
        Undo
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
      >
        Redo
      </Button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Typography,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[500px] focus:outline-none"
      />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-1 flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-gray-100' : ''}
            >
              <SafeIcon icon={FiBold} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-gray-100' : ''}
            >
              <SafeIcon icon={FiItalic} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'bg-gray-100' : ''}
            >
              <SafeIcon icon={FiUnderline} />
            </Button>
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-1 flex flex-col gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-100' : ''}
            >
              Heading 1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''}
            >
              Heading 2
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'bg-gray-100' : ''}
            >
              Bullet List
            </Button>
          </div>
        </FloatingMenu>
      )}
    </div>
  );
};

export default RichTextEditor;