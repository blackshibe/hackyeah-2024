import { Card, Title, SimpleGrid, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { companyAccount, userAccount } from "../../types";

export default function CreateCompanyForm({
	finish,
	account_data,
}: {
	account_data?: companyAccount;
	finish: (account_data: companyAccount) => void;
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
			description: (value) => {
				if (!value) return "Description is required";
				if (value.length < 3) return "Description is too short";
			},
			target: (value) => {
				if (!value) return "Target is	 required";
				if (value.length < 3) return "Target is too short";
			},
			agenda: (value) => {
				if (!value) return "Agenda is required";
				if (value.length < 3) return "Agenda is too short";
			},
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
					mt="xs"
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
					mt="xs"
					label="City"
					placeholder="City"
					key={form.key("city")}
					required
					{...form.getInputProps("city")}
				/>
			</SimpleGrid>

			<TextInput
				label="Your organization's agenda"
				key={form.key("agenda")}
				mt={"xs"}
				required
				{...form.getInputProps("agenda")}
			/>

			<TextInput
				label="Who you're looking for"
				key={form.key("target")}
				mt={"xs"}
				required
				{...form.getInputProps("target")}
			/>

			<TextInput
				label="Your general description"
				key={form.key("description")}
				mt={"xs"}
				required
				{...form.getInputProps("description")}
			/>

			<Button
				mt={"xs"}
				onClick={() => {
					let valid = form.validate();
					if (valid.hasErrors) form.setErrors(valid.errors);
					else
						finish({
							...form.getValues(),
							type: "company",
						});
				}}
			>
				Submit
			</Button>
		</Card>
	);
}
