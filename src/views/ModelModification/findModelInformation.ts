import api from '@/api/api';
import { currentSelectModel, currentSelectPost, formField } from './ModelModification.vue';

const findModelInformation = async () => {
	const res = await api.selectModelInformation({ filePath: currentSelectModel.value, post: currentSelectPost.value });
	if (res.status === 200) {
		const resArr = Object.entries(res.data);
		for (const key, val in formField.value)
			;
	}
};
