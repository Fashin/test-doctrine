(function(){

	var socket = io();

	socket.on('init', (data) => {
		add_experience(data.user.level);
		fill_logs(data.user.logs);
	});

	$('.tresor').click((e) => {
		if ($('.display').is(':visible'))
			$('.display').hide(200, () => {
				$('.display').children().remove();
			});
		else
			socket.emit('user_tresor_req');
	});

	socket.on('user_tresor_res', (data) => {
		fill_display(data.tresor);
	});

	// Event d'affichage de l'inventaire
	$('.inventory').click((e) => {
		if ($('.display').is(':visible'))
			$('.display').hide(200, () => {
				$('.display').children().remove();
			});
		else
			socket.emit('user_inventory_req');
	});

	// Recuperation depuis le serveur de l'inventaire & transformation en html
	socket.on('user_inventory_res', (data) => {
		fill_display(data.inventory);
	});

	// Ajout d'un item dans le chaudron & envoie du socket correspondant
	$('.display').on('click', '.item', (e) => {
		let tar = $(e.currentTarget);

		socket.emit('user_use_item_req', {
			id: tar.attr('item-id')
		});
	});

	// Reception de l'utilisation (ou non) de l'ingredient & update affichage html
 	socket.on('user_use_item_res', (data) => {
		let item = data.item;

		$('.display .item').each((k, v) => {
			if ($($(v)[0]).attr('item-id') == item.id)
				$($($(v)[0]).children()[2]).text(item.quantity);
		});
	});

 	// Envoie du signal pour melanger le contenu du chaudron
	$('.spoon').click((e) => {
		socket.emit('user_want_mix_req');
	});

	// Confirmation des ingredients dans le chaudron & envoie du signal correspondant
	socket.on('user_want_mix_res', (data) => {
		let ingredients = data.ingredient;
		let text = "Etes vous sur de vouloir melanger les ingredients suivants : \n";

		if (!ingredients.length)
		{
			alert("Vous devez mettre des ingredients dans votre chaudron d'abord !");
			return (false);
		}
		for (let i in ingredients)
			text += "-> " + ingredients[i] + "\n";
		if (confirm(text))
			socket.emit('user_mix_and_twist_req');
	});

	// Reception de la reponse si elle a fait effet ou non, augmente la barre d'xp en consequence et rafraichit les logs
	socket.on('user_mix_and_twist_res', (data) => {
		let text = (data.response) ? '<p>Vous avez obtenu : ' + data.response + '</p>' : '<p>La recette a échouée</p>';
		add_experience(data.level);

		$('.logs').html(text);
		$('.logs').animate({
			left: "+=100%"
		}, 500, () => {
			$('.logs').delay(2500).animate({
				left: "-=100%"
			}, 500);
		});
	});


})();