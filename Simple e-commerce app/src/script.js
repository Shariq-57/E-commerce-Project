document.addEventListener("DOMContentLoaded", async () => {
    let cardContener = document.getElementById("card-contener");

    // cart
    let cart_div = document.getElementById("cart_div")
    let cart_contener = document.getElementById("div_contener")

    let total_price = document.getElementById("total_price")

    // checkout_btn
    let checkout_btn = document.getElementById("checkout_btn");


    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.forEach((card) => renderCart(card))

    // Fetching products and rendering
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(item => {
        let cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="w-[300px] h-[410px] p-3 rounded-2xl bg-white m-2">
        <div class="">
        <img class="w-[100%] h-[290px] p-2 py-3 border-b-2" src=${item.image} alt="">
        </div>
        <div class="mt-3 position-relative">
        <h1 class="text-2xl">${item.title.substring(0, 18)}</h1>
        <p class="text-blue-700 text-xl font-bold mt-2">$${item.price}</p>
        <button class="text-end text-2xl position-absolute right-0 top-8">
        <i data-id=${item.id} class="bi bi-cart2 p-2 shadow-2xl border-1 rounded-full" id="AddBtn"></i>
        </button>
        </div>
        </div>`;
        cardContener.appendChild(cardDiv);
    });

    // Add to cart
    cardContener.addEventListener("click", (e) => {
        if (e.target.tagName === "I") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = data.find(item => item.id === productId);
            addCart(product);
        }
    });

    checkout_btn.addEventListener("click", () => {
        cards.length = 0;
        renderCart();
        savedata();
        cart_div.classList.add("hide")
    })

    function addCart(products) {
        cards.push(products)
        savedata()
        renderCart()
        alert(`Product added are successfully`);
        console.log(cards);
    }



    function renderCart() {
        cart_contener.innerHTML = ""
        let Prices = 0;
        if (cards.length > 0) {
            cart_div.classList.remove("hide")
            cards.forEach((item, index) => {
                Prices += item.price;
                const div = document.createElement("div");
                div.innerHTML = `
                     <div class="flex p-2 border-2 rounded-2xl m-2 position-relative" >
                <div>
                    <img id="cart_img" class="p-2 w-[150px] h-[150px] rounded-2xl"
                        src="${item.image}" alt="">
                </div>
                <div class="">
                    <div class="">
                        <h1 class="text-2xl ms-3 mt-2 text-sm-start" id="cart_title">${item.title.substring(0, 50)}</h1>
                        <button
                            class="position-absolute right-6 top-4 bg-red-50 shadow-xl text-red-400 px-2 py-1 rounded-full hover:bg-red-300 hover:text-white">
                            <i class="bi bi-trash" data-id="${item.id}" id="cart_delete_btn"></i>
                        </button>
                    </div>
                    <p class="text-sm ms-3 mt-2 hidden sm:block text-zinc-400" id="cart_discription">${item.description.substring(0, 100)}</p>

                    <div class="flex items-center gap-2 ms-3 mt-3">
                        <button class="px-3 py-2 bg-slate-100 rounded-full" id="cart_dicrement_btn"> - </button>
                        <h1 id="cart_inc_dic_data">1</h1>
                        <button class="px-3 py-2 bg-slate-100 rounded-full" id="cart_increment_btn"> + </button>

                        <h1 class="position-absolute text-xl font-bold right-3 top-26 text-blue-600" id="cart_price">$${item.price}</h1>
                    </div>
                </div>
            </div>

                `;
                cart_contener.appendChild(div)
            })
            total_price.textContent = Prices;
            savedata()
        } else {
            // card_div.classList.add("hiddens")
            total_price.textContent = "0"
        }
    }

    cart_contener.addEventListener("click", (e) => {
        if (e.target.tagName === "I" && e.target.id === "cart_delete_btn") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            cards = cards.filter((item) => item.id !== productId);
            savedata();
            renderCart();
        }
    });





    function savedata() {
        localStorage.setItem("cards", JSON.stringify(cards))
    }

})
/* cart_contener.querySelector("i").addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        let productId = parseInt(e.target.getAttribute("data-id"));
        cards.filter((item) => item.id !== productId);
        // console.log(carts);
        cart_contener.remove();
    }
}) */


