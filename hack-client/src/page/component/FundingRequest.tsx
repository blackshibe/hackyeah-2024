import { Card, Title, Text } from "@mantine/core";
import { fundingRequest } from "../../types";
import DisplayCoolTextEditorContent from "./DisplayCoolTextEditorContent";

export default function FundingRequest({ request }: { request: fundingRequest }) {
	return (
		<Card withBorder w={"100%"}>
			<Title>{request.name}</Title>
			<Text mb={"xl"}>{request.target}</Text>
			<DisplayCoolTextEditorContent content={request.description} />
		</Card>
	);
}
