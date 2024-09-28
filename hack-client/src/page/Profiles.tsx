import { Center, Title, Text, Group, List, Grid, SimpleGrid, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { userAccount } from "../types";
import Profile from "./component/Profile";
import { FaBeer, FaPersonBooth } from "react-icons/fa";
export default function Profiles() {
	const [[foundations, companies], set_profiles] = useState<[userAccount[], userAccount[]]>([[], []]);

	useEffect(() => {
		fetch("http://localhost:3000/").then((response) => {
			response.json().then((data) => {
				set_profiles(data);
			});
		});
	}, []);

	return (
		<Group style={{ maxWidth: "900px", margin: "auto" }}>
			<Tabs defaultValue="companies" w={"100%"}>
				<Tabs.List>
					<Tabs.Tab value="companies" leftSection={<FaBeer />}>
						Companies
					</Tabs.Tab>
					<Tabs.Tab value="foundations" leftSection={<FaPersonBooth />}>
						Foundations
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="companies" mt={"lg"}>
					<SimpleGrid style={{ flexDirection: "column" }} cols={1} pb={"xl"}>
						<Title>Companies</Title>
						{companies.map((user) => (
							<Profile user={user} key={user.id} with_link_type={"company"} />
						))}
					</SimpleGrid>
				</Tabs.Panel>
				<Tabs.Panel value="foundations" mt={"lg"}>
					<SimpleGrid style={{ flexDirection: "column" }} cols={1} pb={"xl"}>
						<Title>Foundations</Title>
						{foundations.map((user) => (
							<Profile user={user} key={user.id} with_link_type="foundation" />
						))}
					</SimpleGrid>
				</Tabs.Panel>
			</Tabs>
		</Group>
	);
}
