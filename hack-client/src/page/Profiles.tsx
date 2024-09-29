import {
	Center,
	Title,
	Text,
	Group,
	List,
	Grid,
	SimpleGrid,
	Tabs,
	Card,
	TextInput,
	Rating,
	Box,
	LoadingOverlay,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { userAccount } from "../types";
import Profile from "./component/Profile";
import { FaBeer, FaPersonBooth } from "react-icons/fa";
import Filter, { filterTerms } from "./component/Filter";

export default function Profiles() {
	const [filter, set_filter] = useState<filterTerms>({ min_rating: 0, terms: "" });
	let [[foundations, companies], set_profiles] = useState<[userAccount[], userAccount[]]>([[], []]);
	const [loading, set_loading_visible] = useState(true);

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
				set_loading_visible(false);
			});
		});
	}, []);

	return (
		<Group style={{ maxWidth: "600px", margin: "auto" }}>
			<LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

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
					<SimpleGrid style={{ flexDirection: "column" }} cols={1} pb={"xl"} pt={"xl"}>
						<Title>Companies</Title>
						{companies.map((user) => (
							<Profile user={user} key={user.id} with_link_type={"company"} />
						))}
					</SimpleGrid>
				</Tabs.Panel>
				<Tabs.Panel value="foundations" mt={"lg"}>
					<Filter filter={filter} set_filter={set_filter} />
					<SimpleGrid style={{ flexDirection: "column" }} cols={1} pb={"xl"} pt={"xl"}>
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
