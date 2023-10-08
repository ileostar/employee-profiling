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

export type updatePassword = {
	id: number
	password: string
  prePassword: string
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

type modelParams = {
  age?: number;
  degree?: number;
  eight?: number;
  eighteen?: number;
  eleven?: number;
  fifteen?: number;
  fifty?: number;
  fiftyOne?: number;
  fiftyThree?: number;
  fiftyTwo?: number;
  five?: number;
  forty?: number;
  fortyEight?: number;
  fortyFive?: number;
  fortyFour?: number;
  fortyNine?: number;
  fortyOne?: number;
  fortySeven?: number;
  fortySix?: number;
  fortyThree?: number;
  fortyTwo?: number;
  four?: number;
  fourteen?: number;
  nine?: number;
  nineteen?: number;
  one?: number;
  post?: string;
  scores?: number;
  seniority?: number;
  seven?: number;
  seventeen?: number;
  six?: number;
  sixteen?: number;
  status?: number;
  ten?: number;
  thirteen?: number;
  thirty?: number;
  thirtyEight?: number;
  thirtyFive?: number;
  thirtyFour?: number;
  thirtyNine?: number;
  thirtyOne?: number;
  thirtySeven?: number;
  thirtySix?: number;
  thirtyThree?: number;
  thirtyTwo?: number;
  three?: number;
  twelve?: number;
  twenty?: number;
  twentyEight?: number;
  twentyFive?: number;
  twentyFour?: number;
  twentyNine?: number;
  twentyOne?: number;
  twentySeven?: number;
  twentySix?: number;
  twentyThree?: number;
  twentyTwo?: number;
  two?: number;
}

export type controlModel = {
  filePath: string
  request: modelParams
}

export type Search = {
  post?: string
  conditions?: string
  createdTime?: string
}

export type AnalyzeRelation = {
  createdTime: string
  post: string
}

export type OverallPortrait = {
  createdTime?: string
  degree?: string
  maxAge?: string
  minAge?: string
  post?: string
  sex?: string
  unit?: string
}

export type SelectAllEmployee = {
  createdTime: string
  pageNum: number
  pageSize: number
}

export type Performance = {
  createdTime?: string
  employeeId?: number
  factor?: number
  id?: number
  name?: string
  number?: number
  post?: string
  scores?: number
  unit?: string
}

export type findModel = {
  filePath: string
  post: string
}

export type Approval = {
  approvalTime: string
  content: string
  id: 0
  state: string
  username: string
}