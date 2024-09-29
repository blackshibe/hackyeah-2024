import { useEffect, useState } from "react";
import { userAccount } from "../../types";

export default function useSession(): userAccount | undefined {
	let [state, set_state] = useState<userAccount | undefined>(undefined);

	useEffect(() => {
		let data = localStorage.getItem("account");
		if (data) return set_state(JSON.parse(data) as userAccount);

		return set_state(undefined);
	});

	return state;
}
