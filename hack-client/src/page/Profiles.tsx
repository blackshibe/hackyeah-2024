import { Center, Title, Text, Group, List, Grid, SimpleGrid, Tabs, Card, TextInput, Rating, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { userAccount } from "../types";
import Profile from "./component/Profile";
import { FaBeer, FaPersonBooth } from "react-icons/fa";

type filterTerms = {
	min_rating: number;
	terms: string;
};

function Filter({ set_filter, filter }: { filter: filterTerms; set_filter: (terms: filterTerms) => void }) {
	return (
		<Card withBorder mb={"xl"}>
			<Title order={2}>Filter</Title>
			<Box style={{ flexDirection: "row", display: "flex", alignItems: "center", gap: 8 }} mt={"sm"}>
				<Text>Search by keywords</Text>
				<TextInput
					placeholder="Term"
					onChange={(event) => {
						set_filter({
							min_rating: 1,
							terms: event.currentTarget.value,
						});
					}}
				/>
			</Box>

			<Box style={{ flexDirection: "row", display: "flex", alignItems: "center", gap: 8 }} mt={"sm"}>
				<Text>Minimum Rating</Text>
				<Rating
					defaultValue={0}
					value={filter.min_rating}
					onChange={(rating) => {
						set_filter({
							min_rating: rating,
							terms: filter.terms,
						});
					}}
				/>
			</Box>
		</Card>
	);
}

export default function Profiles() {
	const [filter, set_filter] = useState<filterTerms>({ min_rating: 0, terms: "" });
	let [[foundations, companies], set_profiles] = useState<[userAccount[], userAccount[]]>([[], []]);

	foundations = foundations.filter((user) => {
		let passes_rating = Math.max(user.averageRating, 1) >= filter.min_rating;
		let search_term = filter.terms.toLowerCase();
		let passes_search =
			user.name.toLowerCase().includes(search_term) || user.description.toLowerCase().includes(search_term);
		return passes_search && passes_rating;
	});
	companies = companies.filter((user) => {
		let passes_rating = Math.max(user.averageRating, 1) >= filter.min_rating;
		let search_term = filter.terms.toLowerCase();
		let passes_search =
			user.name.toLowerCase().includes(search_term) || user.description.toLowerCase().includes(search_term);
		return passes_search && passes_rating;
	});

	useEffect(() => {
		fetch("http://localhost:3000/").then((response) => {
			response.json().then((data) => {
				set_profiles(data);
			});
		});
	}, []);

	return (
		<Group style={{ maxWidth: "600px", margin: "auto" }}>
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
					<Filter filter={filter} set_filter={set_filter} />
					<SimpleGrid style={{ flexDirection: "column" }} cols={1} pb={"xl"}>
						<Title>Companies</Title>
						{companies.map((user) => (
							<Profile user={user} key={user.id} with_link_type={"company"} />
						))}
					</SimpleGrid>
				</Tabs.Panel>
				<Tabs.Panel value="foundations" mt={"lg"}>
					<Filter filter={filter} set_filter={set_filter} />
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
