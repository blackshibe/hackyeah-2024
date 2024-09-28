import { Card, Avatar, Group, Badge, Text, Button, Title, Grid, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { userAccount } from "../../types";

export default function Profile({ user }: { user: userAccount }) {
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
					<div>
						<Title>{user.name}</Title>
						<Text size="sm" c="dimmed">
							{user.type === "ngo" ? user.target : user.agenda}
						</Text>
					</div>
				</Card.Section>

				<Group justify="space-between" mb="xs">
					<Text fw={500}>
						{user.country} @ {user.city} - {user.email}
					</Text>
				</Group>

				<Group style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "baseline" }}>
					{(user.type === "company"
						? [`interested in ${user.target}`, user.projects, user.description]
						: [user.projects, user.description]
					).map((value) => (
						<Text>{value}</Text>
					))}
				</Group>
			</form>
		</Card>
	);
}
