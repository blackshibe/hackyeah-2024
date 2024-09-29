import { Card, Title, Text, Box, TextInput, Rating } from "@mantine/core";

export type filterTerms = {
	min_rating: number;
	terms: string;
};

export default function Filter({
	set_filter,
	filter,
}: {
	filter: filterTerms;
	set_filter: (terms: filterTerms) => void;
}) {
	return (
		<Card withBorder>
			<Title order={2}>Filter</Title>
			<Box style={{ flexDirection: "row", display: "flex", alignItems: "center", gap: 8 }} mt={"sm"}>
				<Text>Search by keywords</Text>
				<TextInput
					placeholder="Term"
					onChange={(event) => {
						set_filter({
							min_rating: filter.min_rating,
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
