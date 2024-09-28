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
import CreateOffer from "./page/CreateOffer";
import Offers from "./page/Offers";

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
		path: "/offers",
		element: <Offers />,
	},
	{
		path: "/create-offer",
		element: <CreateOffer />,
	},
	{
		path: "/create-profile",
		element: <CreateProfile />,
	},
];

const router = createBrowserRouter(CONFIG);
const theme = createTheme({
	fontFamily: "Outfit",
});

function MantineRoot() {
	const scheme = useMantineColorScheme();

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md" style={{ justifyContent: "space-between" }}>
					<Group gap={0}>
						<Button onClick={() => router.navigate("/")} variant="transparent">
							<Title>Impact.site</Title>
						</Button>
						<Divider my="sm" orientation="vertical" />
						<Button variant="transparent" onClick={() => router.navigate("/offers")}>
							Offers
						</Button>
						<Button variant="transparent" onClick={() => router.navigate("/profiles")}>
							Profiles
						</Button>
					</Group>

					<Group gap={0}>
						<Button variant="transparent" onClick={scheme.toggleColorScheme} ml={"xs"} mr={"xs"}>
							Change theme
						</Button>
						<Divider my="sm" orientation="vertical" />
						<Button variant="transparent" onClick={() => router.navigate("/create-profile")}>
							Create profile
						</Button>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<RouterProvider router={router} />
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
