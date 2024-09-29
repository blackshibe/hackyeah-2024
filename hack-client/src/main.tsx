import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link, RouteObject, RouterProvider } from "react-router-dom";
import Landing from "./page/Landing";
import {
	AppShell,
	Burger,
	Text,
	Button,
	createTheme,
	Divider,
	em,
	Group,
	MantineProvider,
	Skeleton,
	Title,
	useMantineColorScheme,
	NavLink,
	Box,
	UnstyledButton,
	Avatar,
} from "@mantine/core";
import CreateProfile from "./page/CreateProfile";

import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";
import Profiles from "./page/Profiles";
import CreateFundingRequest from "./page/CreateFundingRequest";
import ViewFoundation from "./page/ViewFoundation";
import ViewCompany from "./page/ViewCompany";
import useSession from "./page/hook/useSession";
import Requests from "./page/Requests";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import useNavigateToOwnPage from "./page/hook/useNavigateToOwnPage";

const CONFIG = [
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/profiles",
		element: <Profiles />,
	},
	{
		path: "/requests",
		element: <Requests />,
	},
	{
		path: "/create-offer",
		element: <CreateFundingRequest />,
	},
	{
		path: "/create-profile",
		element: <CreateProfile />,
	},
	{
		path: "/foundation/:id",
		element: <ViewFoundation />,
	},
	{
		path: "/company/:id",
		element: <ViewCompany />,
	},
];

export const ROUTER = createBrowserRouter(CONFIG);
const theme = createTheme({
	fontFamily: "Outfit",
});

function MantineRoot() {
	const scheme = useMantineColorScheme();
	const session = useSession();
	const is_mobile = useMediaQuery(`(max-width: ${em(750)})`);
	const [burger_open, set_burger_opened] = useDisclosure(false);
	const link = useNavigateToOwnPage();

	if (!is_mobile && burger_open) set_burger_opened.close();

	return (
		<AppShell
			header={{ height: 60 }}
			padding="md"
			navbar={{ width: 0, breakpoint: "sm", collapsed: { mobile: !burger_open } }}
		>
			<AppShell.Header>
				<Group mih="100%" px="md" style={{ justifyContent: "space-between" }}>
					{is_mobile ? (
						<Box>
							<Burger opened={burger_open} onClick={set_burger_opened.toggle} hiddenFrom="sm" size="sm" />
							<Button
								onClick={() => {
									ROUTER.navigate("/");
									set_burger_opened.close();
								}}
								variant="transparent"
							>
								<Title>impact.site</Title>
							</Button>
						</Box>
					) : (
						<Group gap={0}>
							<Button onClick={() => ROUTER.navigate("/")} variant="transparent">
								<Title>impact.site</Title>
							</Button>
							<Divider my="sm" orientation="vertical" />
							<Button variant="transparent" color="gray" onClick={() => ROUTER.navigate("/requests")}>
								Financing Requests
							</Button>
							<Button variant="transparent" color="gray" onClick={() => ROUTER.navigate("/profiles")}>
								Profiles
							</Button>
							<Divider my="sm" orientation="vertical" />
							<Button
								variant="transparent"
								color="gray"
								onClick={scheme.toggleColorScheme}
								ml={"xs"}
								mr={"xs"}
							>
								Change theme
							</Button>
						</Group>
					)}

					<Group gap={0}>
						{!session ? (
							<Button variant="transparent" onClick={() => ROUTER.navigate("/create-profile")}>
								Create profile
							</Button>
						) : (
							<UnstyledButton onClick={link}>
								<Group gap={"xs"}>
									<Avatar />
									<Text>{session.name}</Text>
								</Group>
							</UnstyledButton>
						)}
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<RouterProvider router={ROUTER} />
			</AppShell.Main>

			{is_mobile && (
				<AppShell.Navbar p="md" w={"200px"}>
					<NavLink
						variant="transparent"
						label="Financing Requests"
						color="blue"
						onClick={() => {
							ROUTER.navigate("/requests");
							set_burger_opened.close();
						}}
					/>
					<NavLink
						variant="transparent"
						label="Profiles"
						color="blue"
						onClick={() => {
							ROUTER.navigate("/profiles");
							set_burger_opened.close();
						}}
					/>

					<Divider my="sm" orientation="horizontal" />

					<NavLink
						variant="transparent"
						label="Change theme"
						color="blue"
						onClick={scheme.toggleColorScheme}
					/>
				</AppShell.Navbar>
			)}
		</AppShell>
	);
}

function AppRoot() {
	return (
		<StrictMode>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<MantineRoot />
			</MantineProvider>
		</StrictMode>
	);
}

createRoot(document.getElementById("root")!).render(<AppRoot />);
