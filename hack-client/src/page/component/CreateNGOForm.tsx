import { Card, Title, SimpleGrid, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useColorScheme } from "@mantine/hooks";

export default function CreateNGOForm({ finish }: { finish: (account_data: object) => void }) {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
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

				<Button
					mt={"lg"}
					onClick={() => {
						finish(form.getValues());
					}}
				>
					Submit
				</Button>
			</form>
		</Card>
	);
}
