import { Card, Title, SimpleGrid, TextInput, Text, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { foundationAccount, userAccount } from "../../types";
import CoolTextEditor from "./CoolTextEditor";

export default function CreateNGOForm({
	finish,
	account_data,
}: {
	account_data?: foundationAccount;
	finish: (account_data: foundationAccount) => void;
}) {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: account_data,
		validate: {
			city: (value) => {
				if (!value) return "City name is required";
				if (value.length < 3) return "City name is too short";
			},
			country: (value) => {
				if (!value) return "Country name is required";
				if (value.length < 3) return "Country name is too short";
			},
			email: (value) => {
				if (!value) return "Email is required";
				if (!value.includes("@")) return "Invalid email";
			},
			name: (value) => {
				if (!value) return "Name is required";
				if (value.length < 3) return "Name is too short";
			},
			projects: (value) => {
				if (!value) return "Projects are required";
				if (value.length < 3) return "Projects are too short";
			},
			target: (value) => {
				if (!value) return "Target is required";
				if (value.length < 3) return "Target is too short";
			},
			description: (value) => {
				if (!value) return "Description is required";
				if (value.length < 3) return "Description is too short";
			},
		},
	});

	return (
		<Card shadow="sm" padding={"lg"} radius="md" miw={"600px"} withBorder>
			<Title mb={"lg"} style={{ fontWeight: "normal" }}>
				Tell us more about your <span style={{ fontWeight: "bold" }}>NGO</span>
			</Title>

			<form>
				<SimpleGrid
					cols={2}
					style={{
						alignItems: "end",
					}}
				>
					<TextInput
						label="Organization name"
						placeholder="Name"
						required
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>
					<TextInput
						mt="md"
						placeholder="Email"
						label="Email"
						required
						key={form.key("email")}
						{...form.getInputProps("email")}
					/>
				</SimpleGrid>

				<SimpleGrid
					cols={2}
					style={{
						alignItems: "end",
					}}
				>
					<TextInput
						label="Country"
						placeholder="Country"
						required
						key={form.key("country")}
						{...form.getInputProps("country")}
					/>
					<TextInput
						mt="md"
						label="City"
						placeholder="City"
						required
						key={form.key("city")}
						{...form.getInputProps("city")}
					/>
				</SimpleGrid>

				<TextInput
					label="Your organization's target"
					placeholder="Target"
					key={form.key("target")}
					required
					mt={"sm"}
					{...form.getInputProps("target")}
				/>

				<TextInput
					label="Your previous projects"
					placeholder="Projects"
					required
					key={form.key("projects")}
					mt={"sm"}
					{...form.getInputProps("projects")}
				/>

				<Text mt={"md"}>Description</Text>
				<CoolTextEditor
					content={form.values.description}
					set_content={(content) => {
						form.setFieldValue("description", content);
					}}
				/>

				<Button
					mt={"lg"}
					onClick={() => {
						let valid = form.validate();
						if (valid.hasErrors) form.setErrors(valid.errors);
						else
							finish({
								...form.getValues(),
								type: "foundation",
							});
					}}
				>
					Submit
				</Button>
			</form>
		</Card>
	);
}
