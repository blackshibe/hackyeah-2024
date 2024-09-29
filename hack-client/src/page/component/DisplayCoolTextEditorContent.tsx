import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function DisplayCoolTextEditorContent({ content }: { content: string }) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		editable: false,
	});

	return (
		<RichTextEditor editor={editor} style={{ border: 0 }} w={"100%"}>
			<RichTextEditor.Content />
		</RichTextEditor>
	);
}
