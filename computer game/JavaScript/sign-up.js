

function addUser(name, mail, number, password) {
	let player = {
		name: document.getElementById("new-name").value,
		Email: document.getElementById("new-email").value,
		number: document.getElementById("new-number").value,
		password: document.getElementById("new-password").value,
	};
	if (!localStorage.getItem('players')) {
		localStorage.setItem('players', JSON.stringify([])); 
	}
	let users = JSON.parse(localStorage.getItem('players'));
	if (users.find(u => u.password == password && u.mail == Email)) {
		alert("The User already exist, Please Log-In");
	}
	else {
		users.push(player);
		localStorage.setItem("current_user", JSON.stringify(name));
		localStorage.setItem("players", JSON.stringify(users));
	}
	window.location.href = "../HTML/explanation.html";
}




function logIn() {
	let isExist = false;
	let Umail = document.getElementById("email").value;
	let Upassword = document.getElementById("password").value;
	let users = JSON.parse(localStorage.getItem("players"));
	let j;
	for (let i = 0; i < users.length; i++) {
		if (users[i].password == Upassword && users[i].Email == Umail) {
			isExist = true;
			j = i;
		}
	}
	if (isExist) {
		localStorage.setItem("current_user", JSON.stringify(users[j]));
		url();
	}
	else {
		alert("The User does not exist, Please sign-Up");
	}
}

function url(){
	location.href = "../HTML/explanation.html";
}



function signOut() {
	let current_user_name = JSON.parse(localStorage.getItem('current_user'));
	localStorage.setItem("current_user", JSON.stringify(""));
	let users = JSON.parse(localStorage.getItem('players'));
	for (let i = 0; i < users.length; i++) {
		if (users[i] == current_user_name) {
			window.location.href = "../HTML/home-page.html";
			users.splice(i, i);
			localStorage.setItem("players", JSON.stringify(users));
			break;
		}
	}
}
