import { Card, Title, SimpleGrid, TextInput, Button, Textarea, ScrollArea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { companyAccount, fundingRequest, userAccount } from "../../types";
import CoolTextEditor from "./CoolTextEditor";

export default function CreateRequestForm({
	finish,
	form_data: account_data,
}: {
	form_data?: fundingRequest;
	finish: (form_data: fundingRequest) => void;
}) {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: account_data,
		validate: {
			target: (value) => {
				if (!value) return "Target is required";
				if (value.length < 3) return "Target is too short";
			},
			title: (value) => {
				if (!value) return "Title is required";
				if (value.length < 3) return "Title is too short";
			},
		},
	});

	return (
		<Card shadow="sm" padding={"lg"} radius="md" miw={"600px"} withBorder>
			<ScrollArea h={"100%"}>
				<Title mb={"lg"} style={{ fontWeight: "normal" }}>
					Tell us about your <span style={{ fontWeight: "bold" }}>request</span>
				</Title>

				<TextInput
					label="Target title"
					placeholder="Title"
					required
					key={form.key("title")}
					mb={"xs"}
					{...form.getInputProps("title")}
				/>

				<TextInput
					label="Target"
					placeholder="Target"
					key={form.key("target")}
					required
					mb={"xs"}
					{...form.getInputProps("target")}
				/>

				<CoolTextEditor
					content={form.values.description}
					set_content={(content) => {
						form.setFieldValue("description", content);
					}}
				/>

				<Button
					mt={"xs"}
					onClick={() => {
						let valid = form.validate();
						if (valid.hasErrors) form.setErrors(valid.errors);
						else finish(form.getValues());
					}}
				>
					Submit
				</Button>
			</ScrollArea>
		</Card>
	);
}
