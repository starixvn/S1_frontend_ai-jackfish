export interface ISignInPhoneArgs {
	areaCode: string
	phoneNo: string
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
