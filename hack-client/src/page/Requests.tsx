import {
	Center,
	Title,
	Text,
	Group,
	Card,
	Button,
	Divider,
	SimpleGrid,
	Avatar,
	UnstyledButton,
	LoadingOverlay,
} from "@mantine/core";
import { ROUTER } from "../main";
import useSession from "./hook/useSession";
import { useEffect, useState } from "react";
import { foundationAccount, fundingRequest } from "../types";
import DisplayCoolTextEditorContent from "./component/DisplayCoolTextEditorContent";
import Filter, { filterTerms } from "./component/Filter";

function FoundationRequest({ request }: { request: fundingRequest }) {
	const [user, set_user] = useState<foundationAccount | undefined>(undefined);

	useEffect(() => {
		fetch(`http://localhost:3000/foundation/${request.id}`).then((response) => {
			response.json().then((data) => {
				set_user(data);
				request._foundation = data;
			});
		});
	}, []);

	return (
		<Card
			withBorder
			p={0}
			key={request.id}
			title={request.name}
			// subtitle={`Requested by ${request.foundation.name}`}
			style={{ width: "100%", marginBottom: "1rem" }}
		>
			<DisplayCoolTextEditorContent content={request.description} />
			<Divider orientation="horizontal" w={"100%"} />
			<UnstyledButton onClick={() => ROUTER.navigate(`/foundation/${user?.id}`)}>
				<Group p={"md"}>
					<Avatar />
					<Text>Requested by {user?.name}</Text>
				</Group>
			</UnstyledButton>
		</Card>
	);
}

export default function Requests() {
	const session = useSession();
	const [filter, set_filter] = useState<filterTerms>({ min_rating: 0, terms: "" });
	const [loading, set_loading_visible] = useState(true);
	let [requests, set_requests] = useState<fundingRequest[]>([]);

	useEffect(() => {
		fetch("http://localhost:3000/fundingRequest")
			.then((res) => res.json())
			.then((data) => {
				set_requests(data);
				set_loading_visible(false);
			});
	}, []);

	requests = requests.filter((request: never) => {
		let passes_rating = Math.max(request._foundation?.averageRating ?? 1, 1) >= filter.min_rating;
		let search_term = filter.terms.toLowerCase();
		let passes_search =
			request.title.toLowerCase().includes(search_term) ||
			request.description.toLowerCase().includes(search_term);
		return passes_search && passes_rating;
	});
	return (
		<Group
			style={{
				maxWidth: "900px",
				minHeight: "65vh",
				margin: "auto",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

			<Title>Financing Requests</Title>

			{session?.type === "foundation" && (
				<Button onClick={() => ROUTER.navigate("/create-offer")}>Create new offer</Button>
			)}

			<SimpleGrid w={"100%"}>
				<Filter filter={filter} set_filter={set_filter} />
				{requests.map((request) => (
					<FoundationRequest request={request} />
				))}
			</SimpleGrid>
		</Group>
	);
}
