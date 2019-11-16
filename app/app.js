function myclick(){
    var button1=document.querySelectorAll('.btn1');
    button1[0].addEventListener("click",()=>{
        console.log("Click here" );
        button1[0].classList.add("backgroundbutton");
    });

    var btn2=document.querySelector('.btn2');
    btn2.addEventListener('click',()=>{
        btn2.classList.add("backgroundbutton");
    });
}