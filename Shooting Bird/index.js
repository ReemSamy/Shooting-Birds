window.addEventListener('load',function()
{
  let input= document.querySelector('input');
  let button = document.querySelector('.go');
  let nameTextBoxError=document.querySelector('#error');
 

  function retunData()
    {localStorage.setItem("name",input.value);}  
  button.addEventListener('click',function(){

    if(input.value=="")
    {
    nameTextBoxError.classList.remove("hidden");
    }
    else
    {
    nameTextBoxError.classList.add("hidden");
    retunData();
    window.location.href="../game.html";
    }
  });
});