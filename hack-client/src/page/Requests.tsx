import { Center, Title, Text, Group, Card, Button } from "@mantine/core";
import { ROUTER } from "../main";

export default function Requests() {
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

			<Card w={"100%"}>
				<Title mb={"xl"}>Filter</Title>

				<Button onClick={() => ROUTER.navigate("/create-offer")}>Post offer</Button>
			</Card>
		</Group>
	);
}
