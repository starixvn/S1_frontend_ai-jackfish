export enum LineLoginDirectTypeEnum {
	Register = 1,
	Login = 2,
	Binding = 3,
}

export interface IGetLineUserIdTypeArgs {
	langId?: string
	lineLoginResponse: {
		code?: string
		state?: string
		error?: string
		description?: string
		errormessage?: string
	}
	loginData: {
		isPersistent?: boolean
		url?: string
		platform?: string
		userAgent?: string
		screen?: string
		FPSRequest?: {
			di?: string
			bi?: string
			detecasAnalysis?: string
			sessionKey?: string
			token?: string
		}
	}
}
