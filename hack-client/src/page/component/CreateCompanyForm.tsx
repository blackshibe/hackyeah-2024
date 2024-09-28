import { Card, Title, SimpleGrid, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function CreateCompanyForm({ finish }: { finish: (account_data: object) => void }) {
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
				Tell us more about your <span style={{ fontWeight: "bold" }}>Company</span>
			</Title>
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
					key={form.key("email")}
					required
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
					key={form.key("country")}
					required
					{...form.getInputProps("country")}
				/>
				<TextInput
					mt="md"
					label="City"
					placeholder="City"
					key={form.key("city")}
					required
					{...form.getInputProps("city")}
				/>
			</SimpleGrid>

			<TextInput
				label="Your organization's target"
				placeholder="Target"
				key={form.key("target")}
				mt={"sm"}
				required
				{...form.getInputProps("target")}
			/>

			<Button mt={"lg"}>Submit</Button>
		</Card>
	);
}
