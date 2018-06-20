'use strict';

module.exports = class User {

	constructor (chaudron) {
		this.inventory = require('../config/inventaire_default.json');
		this.level = 0.0;
		this.chaudron = chaudron;
		this.logs = new Array();
		this.tresor = new Array();
	}

	haveItem(item_id) {
		let inventory = this.inventory;

		for (let i in inventory)
			if (inventory[i].id == item_id)
					return (i);
		return (false);
	}

	useItem(item_id) {
		let id = this.haveItem(item_id);

		if (id && this.inventory[id].quantity > 0)
		{
			this.chaudron.addItem(item_id);
			this.inventory[id].quantity -= 1;
			return (this.inventory[id]);
		}
		return (false);
	}

	toString() {
		return (this.inventory);
	}

	tresorToString()
	{
		let recettes = this.chaudron.recettes;
		let tresor = this.tresor;
		let ret = {};

		for (let i in tresor)
			for (let j in recettes)
				if (tresor[i] == recettes[j].id)
					if (ret[j])
						ret[j].quantity += 1;
					else
						ret[j] = {
							title: j,
							quantity: 1,
							picture: recettes[j].picture
						};
		return (ret);
	}
};