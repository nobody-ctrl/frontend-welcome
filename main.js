$( document ).ready(function() {
    $("#logout").click(
        function(){
            localStorage.removeItem('token');
            window.location.href = "http://5.187.6.96/login/";
        }
    );
});
