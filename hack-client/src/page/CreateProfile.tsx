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
} from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
		<Card shadow="sm" padding={"0"} radius="md" withBorder w="400px" h={"340px"}>
			<Card.Section p={"lg"}>
				<Title>{name}</Title>
				<Text c="dimmed" fw={500}>
					{description}
				</Text>
			</Card.Section>

			<Divider />

			<Group p={"lg"} justify="space-between" h={"100%"}>
				<div>
					<Text size="sm">Before applying for funding, you will fill in:</Text>

					<List>
						{requirements.map((value) => (
							<ListItem>
								<Text size="sm">{value}</Text>
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

function CreateAccountForm() {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
		},
	});

	return (
		<Card shadow="sm" padding={"lg"} radius="md" withBorder>
			<Title mb={"lg"}>
				Tell us more about your <span style={{ color: "grey", fontWeight: "bold" }}>NGO</span>
			</Title>
			<SimpleGrid
				cols={2}
				style={{
					alignItems: "end",
				}}
			>
				<TextInput
					label="Organization name"
					placeholder="Name"
					key={form.key("name")}
					{...form.getInputProps("name")}
				/>
				<TextInput mt="md" placeholder="Email" key={form.key("email")} {...form.getInputProps("email")} />
			</SimpleGrid>

			<SimpleGrid
				cols={2}
				style={{
					alignItems: "end",
				}}
			>
				<TextInput
					label="Country"
					placeholder="Country"
					key={form.key("country")}
					{...form.getInputProps("country")}
				/>
				<TextInput
					mt="md"
					label="City"
					placeholder="City"
					key={form.key("city")}
					{...form.getInputProps("city")}
				/>
			</SimpleGrid>

			<TextInput
				label="Your organization's target"
				placeholder="Target"
				key={form.key("target")}
				mt={"sm"}
				{...form.getInputProps("target")}
			/>

			<Button mt={"lg"}>Submit</Button>
		</Card>
	);
}

export default function CreateProfile() {
	const [org_type, set_org_type] = useState("");
	const [step, set_step] = useState(0);

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
									description="Apply for funding and find your funding provider"
									requirements={[
										"Your organization's information",
										"Your objective",
										"How you can contribute back",
									]}
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
					<Stepper.Step label="Second step" description="Verify email">
						<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
							<CreateAccountForm />
						</Center>
					</Stepper.Step>
					<Stepper.Step label="Final step" description="Get full access">
						Step 3 content: Get full access
					</Stepper.Step>
					<Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
				</Stepper>
			</Group>
		</>
	);
}
