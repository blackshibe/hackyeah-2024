import {
	Center,
	Title,
	Text,
	Group,
	List,
	Grid,
	SimpleGrid,
	Tabs,
	Avatar,
	Card,
	Rating,
	Box,
	Button,
	Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { foundationAccount, rating } from "../types";
import { useParams } from "react-router-dom";
import { CommentEditArea } from "./component/CommentEditArea";

export default function ViewFoundation() {
	const [user, set_user] = useState<foundationAccount | undefined>(undefined);
	const [comments, set_comments] = useState<rating[]>([]);

	const params = useParams();

	useEffect(() => {
		fetch(`http://localhost:3000/foundation/${params.id}`).then((response) => {
			response.json().then((data) => {
				set_user(data);
			});
		});

		fetch(`http://localhost:3000/rating/foundation/${params.id}`).then((response) => {
			response.json().then((data) => {
				set_comments(data);
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
						alignItems: "baseline",
						flexDirection: "column",
						gap: 16,
					}}
				>
					<Avatar alt="it's me" size={200} />
					<Box style={{}}>
						<Title>{user.name}</Title>
						<Text>{user.target}</Text>
						<Text size="sm" c="dimmed">
							{user.email}
						</Text>
					</Box>

					<Group>
						<Rating readOnly value={user.averageRating} />
					</Group>

					<Group style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "baseline" }}>
						{[user.projects, user.description].map((value) => (
							<Text>{value}</Text>
						))}
					</Group>
				</Group>
			</Card>

			<Group style={{ alignContent: "baseline" }}>
				<CommentEditArea id={user.id} type="foundation" />
				{comments.length > 0 ? (
					comments.map((value) => (
						<Card withBorder w={"100%"} key={value.authorName}>
							<Box style={{ gap: 8, flexDirection: "row", alignItems: "center", display: "flex" }}>
								<Avatar />
								<Text>{value.authorName}</Text>
							</Box>
							<Box mt={"sm"}>
								<Rating value={Math.max(value.rate, 1)} readOnly />
								{value.message}
							</Box>
						</Card>
					))
				) : (
					<Text>No comments yet...</Text>
				)}
			</Group>
		</SimpleGrid>
	);
}
