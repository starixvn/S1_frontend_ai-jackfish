export const PHONE_LENGTH_REGEX =
	/^\+60[0-9]{9,10}$|\+62[0-9]{10,13}$|\+86[0-9]{10,11}$|\+91[0-9]{10}$|\+66[0-9]{9}$|\+880[0-9]{10}$|\+855[0-9]{8,9}$|\+84[0-9]{9}$|\+82[0-9]{9,10}$|\+55[0-9]{10,11}$/

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{6,15}$/

export const REALNAME_REGEX =
	/^[\p{L}. \p{Script=Han}\p{Script=Hangul}\p{Script=Thai}\p{Script=Bengali}\p{Script=Devanagari}\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Khmer}\p{Script=Hiragana}\p{Script=Katakana}]+$/u

export const THAI_BANK_ACCOUNT_REGEX = /^\d{10}$/

export const INTEGER_ONLY_REGEX = /(\..*)|[^0-9]/g

export const USERNAME_REGEX = /^[A-Za-z0-9]{6,18}$/
