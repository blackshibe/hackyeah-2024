import { useEffect, useState } from "react";
import { userAccount } from "../../types";
import { useInterval } from "@mantine/hooks";

export default function useSession(): userAccount | undefined {
	let [state, set_state] = useState<userAccount | undefined>(get_data);

	function get_data(): userAccount | undefined {
		let data = localStorage.getItem("account");
		if (data) return JSON.parse(data) as userAccount;

		return undefined;
	}

	useInterval(() => set_state(get_data()), 1000, { autoInvoke: true });

	return state;
}
