export type userAccount =
	| {
			type: "ngo";
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
			name: string;
			email: string;
			country: string;
			agenda: string;
			city: string;
			target: string;
			description: string;
			projects: string;
	  };

export type ngoAccount = Extract<userAccount, { type: "ngo" }>;
export type companyAccount = Extract<userAccount, { type: "company" }>;
