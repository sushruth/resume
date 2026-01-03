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

export type SkillCategory = {
	category: string;
	items: string[];
};

export type Skills = SkillCategory[];

export type CareerProfile = {
	personal_info: PersonalInfo;
	summary: string;
	experience: ExperienceEntry[];
	education: EducationEntry[];
	skills: Skills;
	publications: PublicationEntry[];
};

export type PublicationEntry = {
	title: string;
	conference: string;
	year: string;
	link: string;
};
