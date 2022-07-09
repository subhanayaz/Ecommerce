let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  // loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

// let loginForm = document.querySelector('.login-form');

// document.querySelector('#login-btn').onclick = () => {
//   loginForm.classList.toggle('active');
//   searchForm.classList.remove('active');
//   shoppingCart.classList.remove('active');
//   navbar.classList.remove('active');
// }

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
}

window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  // loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});



// cart
let cartIcon = document.querySelector('#cart-btn');
let cart = document.querySelector('.shopping-cart');


// cart working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
}
else {
  ready();
}


// Making function
function ready() {
  // remove items from cart
  var removeCartButtons = document.getElementsByClassName('fa-trash');
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  // quantity changes
  var quantityInputs = document.getElementsByClassName('cart-quantity')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener("change", quantityChanged);
  }
  // add to cart
  var addCart = document.getElementsByClassName('add-cart')
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i]
    button.addEventListener("click", addCartClicked);
  }

}


// remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal()
}
// quantity Changes
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updatetotal();
}

// add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('box');
  var cartItems = document.getElementsByClassName('shopping-cart')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart");
      return;
    }
  }
  var cartBoxContent = `
                <img src="${productImg}" alt="" class="cart-img">
                <div class="content">
                    <h3 class="cart-product-title" name="Cart">${title}</h3>
                    <span class="quantity">qty : <input type="number" value="1" class="cart-quantity" name="Quantity"> Kg</span>
                    <br><br>
                    <span class="price cart-price">${price}</span>
                </div>
                <i class="fas fa-trash"></i>            
                `;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('fa-trash')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}

// update total
function updatetotal() {
  var cartContent = document.getElementsByClassName('shopping-cart')[0];
  var cartBoxes = cartContent.getElementsByClassName('box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("Rs. ", ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    // if price contain any cent value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "Rs. " + total;
  }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwSXe_ukc5FLx0g3XOjtD1y51eF3x6T43DM5F58xu2UM2ZlCoxz_PiOjtoWu_l6UNdb/exec'
const form = document.forms['google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => alert("Thanks❤ Your order has been placed😍. You will be receiving the updates through Whatsapp.."))
    .catch(error => alert("Error!", error.message))
})
