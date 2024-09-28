import { userAccount } from "../../types";

export default function useSession(): userAccount | undefined {
	let data = localStorage.getItem("account");
	if (data) return JSON.parse(data) as userAccount;

	return undefined;
}
