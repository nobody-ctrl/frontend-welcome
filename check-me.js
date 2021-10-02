function check(){
    var url = "http://5.187.6.96:3000/auth/welcome/";
    if( localStorage.getItem('token')){
        var token = localStorage.getItem('token');
        var obj ={};
        obj["token"] = token;
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
