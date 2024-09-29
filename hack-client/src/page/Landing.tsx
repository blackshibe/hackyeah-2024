import {
	AppShell,
	Group,
	Burger,
	Skeleton,
	Text,
	Title,
	Center,
	List,
	ListItem,
	Button,
	em,
	SimpleGrid,
	Box,
	Paper,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ROUTER } from "../main";
import useSession from "./hook/useSession";

export default function Landing() {
	const session = useSession();
	const is_mobile = useMediaQuery(`(max-width: ${em(750)})`);

	return (
		<>
			<Center
				h={"85vh"}
				maw={"1200px"}
				style={{ flexDirection: "column", margin: "auto", alignItems: "flex-start" }}
				p={"lg"}
			>
				<SimpleGrid>
					<Box>
						<Title order={1} style={{ fontSize: "5rem" }}>
							impact.site
						</Title>

						<Text style={{ fontSize: "1.5rem" }}>
							Find a company or foundation that aligns with your values and interests
						</Text>

						<Group style={{ flexDirection: is_mobile ? "column" : "row", gap: "16px", marginTop: "16px" }}>
							<Button onClick={() => ROUTER.navigate("/profiles")}>Explore profiles</Button>
							{!session && (
								<Button onClick={() => ROUTER.navigate("/create-profile")}>Create a profile</Button>
							)}
						</Group>
					</Box>
				</SimpleGrid>
			</Center>
			{/* <Paper h={"100vh"} bg={"blue"} maw={"100%"} p={"lg"}></Paper> */}
		</>
	);
}
