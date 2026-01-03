export type PersonalInfo = {
	name: string;
	email: string;
	phone: string;
	location: string;
	linkedin: string;
	github: string;
	title: string;
};

export type ExperienceEntry = {
	company: string;
	role: string;
	location: string;
	start_date: string;
	end_date: string;
	description?: string;
	highlights: string[];
};

export type EducationEntry = {
	degree: string;
	institution: string;
	location: string;
	year: string;
};

export type Skills = {
	[key: string]: string[];
};

export type CareerProfile = {
	personal_info: PersonalInfo;
	summary: string;
	experience: ExperienceEntry[];
	education: EducationEntry[];
	skills: Skills;
};
