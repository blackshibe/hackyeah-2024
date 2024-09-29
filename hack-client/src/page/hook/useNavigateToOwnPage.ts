import { ROUTER } from "../../main";
import useSession from "./useSession";

export default function useNavigateToOwnPage() {
	let session = useSession();

	if (!session) return () => {};

	return () => {
		ROUTER.navigate(`/${session.type}/${session.id}`);
	};
}
