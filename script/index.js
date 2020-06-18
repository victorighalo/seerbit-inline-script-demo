"use strict";
var demoApp = {
    total: 0,
    cart_total_cost: 0,
    available_quantities: [
        1, 2, 3
    ],
    productsCopy: undefined,
    products: [
        {
            id: 11,
            name: 'Product 1',
            price: 50,
            description: 'A description of product 1',
            qty: 1
        }, {
            id: 12,
            name: 'Product 2',
            price: 50,
            description: 'A description of product 2',
            qty: 1
        }, {
            id: 13,
            name: 'Product 3',
            price: 50,
            description: 'A description of product 3',
            qty: 1
        },
    ],
    setTotalCart: function (balance, total) {
        document.querySelectorAll(".cart_total").forEach(function (el) {
            el.innerHTML = balance || demoApp.balance || 0
        })
        
        document.querySelector("#cart_total_items").innerHTML = total || demoApp.total || 0
    },
    triggerRemoveListener: function () {
        document.querySelectorAll('.btn-remove').forEach(function (item) {
            item.addEventListener('click', function (evt) {

                if (demoApp.productsCopy) {
                    var transformed_products = demoApp.productsCopy.filter(function (item, index) {
                        return evt.target.id != item.id
                    });
                    demoApp.productsCopy = transformed_products;

                } else {
                    var products = demoApp.products.slice(0, demoApp.products.length);
                    var transformed_products = products.filter(function (item, index) {
                        return evt.target.id != item.id
                    });
                    demoApp.productsCopy = transformed_products;

                } demoApp.loadProductsList(demoApp.productsCopy);
            }, false)
        })
    },
    loadProductsList: function (alternateProducts) {

        var products = alternateProducts || this.products

        var productsContainer = document.createDocumentFragment();
        products.forEach(function (item, index) {

            var productContainer = document.createElement("div");
            productContainer.className = 'description';

            var productHeader = document.createElement("h1")
            productHeader.innerHTML = item.name;

            var productDescription = document.createElement("p")
            productDescription.className = 'description-text'
            productDescription.innerHTML = item.description;

            var productPrice = document.createElement("h2")
            productPrice.innerHTML = 'N' + item.price;

            var removeButton = document.createElement("button")
            removeButton.className = 'btn-remove';
            removeButton.id = item.id;
            removeButton.innerHTML = 'Remove';

            productContainer.appendChild(productHeader).appendChild(productDescription).appendChild(productPrice)

            productContainer.append(removeButton)


            var productBag = document.createElement("div");
            productBag.className = 'bag-product';
            productBag.appendChild(productContainer)

            productsContainer.appendChild(productBag)

        });
        document.querySelector(".product-list").innerHTML = "";
        document.querySelector(".product-list").append(productsContainer);

        var cart_total_cost = 0;
        var cart_total = 0;
        products.forEach(function (item, index) {
            cart_total_cost += item.price;
            cart_total += 1;
        });
        demoApp.cart_total_cost = cart_total_cost;
        demoApp.cart_total = cart_total;
        demoApp.setTotalCart(cart_total_cost, cart_total)

        demoApp.triggerRemoveListener()
    }
}


demoApp.setTotalCart();
demoApp.loadProductsList();

function paywithSeerbit() {
    SeerbitPay({
        "tranref": new Date().getTime(),
        "currency": "GHS",
        "description": "TEST",
        "country": "GH",
        "amount": demoApp.cart_total_cost,
        "callbackurl": "http://yourdomain.com",
        "public_key": "SBTESTPUBK_p8GqvFSFNCBahSJinczKd9aIPoRUZfda", // replace this with your own public key
    }, function callback(response) {
        console.log(response) /*response of transaction*/
    }, function close(close) {
        console.log(close) /*transaction close*/
    })
}

