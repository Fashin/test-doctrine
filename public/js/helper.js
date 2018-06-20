let add_experience = (pourcentage) => {
	let percent = (pourcentage - parseInt(pourcentage)) * 100 + '%';

	$('.barre_xp .avancement').css({'width': percent});
	$('.barre_xp .text').text('Level : ' + Math.round(pourcentage * 100) / 100);
}

let fill_display = (info) => {
	for (let i in info)
		$('.display').append("<div class='item' item-id=" + info[i].id + "> \
			<img class='item-icon' src=/img/ingredient/" + info[i].picture + "> \
			<div>" + info[i].title + "</div> \
			<div>" + info[i].quantity + "</div>\
			</div>");
	$('.display').show(200);
}

let fill_logs = (logs) => {
	let text = "";

	for (let i in logs)
		text += (logs[i]) ? '<p>Vous avez obtenu : ' + logs[i] + '</p>' : '<p>La recette a échouée</p>';
	$('.logs').append(text);
}