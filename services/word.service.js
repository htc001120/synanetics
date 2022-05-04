"use strict";

const xray = require("x-ray")();

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "word",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		count: {
			rest: "/count",
			params: {
				url: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const url = ctx.params.url;
				const content = await this.fetchUrl(decodeURIComponent(url));
				return this.countWord(content);
			},
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {
		fetchUrl: async function (url) {
			console.log(url);
			return xray(url, "body");
		},
		countWord: function (content) {
			const words = content.trim().split(/\s+/);
			return words.length;
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
