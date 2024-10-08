import {
	Card,
	Avatar,
	Group,
	Badge,
	Text,
	Button,
	Title,
	Grid,
	SimpleGrid,
	TextInput,
	UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { userAccount } from "../../types";
import { useInRouterContext } from "react-router-dom";
import { ROUTER } from "../../main";
import DisplayCoolTextEditorContent from "./DisplayCoolTextEditorContent";

export default function Profile({
	user,
	with_link_type,
}: {
	user: userAccount;
	with_link_type?: "foundation" | "company";
}) {
	const guts = (
		<>
			<Card.Section
				p={"lg"}
				style={{
					minWidth: "400px",
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
						{user.type === "foundation" ? user.target : user.agenda}
					</Text>
				</div>
			</Card.Section>

			<Group justify="space-between" mb="xs">
				<Text fw={500}>
					{user.country} @ {user.city} - {user.email}
				</Text>
			</Group>

			<Group style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "baseline" }} mb={"xs"}>
				{(user.type === "company" ? [`interested in ${user.target}`, user.projects] : [user.projects]).map(
					(value) => (
						<Text key={value}>{value}</Text>
					)
				)}
			</Group>

			<DisplayCoolTextEditorContent content={user.description} />
		</>
	);

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			{with_link_type ? (
				<UnstyledButton
					onClick={() => {
						ROUTER.navigate(`/${with_link_type}/${user.id}`);
					}}
				>
					{guts}
				</UnstyledButton>
			) : (
				guts
			)}
		</Card>
	);
}
