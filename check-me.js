function goTo(course) {
	if(course in [0, 1, 2]){
        	window.location.href = "http://5.187.6.96/courses/?course_id="+course;
	}
}
function makeCourse(course, num) {
	var string = "";
	string += "<div class='card' style='max-width: 1000px; margin: auto; margin-top: 100px;'><div class='card-header'>Курсы </div><div class='card-body'><h5 class='card-title'>Подготовка к ";
	string += course;
	string += "</h5><button onclick='goTo(" + num  + ")' class='btn btn-primary' id='"+num+"'>Перейти к модулю</button></div></div>";
	$("#mainblock").append(string);
}

function check(){
    var url = "http://5.187.6.96:3000/auth/welcome/";
    if( localStorage.getItem('token')){
        var token = localStorage.getItem('token');
        var obj ={};
        obj["token"] = token;
	obj["wanted"] = "courses";
        var formData = JSON.stringify(obj);
        //make request to server to validate token
        jQuery.ajax({
            url:     url, //url страницы (action_ajax_form.php)
            type:     "POST", //метод отправки
            contentType: "application/json",
            dataType: "json", //формат данных
            data: formData,  // Сеарилизуем объект
            success: function(response) { //Данные отправлены успешно
                $("#mainblock").removeClass("hidden");
		var courses = response["message"][0][0]["courses"];
		courses =courses.split(',').map(Number);
		for (el in courses) {
			if( el == 0) makeCourse("Kerntest", 0);
			else if (el == 1 ) makeCourse("Modul: Ingenieurwissenschaften", 1);
			else makeCourse("Modul: Mathematik, Informatik und Naturwissenschaften", 2);
		}
            },
            error: function(response) { // Данные не отправлены
                localStorage.removeItem('token', response.token);
                window.location.href = "http://5.187.6.96/login/";
            }
        });
    }else{
        window.location.href = "http://5.187.6.96/login/";
    }
    
};

check();
