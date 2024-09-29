export type userAccount =
	| {
			type: "foundation";
			id: number;
			name: string;
			email: string;
			country: string;
			city: string;
			averageRating: number;
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
			averageRating: number;
			target: string;
			description: string;
			projects: string;
	  };

export type foundationAccount = Extract<userAccount, { type: "foundation" }>;
export type companyAccount = Extract<userAccount, { type: "company" }>;

export type fundingRequest = {
	id: number;
	name: string;
	target: string;
	description: string;
	FoundationId: string;
	_foundation?: foundationAccount;
};

export type rating = {
	message: string;
	authorName: string;
	rate: number;
	CompanyId: string;
	FoundationId: string;
};
