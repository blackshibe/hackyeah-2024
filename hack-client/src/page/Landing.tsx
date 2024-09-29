import { AppShell, Group, Burger, Skeleton, Text, Title, Center, List, ListItem, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ROUTER } from "../main";
import useSession from "./hook/useSession";

export default function Landing() {
	const session = useSession();

	return (
		<Center h={"85vh"} style={{ flexDirection: "column" }}>
			<Title size="10rem">Impact.Site </Title>
			{!session && <Button onClick={() => ROUTER.navigate("/create-profile")}>Create an account</Button>}
		</Center>
	);
}
