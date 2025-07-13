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

const RichTextEditor = ({ content = '', onChange, placeholder = 'Start writing...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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

  if (!editor) {
    return null;
  }

  const MenuButton = ({ icon, action, isActive = null, title }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={action}
      className={`p-1 ${isActive && isActive() ? 'text-primary-600 bg-primary-50' : ''}`}
      title={title}
    >
      <SafeIcon icon={icon} className="w-4 h-4" />
    </Button>
  );

  return (
    <div className="relative border border-gray-300 rounded-lg">
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <MenuButton
          icon={FiBold}
          action={() => editor.chain().focus().toggleBold().run()}
          isActive={() => editor.isActive('bold')}
          title="Bold"
        />
        <MenuButton
          icon={FiItalic}
          action={() => editor.chain().focus().toggleItalic().run()}
          isActive={() => editor.isActive('italic')}
          title="Italic"
        />
        <MenuButton
          icon={FiUnderline}
          action={() => editor.chain().focus().toggleUnderline().run()}
          isActive={() => editor.isActive('underline')}
          title="Underline"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <MenuButton
          icon={FiType}
          action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={() => editor.isActive('heading', { level: 2 })}
          title="Heading"
        />
        <MenuButton
          icon={FiList}
          action={() => editor.chain().focus().toggleBulletList().run()}
          isActive={() => editor.isActive('bulletList')}
          title="Bullet List"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <MenuButton
          icon={FiAlignLeft}
          action={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={() => editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        />
        <MenuButton
          icon={FiAlignCenter}
          action={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={() => editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        />
        <MenuButton
          icon={FiAlignRight}
          action={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={() => editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        />
        <MenuButton
          icon={FiAlignJustify}
          action={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={() => editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <MenuButton
          icon={FiLink}
          action={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          isActive={() => editor.isActive('link')}
          title="Add Link"
        />
        <MenuButton
          icon={FiCode}
          action={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={() => editor.isActive('codeBlock')}
          title="Code Block"
        />
        <MenuButton
          icon={FiGrid}
          action={() => editor.chain().focus().insertTable({
            rows: 3,
            cols: 3,
            withHeaderRow: true
          }).run()}
          title="Insert Table"
        />
      </div>

      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
      />

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center space-x-1 bg-white shadow-lg border border-gray-200 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'text-primary-600 bg-primary-50' : ''}
            >
              <SafeIcon icon={FiBold} className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'text-primary-600 bg-primary-50' : ''}
            >
              <SafeIcon icon={FiItalic} className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'text-primary-600 bg-primary-50' : ''}
            >
              <SafeIcon icon={FiUnderline} className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const url = window.prompt('Enter URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={editor.isActive('link') ? 'text-primary-600 bg-primary-50' : ''}
            >
              <SafeIcon icon={FiLink} className="w-4 h-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default RichTextEditor;