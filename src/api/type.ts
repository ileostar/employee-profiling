export type LoginReg = {
	username: string
	password: string
}

export type fixPassword = {
	id: number
	password: string
}
export type fixUsername = {
	id: number
	username: string
}

export type Tag = {
	id?: number
	features?: string
}

export type Employee = {
	age?: number
	createdTime?: string
	degree?: string
	eight?: string
	eighteen?: string
	eleven?: string
	fifteen?: string
	fifty?: string
	fiftyOne?: string
	fiftyThree?: string
	fiftyTwo?: string
	five?: string
	forty?: string
	fortyEight?: string
	fortyFive?: string
	fortyFour?: string
	fortyNine?: string
	fortyOne?: string
	fortySeven?: string
	fortySix?: string
	fortyThree?: string
	fortyTwo?: string
	four?: string
	fourteen?: string
	id?: number
	name?: string
	nine?: string
	nineteen?: string
	number?: number
	one?: string
	post?: string
	seniority?: number
	seven?: string
	seventeen?: string
	sex?: string
	six?: string
	sixteen?: string
	status?: string
	ten?: string
	thirteen?: string
	thirty?: string
	thirtyEight?: string
	thirtyFive?: string
	thirtyFour?: string
	thirtyNine?: string
	thirtyOne?: string
	thirtySeven?: string
	thirtySix?: string
	thirtyThree?: string
	thirtyTwo?: string
	three?: string
	twelve?: string
	twenty?: string
	twentyEight?: string
	twentyFive?: string
	twentyFour?: string
	twentyNine?: string
	twentyOne?: string
	twentySeven?: string
	twentySix?: string
	twentyThree?: string
	twentyTwo?: string
	two?: string
	unit?: string
}

export type searchEmployee = {
  post: string
  conditions: string | number
}

export type AnalyzeRelation = {
  createdTime: string
  post: string
}