import { Center, Title, Text, Button, Group, SimpleGrid, Stepper } from "@mantine/core";
import { useState } from "react";
import { fundingRequest, userAccount } from "../types";
import CreateCompanyForm from "./component/CreateCompanyForm";
import CreateNGOForm from "./component/CreateNGOForm";
import Profile from "./component/Profile";
import CreateRequestForm from "./component/CreateRequestForm";
import FundingRequest from "./component/FundingRequest";

export default function CreateFundingRequest() {
	const [request_data, set_request_data] = useState<fundingRequest | undefined>(undefined);
	const [step, set_step] = useState(0);

	console.log(request_data);

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
							<Button>Next</Button>
						</Group>
					</Center>
				</Stepper.Step>
				<Stepper.Completed>
					<Center h={"50vh"} style={{ flexDirection: "column", gap: 10 }}></Center>
				</Stepper.Completed>
			</Stepper>
		</Group>
	);
}
