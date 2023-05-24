let productButton = document.querySelectorAll("#buttons")
let payment = document.querySelector(".payment")
let close = document.querySelector(".close")
console.log(productButton)

productButton.forEach(choice => choice.addEventListener('click', (e)=>{
  e.preventDefault()
  payment.style.display = "flex";
  console.log("clck")
}))



close.addEventListener("click", () => {
  payment.style.display = "none";
});