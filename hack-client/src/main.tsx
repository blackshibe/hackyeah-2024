import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link, RouteObject, RouterProvider } from "react-router-dom";
import Landing from "./page/Landing";
import {
	AppShell,
	Button,
	createTheme,
	Divider,
	Group,
	MantineProvider,
	Title,
	useMantineColorScheme,
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

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md" style={{ justifyContent: "space-between" }}>
					<Group gap={0}>
						<Button onClick={() => ROUTER.navigate("/")} variant="transparent">
							<Title>Impact.site</Title>
						</Button>
						<Divider my="sm" orientation="vertical" />
						<Button variant="transparent" onClick={() => ROUTER.navigate("/requests")}>
							Financing Requests
						</Button>
						<Button variant="transparent" onClick={() => ROUTER.navigate("/profiles")}>
							Profiles
						</Button>
					</Group>

					<Group gap={0}>
						<Button variant="transparent" onClick={scheme.toggleColorScheme} ml={"xs"} mr={"xs"}>
							Change theme
						</Button>
						{!session ? (
							<>
								<Divider my="sm" orientation="vertical" />
								<Button variant="transparent" onClick={() => ROUTER.navigate("/create-profile")}>
									Create profile
								</Button>
							</>
						) : undefined}
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<RouterProvider router={ROUTER} />
			</AppShell.Main>
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
