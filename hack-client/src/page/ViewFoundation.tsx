import { Center, Title, Text, Group, List, Grid, SimpleGrid, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { userAccount } from "../types";
import Profile from "./component/Profile";
import { FaBeer, FaPersonBooth } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ViewFoundation() {
	const [profile, set_profile] = useState<userAccount | undefined>(undefined);
	const params = useParams();

	useEffect(() => {
		fetch(`http://localhost:3000/company/${params.id}`).then((response) => {
			response.json().then((data) => {
				set_profile(data);
			});
		});
	}, []);

	if (!profile) return <div />;

	return (
		<Group style={{ maxWidth: "900px", margin: "auto" }}>
			<SimpleGrid style={{ flexDirection: "column" }} cols={1} pb={"xl"}>
				<Title>Companies</Title>
				<Profile user={profile} />
			</SimpleGrid>
		</Group>
	);
}
