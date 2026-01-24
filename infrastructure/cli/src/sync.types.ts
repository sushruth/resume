/**
 * JSON Resume Schema Types
 * Based on https://jsonresume.org/schema/
 */

/**
 * ISO 8601 date format: YYYY, YYYY-MM, or YYYY-MM-DD
 */
export type ISO8601 = string;

/**
 * Basics section - Personal information
 */
export type Basics = {
	name: string;
	label?: string;
	image?: string;
	email?: string;
	phone?: string;
	url?: string;
	summary?: string;
	location?: {
		address?: string;
		postalCode?: string;
		city?: string;
		countryCode?: string;
		region?: string;
	};
	profiles?: Array<{
		network?: string;
		username?: string;
		url?: string;
	}>;
};

/**
 * Work experience entry
 */
export type WorkEntry = {
	name?: string;
	location?: string;
	description?: string;
	position?: string;
	url?: string;
	startDate?: ISO8601;
	endDate?: ISO8601;
	summary?: string;
	highlights?: string[];
};

/**
 * Volunteer experience entry
 */
export type VolunteerEntry = {
	organization?: string;
	position?: string;
	url?: string;
	startDate?: ISO8601;
	endDate?: ISO8601;
	summary?: string;
	highlights?: string[];
};

/**
 * Education entry
 */
export type EducationEntry = {
	institution?: string;
	url?: string;
	area?: string;
	studyType?: string;
	startDate?: ISO8601;
	endDate?: ISO8601;
	score?: string;
	courses?: string[];
};

/**
 * Award entry
 */
export type AwardEntry = {
	title?: string;
	date?: ISO8601;
	awarder?: string;
	summary?: string;
};

/**
 * Certificate entry
 */
export type CertificateEntry = {
	name?: string;
	date?: ISO8601;
	url?: string;
	issuer?: string;
};

/**
 * Publication entry
 */
export type PublicationEntry = {
	name?: string;
	publisher?: string;
	releaseDate?: ISO8601;
	url?: string;
	summary?: string;
};

/**
 * Skill entry
 */
export type SkillEntry = {
	name?: string;
	level?: string;
	keywords?: string[];
};

/**
 * Language entry
 */
export type LanguageEntry = {
	language?: string;
	fluency?: string;
};

/**
 * Interest entry
 */
export type InterestEntry = {
	name?: string;
	keywords?: string[];
};

/**
 * Reference entry
 */
export type ReferenceEntry = {
	name?: string;
	reference?: string;
};

/**
 * Project entry
 */
export type ProjectEntry = {
	name?: string;
	description?: string;
	highlights?: string[];
	keywords?: string[];
	startDate?: ISO8601;
	endDate?: ISO8601;
	url?: string;
	roles?: string[];
	entity?: string;
	type?: string;
};

/**
 * Meta information
 */
export type Meta = {
	canonical?: string;
	version?: string;
	lastModified?: ISO8601;
};

/**
 * Custom extension: Key Differentiators
 * Not part of standard JSON Resume schema, preserved for internal use
 */
export type KeyDifferentiators = {
	summary?: string;
	points?: Array<{
		header: string;
		detail: string;
	}>;
};

/**
 * JSON Resume schema with custom extensions
 */
export type Resume = {
	$schema?: string;
	basics?: Basics;
	work?: WorkEntry[];
	volunteer?: VolunteerEntry[];
	education?: EducationEntry[];
	awards?: AwardEntry[];
	certificates?: CertificateEntry[];
	publications?: PublicationEntry[];
	skills?: SkillEntry[];
	languages?: LanguageEntry[];
	interests?: InterestEntry[];
	references?: ReferenceEntry[];
	projects?: ProjectEntry[];
	meta?: Meta;

	// Custom extensions (JSON Resume allows additional properties)
	key_differentiators?: KeyDifferentiators;
};

/**
 * Legacy type alias for backwards compatibility during migration
 * @deprecated Use Resume instead
 */
export type CareerProfile = Resume;

/**
 * Legacy type aliases - will be removed after migration
 * @deprecated
 */
export type PersonalInfo = Basics;
export type ExperienceEntry = WorkEntry;
export type SkillCategory = SkillEntry;
export type Skills = SkillEntry[];
