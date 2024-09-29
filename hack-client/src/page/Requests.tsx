import { Center, Title, Text, Group, Card, Button, Divider } from "@mantine/core";
import { ROUTER } from "../main";
import useSession from "./hook/useSession";
import { useEffect, useState } from "react";
import { fundingRequest } from "../types";

export default function Requests() {
	const session = useSession();
	const [requests, set_requests] = useState<fundingRequest[]>([]);

	useEffect(() => {
		fetch("http://localhost:3000/funding-request")
			.then((res) => res.json())
			.then((data) => {
				set_requests(data);
			});
	});

	return (
		<Group
			style={{
				maxWidth: "900px",
				height: "65vh",
				margin: "auto",
				position: "relative",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Title>Financing Requests</Title>

			{session?.type === "foundation" && (
				<Button onClick={() => ROUTER.navigate("/create-offer")}>Create new offer</Button>
			)}

			<Divider orientation="horizontal" w={"100%"} />
		</Group>
	);
}
