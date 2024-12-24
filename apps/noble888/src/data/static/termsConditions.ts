import { bannerUrl } from 'JF-core'

export const TERMS_CONDITIONS = ({ langId }: { langId: string }) => {
	const termsConditions = {
		TermsConditions: bannerUrl(`/Static/${langId}/TermsConditions.html`),
		OurPolicies: bannerUrl(`/Static/${langId}/ResposibleGaming.html`),
		PrivacyPolicy: bannerUrl(`/Static/${langId}/PrivacyPolicy.html`),
		CookiePolicy: bannerUrl(`/Static/${langId}/CookiePolicy.html`),
		RuleRegulations: bannerUrl(`/Static/${langId}/RulesandRegulations.html`),
		AccountTerms: bannerUrl(`/Static/${langId}/AccountTerms.html`),
		FAQ: bannerUrl(`/Static/${langId}/FAQ.html`),
		AboutUs: bannerUrl(`/Static/${langId}/AboutUs.html`),
		Terms: bannerUrl(`/Static/${langId}/Terms.html`),
		ContactUs: bannerUrl(`/Static/${langId}/ContactUs.html`),
		ResposibleGaming: bannerUrl(`/Static/${langId}/ResposibleGaming.html`),
	}

	return termsConditions
}
