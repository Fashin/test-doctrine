'use strict';

module.exports.sockets = (socket, io, user) => {

	socket.on('user_want_mix_req', () => {
		let item_id = user.chaudron.toString();
		let ret = new Array();
		let id;
		
		for (let i in item_id)
			if ((id = user.haveItem(item_id[i])))
				ret.push(user.inventory[id].title);
		io.emit('user_want_mix_res', {
			ingredient: ret
		});
	});

	socket.on('user_mix_and_twist_req', () => {
		let response = user.chaudron.mixAndTwist();

		if (response)
		{
			let item = user.chaudron.recettes[response];

			user.level += item.xp;
			user.tresor.push(item.id)
		}
		user.logs.push(response);
		io.emit('user_mix_and_twist_res', {
			response: response,
			level: user.level
		});
	});
}