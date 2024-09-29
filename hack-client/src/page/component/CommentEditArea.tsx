import { Card, Textarea, Group, Rating, Button } from "@mantine/core";
import { useState } from "react";
import useSession from "../hook/useSession";

export function CommentEditArea({ id, type }: { id: number; type: "foundation" | "company" }) {
	const [rating, set_rating] = useState(5);
	const [comment, set_comment] = useState("");
	const session = useSession();

	if (!session)
		return (
			<Card withBorder w={"100%"}>
				You must log in to leave comments
			</Card>
		);

	return (
		<Card withBorder w={"100%"}>
			<Textarea placeholder="Comment" value={comment} onChange={(event) => set_comment(event.target.value)} />
			<Group p={0} gap={"xs"}>
				<Rating defaultValue={rating} onChange={set_rating} />
				rating
			</Group>
			<Button
				mt={"xs"}
				onClick={() => {
					fetch("http://localhost:3000/rating/add", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							rate: rating,
							message: comment,
							CompanyId: type === "company" ? id : undefined,
							FoundationId: type === "foundation" ? id : undefined,
						}),
					}).then(() => {
						window.location.reload();
					});
				}}
			>
				Post...
			</Button>
		</Card>
	);
}
