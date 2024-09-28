import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link, RouteObject, RouterProvider } from "react-router-dom";
import Landing from "./page/Landing";
import { AppShell, Button, createTheme, Divider, Group, MantineProvider, Title } from "@mantine/core";
import CreateProfile from "./page/CreateProfile";

import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";

const CONFIG = [
	{
		path: "/",
		element: <Landing />,
		name: "Home",
	},
	{
		path: "/create-profile",
		element: <CreateProfile />,
		name: "Create profile",
	},
];

const router = createBrowserRouter(CONFIG);
const theme = createTheme({
	fontFamily: "Outfit",
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<AppShell header={{ height: 60 }} padding="md">
				<AppShell.Header>
					<Group h="100%" px="md">
						<Button onClick={() => router.navigate("/")} variant="white">
							<Title>Impact.site</Title>
						</Button>
						<Divider my="sm" orientation="vertical" />
						<Button variant="white" onClick={() => router.navigate("/create-profile")}>
							Create profile
						</Button>
						<Button variant="white" onClick={() => router.navigate("/offers")}>
							Offers
						</Button>
					</Group>
				</AppShell.Header>
				<AppShell.Main>
					<RouterProvider router={router} />
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	</StrictMode>
);
