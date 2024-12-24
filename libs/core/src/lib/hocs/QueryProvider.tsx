'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

const QueryProvider = ({ children }: PropsWithChildren): React.JSX.Element => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000, // 5 分鐘
				refetchOnWindowFocus: false,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export { QueryProvider }
