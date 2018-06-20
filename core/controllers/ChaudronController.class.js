'use strict';

const Helper = require('./Helper.class.js');

module.exports = class Chaudron extends Helper {

	constructor()
	{
		super();
		this.recettes = require('../config/1.json');
		this.content = new Array();
	}

	addItem(item_id)
	{
		return (this.content.push(parseInt(item_id)));
	}

	mixAndTwist()
	{
		let recettes = this.recettes;
		let content = this.content;

		this.content = new Array();
		for (let i in recettes)
			if (this.compareArray(recettes[i].ingredients, content))
				return (i);
		return (false);
	}

	toString()
	{
		return (this.content);
	}

}