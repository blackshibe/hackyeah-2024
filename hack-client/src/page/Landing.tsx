import { AppShell, Group, Burger, Skeleton, Text, Title, Center, List, ListItem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

export default function Landing() {
	return (
		<Center h={"85vh"} style={{ flexDirection: "column" }}>
			<Title size="10rem">Impact.Site </Title>
			<Text>We're trying</Text>
		</Center>
	);
}
