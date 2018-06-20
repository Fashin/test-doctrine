'use strict';

module.exports.sockets = (socket, io, user) => {
	socket.on('user_inventory_req', (data) => {
		io.emit('user_inventory_res', {
			inventory: user.toString()
		});
	});

	socket.on('user_use_item_req', (data) => {
		let item;
		if ((item = user.useItem(data.id)))
			io.emit('user_use_item_res', {
				item: item
			});			
	});

	socket.on('user_tresor_req', () => {
		io.emit('user_tresor_res', {
			tresor: user.tresorToString()
		});
	});
}