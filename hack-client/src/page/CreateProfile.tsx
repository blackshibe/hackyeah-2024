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
import { useEffect, useState } from "react";
import CreateNGOForm from "./component/CreateNGOForm";
import CreateCompanyForm from "./component/CreateCompanyForm";
import Profile from "./component/Profile";
import { companyAccount, foundationAccount, userAccount } from "../types";

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
	const [account_data, set_account_data] = useState<userAccount | undefined>(undefined);
	const [step, set_step] = useState(0);

	return (
		<Group maw={"900px"} style={{ margin: "auto" }}>
			<Stepper active={step} p={"lg"} w={"100%"}>
				<Stepper.Step label="First step" description="Pick an organization type">
					<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
						<Title>I am...</Title>
						<Center style={{ gap: 32 }}>
							<Company
								callback={() => {
									set_account_data({ type: "foundation" } as foundationAccount); // rest is filled out when the form is filled
									set_step(1);
								}}
								name="An NGO"
								description="Find funding for your organization"
								requirements={["Your organization's information", "Your objective"]}
							/>

							<Company
								callback={() => {
									set_account_data({ type: "company" } as companyAccount); // rest is filled out when the form is filled
									set_step(1);
								}}
								name="A Company"
								description="Find trustworthy organizations to fund"
								requirements={["Your company/corporation's information", "What you're looking to fund"]}
							/>
						</Center>
					</Center>
				</Stepper.Step>
				<Stepper.Step label="Second step" description="Tell us about you">
					<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
						{account_data?.type === "foundation" ? (
							<CreateNGOForm
								account_data={account_data}
								finish={(values) => {
									set_account_data(values);
									set_step(2);
								}}
							/>
						) : (
							<CreateCompanyForm
								account_data={account_data}
								finish={(values) => {
									set_account_data(values);
									set_step(2);
								}}
							/>
						)}
					</Center>
				</Stepper.Step>
				<Stepper.Step label="Final step" description="Done">
					<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
						{account_data && <Profile user={account_data} />}
						<SimpleGrid cols={2}>
							<Button color="blue" fullWidth mt="md" radius="md" onClick={() => set_step(1)}>
								Back
							</Button>
							<Button
								color="blue"
								fullWidth
								mt="md"
								radius="md"
								onClick={async () => {
									if (!account_data) return;

									if (account_data.type === "company") {
										let data = await fetch(`http://localhost:3000/company/register`, {
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({
												name: account_data.name,
												email: account_data.email,
												country: account_data.country,
												city: account_data.city,
												target: account_data.agenda,
												description: account_data.description,
												whoWeWant: account_data.target,
											}),
										});

										if (data.status === 200) {
											localStorage.setItem("account", JSON.stringify(account_data));
											set_step(3);
										}
									} else if (account_data.type === "foundation") {
										let data = await fetch(`http://localhost:3000/foundation/register`, {
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({
												name: account_data.name,
												email: account_data.email,
												country: account_data.country,
												city: account_data.city,
												target: account_data.target,
												projects: account_data.projects,
												description: account_data.description,
											}),
										});

										if (data.status === 200) {
											localStorage.setItem("account", JSON.stringify(account_data));
											set_step(3);
										}
									}
								}}
							>
								Create profile
							</Button>
						</SimpleGrid>
					</Center>
				</Stepper.Step>
				<Stepper.Completed>
					<Center h={"50vh"} style={{ flexDirection: "column", gap: 10 }}>
						<Title>All done!</Title>
						<Text>
							This demo does not include password login. You are logged in as <b>{account_data?.name} </b>{" "}
							now.
						</Text>
						<Button>Create a post</Button>
					</Center>
				</Stepper.Completed>
			</Stepper>
		</Group>
	);
}
