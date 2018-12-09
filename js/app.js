var isEnter = false;

//document.oncontextmenu = new Function("return false");

function openImage(image) {
	var modal = document.getElementById('myModal');

	var img = image;
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");
	modal.style.display = "block";
	modalImg.style.maxWidth = screen.width;
	modalImg.style.maxHeight = screen.height;
	modalImg.src = img.src;
	modalImg.style.width = "600px";
	modalImg.style.height = "400px";
	modalImg.style.opacity = "1";
	captionText.innerHTML = img.alt;

	var span = document.getElementsByClassName("close")[0];

	span.onclick = function() { 
	    modal.style.display = "none";
	}
}

function openRegForm() {
	var modal = document.getElementById('regForm');
    modal.style.display = "block";

	var span = document.getElementById("closeReg");
	span.onclick = function() { 
	    modal.style.display = "none";
	}
}

function openEnterForm() {
	var modal = document.getElementById('enterForm');
    modal.style.display = "block";

	var span = document.getElementById("closeEnter");
	span.onclick = function() { 
	    modal.style.display = "none";
	}
}

function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('td');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
	    container.removeChild(container.lastChild);
	}
}

function validate(form) {
    var elems = form.elements;
    var isErrorInclude = false;

    resetError(elems.firstName.parentNode);
    if (!elems.firstName.value) {
        showError(elems.firstName.parentNode, ' Укажите имя.');
        isErrorInclude = true;
    } 

    resetError(elems.lastName.parentNode);
    if (!elems.lastName.value) {
        showError(elems.lastName.parentNode, ' Укажите фамилию.');
        isErrorInclude = true;
    }

    resetError(elems.psw1.parentNode);
    if (!elems.psw1.value) {
        showError(elems.psw1.parentNode, ' Укажите пароль.');
        isErrorInclude = true;
    } else if (elems.psw1.value != elems.psw2.value) {
        showError(elems.psw1.parentNode, ' Пароли не совпадают.');
        isErrorInclude = true;
    }

    resetError(elems.email.parentNode);
    if (!elems.email.value) {
	    showError(elems.email.parentNode, ' Укажите email.');
	    isErrorInclude = true;
	} else {
	  	console.log('email = ' + elems.email.value);
	   	if (elems.email.value == 'user01@mail.ru') {
	   		showError(elems.email.parentNode, ' Пользователь с таким email уже существует.');
	       	isErrorInclude = true;
	   	}
	}

	if (!isErrorInclude && !isValidEmail() && !isValidPassword()) {
	   	alert('Регистрация прошла успешно');
	}

}

function isValidEmail() {
	email = document.getElementById('prEmail');
	var isErrorInclude = false;

	const emailRegex = /^[a-z0-9][\w_-]*@[a-z]+\.[a-z]+$/i;
	resetError(email.parentNode);
	if (!emailRegex.test(email.value) && (email.value)) {
		showError(email.parentNode, 'Формат e-mail указан неверно');
		isErrorInclude = true;
	}

	return isErrorInclude;
}

function isValidPassword() {
	password = document.getElementById('prPsw1');
	var isErrorInclude = false;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,30}&/;
	const passInt = /(?=.*[0-9])/;
	const passChar = /(?=.*[a-z])/;
	const passBigChar = /(?=.*[A-Z])/;
	const passSpecChar = /(?=.*[^\w\s])/;
	const passLength = /^.{6,30}&/;
	resetError(password.parentNode);
	if (!passwordRegex.test(password.value) && (password.value)) {
		var error = 'Формат пароля неверен:<br \/>';
		if (!passInt.test(password.value)) {
			error += 'Должна сожержаться как минимум одна цифра.<br \/>';
    	}
    	if (!passChar.test(password.value)) {
    		error += 'Должен содержаться как мимимум один строчной символ латинского алфавита.<br \/>';
    	}
    	if (!passBigChar.test(password.value)) {
    		error += 'Должен содержаться как мимимум один прописной символ латинского алфавита.<br \/>';
    	}
    	if (!passSpecChar.test(password.value)) {
    		error += 'Должен содержаться как мимимум один спецсимвол.<br \/>';
    	}
    	if (!passLength.test(password.value)) {
    		error += 'Длина пароля неверна.<br \/>';
    	}
    	showError(password.parentNode, error);
    	isErrorInclude = true;
    }

	return isErrorInclude;
}

function validateEnter(form) {
	var elems = form.elements;
	var enterTitle = document.getElementById('enterTitle');
   	var isErrorInclude = false;

   	resetError(elems.email.parentNode);
   	if (!elems.email.value) {
      	showError(elems.email.parentNode, ' Укажите имя.');
       	isErrorInclude = true;
   	}

   	resetError(elems.psw1.parentNode);
	if (!elems.psw1.value) {
	    showError(elems.psw1.parentNode, ' Укажите пароль.');
	    isErrorInclude = true;
	} 

	resetErrorEnter();
	if (elems.email.value && elems.psw1.value) {
		if (elems.email.value != 'user@user.ru' || elems.psw1.value != 'user01') {
			var msgElem = document.createElement('p');
			msgElem.innerHTML = 'Пользователя с таким логином/паролем не существует.';
			msgElem.className = "error-enter";
			enterTitle.insertAdjacentElement("afterEnd", msgElem);
		    isErrorInclude = true;
		} else {
		  	isEnter = true;
		  	var modal = document.getElementById('enterForm');
		   	modal.style.display = "none";
		   	var enter = document.getElementById('enter');
		   	enter.style.display = "none";
		   	var enterAfter = document.getElementById('enterAfter');
		   	enterAfter.style.display = "block";
		}
	}
}

function resetErrorEnter() {
   	var entForm = document.getElementById('entForm');
	var elems = document.getElementsByClassName('error-enter');
	if (elems.length !== 0) {
		var el = elems[0];
		entForm.removeChild(el);
	}
}

function exit() {
	isEnter = true;
	var enter = document.getElementById('enter');
	enter.style.display = "block";
	var enterAfter = document.getElementById('enterAfter');
	enterAfter.style.display = "none";
}

function validateComment() {
	var comment = document.getElementById('commentText');

	if (!isEnter) {
		alert('Комментарии могут оставлять только зарегистрированные пользователи.');
	} else {
		if (!comment.value) {
			alert('Вы не можете оставить пустой комментарий.');
		} else if (comment.value.length > 250){
			alert('Максимальная длина комментария 250 символов.');
			comment.value = null;
		} else {
			var contentComments = document.createElement('div');
			contentComments.className = "contentComments";
			var userName = document.createElement('p');
     		userName.innerHTML = 'user01';
     		userName.className = "userName";
      		var userText = document.createElement('p');
      		userText.innerHTML = comment.value;
      		userText.className = "userText";
      		contentComments.appendChild(userName);
      		contentComments.appendChild(userText);

      		var comments = document.getElementsByClassName('contentComments');
      		comments[comments.length - 1].insertAdjacentElement("afterEnd", contentComments);
      		comment.value = null;
		}
	}
}
