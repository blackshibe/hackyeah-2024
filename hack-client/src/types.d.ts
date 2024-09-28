export type userAccount =
	| {
			type: "foundation";
			id: number;
			name: string;
			email: string;
			country: string;
			city: string;
			description: string;
			projects: string;
			target: string;
	  }
	| {
			type: "company";
			id: number;
			name: string;
			email: string;
			country: string;
			agenda: string;
			city: string;
			target: string;
			description: string;
			projects: string;
	  };

export type foundationAccount = Extract<userAccount, { type: "foundation" }>;
export type companyAccount = Extract<userAccount, { type: "company" }>;
