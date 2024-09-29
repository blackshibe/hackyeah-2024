import { AppShell, Group, Burger, Skeleton, Text, Title, Center, List, ListItem, Button, em } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ROUTER } from "../main";
import useSession from "./hook/useSession";

export default function Landing() {
	const session = useSession();
	const is_mobile = useMediaQuery(`(max-width: ${em(750)})`);

	return (
		<Center h={"85vh"} style={{ flexDirection: "column", alignItems: "flex-start" }} p={"lg"}>
			<Title size={is_mobile ? "2rem" : "10rem"}>impact.site </Title>
			{!session && <Button onClick={() => ROUTER.navigate("/create-profile")}>Create an account</Button>}
		</Center>
	);
}
