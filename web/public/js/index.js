let image=document.getElementById("myimg11");
var monBouton = document.getElementById("monBtn11");
let count=0;

monBouton.addEventListener("click",change);

window.onload = function() {
    image.classList.remove('hidden'); // Remove the 'hidden' class to trigger the fade-in
};
function change(){
    
    if(count==0 ){
        count+=1;
        image.src="../images/3.png";
        image.style.filter= 'blur(1px) brightness(1)';
        
    } else if(count==1 ){
    count+=1;
    image.src="../images/2.png";
    image.style.filter= 'blur(1px) brightness(0.5)';
    } else{
        count=0;
        image.src="../images/1.png";
        image.style.filter= 'blur(1px) brightness(1)';

    }  
}
 function openPopup() {
     document.getElementById("popup").style.display = "block";
   }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
   }
function enableCheckout() {
    var checkinInput = document.getElementById('checkin');
    var checkoutInput = document.getElementById('checkout');

    if (checkinInput.value !== '') {
        // Set the minimum date for checkout to be one day after the selected checkin date
        var checkinDate = new Date(checkinInput.value);
        checkinDate.setDate(checkinDate.getDate() + 1); // Adding 1 day

        // Format the date as YYYY-MM-DD
        var formattedMinDate = checkinDate.toISOString().split('T')[0];
        
        checkoutInput.disabled = false;
        checkoutInput.min = formattedMinDate;
    } else {
        checkoutInput.disabled = true;
    }
}

// Set the minimum date for checkin based on the current date
document.getElementById('checkin').min = new Date().toISOString().split('T')[0];


  
   function login() {
     document.getElementById("id01").style.display = "block";
   }
  
  function signup() {
    document.getElementById("customSignUpModal").style.display = "block";

  }
  let attempt = 0;

  function validatePromo() {
     let promo = document.getElementById('promo').value;
     // Validate the promo code here...
     // If the promo code is invalid, increment the attempt counter
     if (!isValid(promo)) {
         attempt++;
         document.getElementById('promoMessage').textContent = `Promo Code Invalid! ${3 - attempt} tentatives restantes.`;
         if (attempt >= 3) {
             document.getElementById('promo').disabled = true;
             document.getElementById('promo').value = "";
             document.getElementById('promoMessage').textContent = "Promo Code Invalide! Plus de tentatives autorisés";
         }
         return false;
     } else {
         // If the promo code is valid, reset the attempt counter
         attempt = 0;
         return true;
     }
  }
  
  function isValid(promo) {
     return promo === "SUMMER2024" || promo === "";
  }

  
  document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('customPassword');
    const confirmPasswordInput = document.getElementById('customPasswordRepeat');
    const signUpForm = document.querySelector('.custom-modal-content');
    const passwordMismatchError = document.getElementById('passwordMismatchError');

    signUpForm.addEventListener('submit', function (event) {
      if (passwordInput.value !== confirmPasswordInput.value) {
        // Display error message and prevent form submission
        passwordMismatchError.textContent = 'Passwords do not match';
        event.preventDefault(); // Prevent the form from submitting
      } else {
        // Clear the error message if passwords match
        passwordMismatchError.textContent = '';
      }
    });

    // Add event listeners to clear the error message when inputs are changed
    passwordInput.addEventListener('input', function () {
      passwordMismatchError.textContent = '';
    });

    confirmPasswordInput.addEventListener('input', function () {
      passwordMismatchError.textContent = '';
    });
  });
