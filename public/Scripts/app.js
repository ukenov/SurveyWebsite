$(function(){
    if($("div").is('.add_page')){
        // delay for button click to create a survey
        document.getElementById('create_survey').addEventListener('click', () => {
            setTimeout(function () { 
                window.location.href = "/survey-list/questions"; 
            }, 3000);
        });
    }
    else if($("div").is('.questions_page')) {
        // hide multiple options if multiple not selected
        let x = document.getElementById("inputGroupSelect");

        x.addEventListener("change", function() {   
            console.log(x.value);
            if(x.value == "Multiple")
            {
                document.getElementById("options").style.display = "block"; 
            }
            else
            {
                document.getElementById("options").style.display = "none"; 
            }
        });
    }
});






