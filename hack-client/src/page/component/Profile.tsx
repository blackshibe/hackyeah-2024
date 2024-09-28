import { Card, Avatar, Group, Badge, Text, Button, Title, Grid, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export default function Profile({ account_data }: { account_data: any }) {
	const [editing, set_editing] = useState(false);
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			description: account_data.description,
			email: account_data.email,
		},
	});

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<form>
				<Card.Section
					p={"lg"}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						gap: 16,
					}}
				>
					<Avatar alt="it's me" size={48} />
					<Title>Company name</Title>
				</Card.Section>

				<Group justify="space-between" mt="md" mb="xs">
					<Text fw={500}>Poland @ Gdynia - contact@email.com</Text>
					{editing ? (
						<TextInput placeholder="Tag" key={form.key("tag")} {...form.getInputProps("tag")} />
					) : (
						<Badge color="teal">GPT Tag</Badge>
					)}
				</Group>

				{editing ? (
					<TextInput
						placeholder="Description"
						key={form.key("description")}
						{...form.getInputProps("description")}
					/>
				) : (
					<Text size="sm" c="dimmed">
						Helping make the world a better place - GPT Description
					</Text>
				)}

				<SimpleGrid cols={2}>
					<Button color="blue" fullWidth mt="md" radius="md" onClick={() => set_editing(!editing)}>
						{!editing ? "Edit" : "Stop editing"}
					</Button>
					<Button
						color="blue"
						fullWidth
						mt="md"
						radius="md"
						onClick={() => {
							console.log(account_data);
						}}
					>
						Create profile
					</Button>
				</SimpleGrid>
			</form>
		</Card>
	);
}
