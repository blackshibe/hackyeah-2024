import { Center, Title, Text, Button, Group, SimpleGrid, Stepper } from "@mantine/core";
import { useState } from "react";
import { fundingRequest, userAccount } from "../types";
import CreateCompanyForm from "./component/CreateCompanyForm";
import CreateNGOForm from "./component/CreateNGOForm";
import Profile from "./component/Profile";
import CreateRequestForm from "./component/CreateRequestForm";
import FundingRequest from "./component/FundingRequest";
import useSession from "./hook/useSession";
import { ROUTER } from "../main";
import useNavigateToOwnPage from "./hook/useNavigateToOwnPage";

export default function CreateFundingRequest() {
	const [request_data, set_request_data] = useState<fundingRequest | undefined>(undefined);
	const [step, set_step] = useState(0);
	const session = useSession();
	const navigate_home = useNavigateToOwnPage();

	return (
		<Group maw={"900px"} style={{ margin: "auto" }}>
			<Stepper active={step} p={"lg"} w={"100%"}>
				<Stepper.Step label="First step" description="Fill out basic details">
					<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
						<CreateRequestForm
							form_data={request_data}
							finish={(data) => {
								set_step(1);
								set_request_data(data);
							}}
						/>
					</Center>
				</Stepper.Step>
				<Stepper.Step label="Second step" description="Preview your post">
					<Center h={"75vh"} style={{ flexDirection: "column", gap: 32 }}>
						<FundingRequest request={request_data!} />
						<Group style={{ justifyContent: "space-between" }} w={"100%"}>
							<Button onClick={() => set_step(0)}>Back</Button>
							<Button
								onClick={async () => {
									let make_post = await fetch("http://localhost:3000/fundingRequest", {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											title: request_data?.name,
											target: request_data?.target,
											description: request_data?.description,
											FoundationId: session?.id,
										}),
									});

									if (make_post.status === 200) {
										set_step(2);
									}
								}}
							>
								Next
							</Button>
						</Group>
					</Center>
				</Stepper.Step>
				<Stepper.Completed>
					<Center h={"50vh"} style={{ flexDirection: "column", gap: 10 }}>
						Done! you can view your post under your profile
						<Button onClick={navigate_home}> Go back to profile...</Button>
					</Center>
				</Stepper.Completed>
			</Stepper>
		</Group>
	);
}
