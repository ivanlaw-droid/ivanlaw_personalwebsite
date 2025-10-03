    var title = document.queryselector("h1");
    title.innerHTML = "This is the title from Javascript!";

    var button = document.querySelector("#press me");

    button.addEventListener("click",myfunction);

    function myfunction(){
      alert("Let me tell you more about me!")
    }