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
	LoadingOverlay,
	ScrollArea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { foundationAccount, fundingRequest, rating } from "../types";
import { useParams } from "react-router-dom";
import { CommentEditArea } from "./component/CommentEditArea";
import DisplayCoolTextEditorContent from "./component/DisplayCoolTextEditorContent";

export default function ViewFoundation() {
	const [user, set_user] = useState<foundationAccount | undefined>(undefined);
	const [comments, set_comments] = useState<rating[]>([]);
	const [loading, set_loading_visible] = useState(true);
	let [requests, set_requests] = useState<fundingRequest[]>([]);
	const avg_rating = comments.reduce((acc, value) => acc + value.rate, 0) / comments.length;

	const params = useParams();

	useEffect(() => {
		fetch(`/api/fundingRequest/${params.id}`)
			.then((res) => res.json())
			.then((data) => {
				set_requests(data);
				set_loading_visible(false);
			});

		fetch(`/api/foundation/${params.id}`).then((response) => {
			response.json().then((data) => {
				set_user(data);
				set_loading_visible(false);
			});
		});

		fetch(`/api/rating/foundation/${params.id}`).then((response) => {
			response.json().then((data) => {
				set_comments(data);
			});
		});
	}, []);

	if (!user) return <div />;

	return (
		<>
			<SimpleGrid style={{ maxWidth: "900px", margin: "auto" }} cols={2}>
				<LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

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
							<Rating readOnly value={avg_rating} />
						</Group>

						<Group style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "baseline" }}>
							{[user.projects].map((value) => (
								<Text>{value}</Text>
							))}
						</Group>
					</Group>

					<DisplayCoolTextEditorContent content={user.description} />
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
			<SimpleGrid style={{ maxWidth: "900px", margin: "auto" }} mt={"lg"}>
				{requests.map((request) => (
					<Card withBorder w={"100%"}>
						<ScrollArea h={"100%"}>
							<Title>{request.title}</Title>
							<Text mb={"xl"}>{request.target}</Text>
							<DisplayCoolTextEditorContent content={request.description} />
						</ScrollArea>
					</Card>
				))}
			</SimpleGrid>
		</>
	);
}
