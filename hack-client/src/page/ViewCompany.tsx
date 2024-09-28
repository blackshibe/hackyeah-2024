import { Center, Title, Text, Group, List, Grid, SimpleGrid, Tabs, Avatar, Card, Rating, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { foundationAccount, userAccount } from "../types";
import { useParams } from "react-router-dom";

export default function ViewCompany() {
	const [user, set_user] = useState<foundationAccount | undefined>(undefined);
	const params = useParams();

	useEffect(() => {
		fetch(`http://localhost:3000/company/${params.id}`).then((response) => {
			response.json().then((data) => {
				set_user(data);
			});
		});
	}, []);

	if (!user) return <div />;

	return (
		<SimpleGrid style={{ maxWidth: "900px", margin: "auto" }} cols={2}>
			<Card withBorder>
				<Group
					p={"sm"}
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 16,
					}}
				>
					<Avatar alt="it's me" size={200} />
					<Box style={{}}>
						<Title>{user.name}</Title>
						<Text>{user.email}</Text>
					</Box>

					<Group style={{}}>
						<Rating readOnly value={2} />
						<Text size="sm" c="dimmed">
							{user.target}
						</Text>
					</Group>

					<Group style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "baseline" }}>
						{[user.projects, user.description].map((value) => (
							<Text>{value}</Text>
						))}
					</Group>
				</Group>
			</Card>

			<Group style={{ alignContent: "baseline" }}>
				<Card withBorder w={"100%"}>
					<Text opacity={"50%"}>Name - piss@mail.com</Text>
					<Text>They suck. Seriously, christ</Text>
				</Card>
				<Card withBorder w={"100%"}>
					<Text opacity={"50%"}>Name - piss@mail.com</Text>
					<Text>They suck. Seriously, christ</Text>
				</Card>
			</Group>
		</SimpleGrid>
	);
}
