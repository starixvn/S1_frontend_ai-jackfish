import Script from 'next/script'

export const IovationScript = () => (
	<>
		<Script strategy='lazyOnload' id='iovation-script'>
			{`
                         window.IGLOO = window.IGLOO || {
                         "enable_flash" : false,
                         "loader" : {
                         "fp_dyn" : false,
                         "version" : "5.2.2"
                         }
                       };
                 `}
		</Script>

		<Script strategy='lazyOnload' src='/js/loader_only.js' />
	</>
)
