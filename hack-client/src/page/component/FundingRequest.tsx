import { Card, Title, Text, ScrollArea } from "@mantine/core";
import { fundingRequest } from "../../types";
import DisplayCoolTextEditorContent from "./DisplayCoolTextEditorContent";

export default function FundingRequest({ request }: { request: fundingRequest }) {
	return (
		<Card withBorder w={"100%"}>
			<ScrollArea h={"100%"}>
				<Title>{request.title}</Title>
				<Text mb={"xl"}>{request.target}</Text>
				<DisplayCoolTextEditorContent content={request.description} />
			</ScrollArea>
		</Card>
	);
}
