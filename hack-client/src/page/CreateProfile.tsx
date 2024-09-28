import {
	AppShell,
	Group,
	Burger,
	Skeleton,
	Title,
	Image,
	Text,
	Badge,
	Button,
	Center,
	Card,
	Divider,
	List,
	ListItem,
	Stepper,
	TextInput,
	SimpleGrid,
	Avatar,
} from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CreateNGOForm from "./component/CreateNGOForm";
import CreateCompanyForm from "./component/CreateCompanyForm";

function Company({
	name,
	description,
	requirements,
	callback,
}: {
	callback: () => void;
	name: string;
	description: string;
	requirements: string[];
}) {
	return (
		<Card shadow="sm" padding={"0"} radius="md" withBorder w="360px" h={"390px"} key={name}>
			<Card.Section p={"lg"}>
				<Title>{name}</Title>
				<Text c="dimmed" fw={500}>
					{description}
				</Text>
			</Card.Section>

			<Divider />

			<Group p={"lg"} justify="space-between" h={"100%"}>
				<div>
					<Text size="sm" mb={"sm"}>
						To create your account, you will fill in:
					</Text>

					<List>
						{requirements.map((value) => (
							<ListItem>
								<Text size="sm" key={value}>
									{value}
								</Text>
							</ListItem>
						))}
					</List>
				</div>
			</Group>

			<Card.Section p={"lg"}>
				<Button color="blue" fullWidth mt="md" radius="md" bottom={"0"} onClick={callback}>
					Continue
				</Button>
			</Card.Section>
		</Card>
	);
}

export default function CreateProfile() {
	const [org_type, set_org_type] = useState("");
	const [account_data, set_account_data] = useState({});

	const [step, set_step] = useState(2);

	return (
		<>
			<Group maw={"900px"} style={{ margin: "auto" }}>
				<Stepper active={step} p={"lg"} w={"100%"}>
					<Stepper.Step label="First step" description="Pick an organization type">
						<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
							<Title>I am...</Title>
							<Center style={{ gap: 32 }}>
								<Company
									callback={() => {
										set_org_type("ngo");
										set_step(1);
									}}
									name="An NGO"
									description="Find funding for your organization"
									requirements={["Your organization's information", "Your objective"]}
								/>

								<Company
									callback={() => {
										set_org_type("company");
										set_step(1);
									}}
									name="A Company"
									description="Find trustworthy organizations to fund"
									requirements={[
										"Your company/corporation's information",
										"What you're looking to fund",
									]}
								/>
							</Center>
						</Center>
					</Stepper.Step>
					<Stepper.Step label="Second step" description="Tell us about you">
						<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
							{org_type === "ngo" ? (
								<CreateNGOForm
									finish={(values) => {
										set_account_data(values);
										set_step(2);
										console.log(values);
									}}
								/>
							) : (
								<CreateCompanyForm
									finish={(values) => {
										set_account_data(values);
										set_step(2);
										console.log(values);
									}}
								/>
							)}
						</Center>
					</Stepper.Step>
					<Stepper.Step label="Final step" description="Done">
						<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
							<Card shadow="sm" padding="lg" radius="md" withBorder>
								<Card.Section
									p={"lg"}
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										gap: 8,
									}}
								>
									<Avatar alt="it's me" />
									<Text>Company name</Text>
								</Card.Section>

								<Group justify="space-between" mt="md" mb="xs">
									<Text fw={500}>Norway Fjord Adventures</Text>
									<Badge color="pink">On Sale</Badge>
								</Group>

								<Text size="sm" c="dimmed">
									With Fjord Tours you can explore more of the magical fjord landscapes with tours and
									activities on and around the fjords of Norway
								</Text>

								<Button color="blue" fullWidth mt="md" radius="md">
									Book classic tour now
								</Button>
							</Card>
						</Center>
					</Stepper.Step>
					<Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
				</Stepper>
			</Group>
		</>
	);
}
