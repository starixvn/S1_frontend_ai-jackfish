import React from 'react'

interface IFormProps
	extends React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	> {
	component?: boolean
}

const Form = ({ children, ...restProps }: IFormProps) => {
	return (
		<form
			style={{
				display: 'contents', // 'contents' 不佔用 dom 元素以符合設計
			}}
			{...restProps}
		>
			{children}
			<button
				type='submit'
				aria-label='form-submit'
				style={{ display: 'contents' }}
			/>
		</form>
	)
}

export default Form
