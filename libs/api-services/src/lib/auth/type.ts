export interface ISignInArgs {
	userName: string
	userpwd: string
	isPersistent: boolean
	url: string
	platform: string
	userAgent: string
	screen: string
	FPSRequest?: {
		di?: string
		bi?: string
		detecasAnalysis?: string
		sessionKey?: string
		token?: string
	}
}
