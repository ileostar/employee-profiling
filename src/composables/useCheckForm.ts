export default function(message: string) {
	return (_rule: any, value: any, callback: any) => {
		if (value === '') {
			callback(new Error(message))
		} else {
			callback()
		}
	}
}
