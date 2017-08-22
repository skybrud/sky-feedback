<script>
// Promise polyfill for axios
import 'core-js/fn/promise';
import axios from 'axios';
import SkyReveal from 'sky-reveal';

const endpoint = '/umbraco/Feedback/Frontend/AddRating';

export default {
	name: 'sky-feedback',
	components: {
		'sky-reveal': SkyReveal,
	},
	props: ['siteId', 'pageId'],
	data() {
		return {
			open: false,
			error: false,
			success: false,
			name: 'Sebastian Kolind Sørensen',
			email: 'skolind@skybrud.dk',
			comment: 'Test from Skybrud',
			type: 'positive',
		};
	},
	methods: {
		toggle(type) {
			this.type = type;
			this.open = !this.open;
		},
		submit() {
			let formData = new FormData();
			const dataKeys = Object.keys(this._data);

			/**
			 * Append all form fields to formData
			 */
			formData = dataKeys.reduce((data, key) => {
				data.append(key, this._data[key]);
				return data;
			}, formData);

			if (!this.pageId || !this.siteId) {
				console.warn('You have to set page-id and site-id on the component');
			}

			formData.append('pageId', this.pageId);
			formData.append('siteId', this.siteId);

			axios.post(endpoint, formData).then((response) => {
				this.success = true;
				this.error = false;

				setTimeout(() => {
					this.open = false;
				}, 3000);
			}).catch((error) => {
				this.success = false;
				this.error = true;
			});
		},
	},
};
</script>

<style src="./sky-feedback.scss"></style>
<template src="./sky-feedback.html"></template>
