document.addEventListener('DOMContentLoaded', loadProductsFromLocalStorage);
document.getElementById('product-form').addEventListener('submit', addProduct);
document.getElementById('product-list').addEventListener('click', removeProduct);


//adicionar um produto à lista
function addProduct(e) {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    if (!isNaN(productPrice) && productPrice > 0 && productName.trim() !== "") {
        const productList = document.getElementById('product-list');
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            ${productName}: R$ ${productPrice.toFixed(2)}
            <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg button>
        `;

        productList.appendChild(listItem);
        saveProductToLocalStorage(productName, productPrice);
        updateTotal(productPrice);
        
        document.getElementById('product-form').reset();
    } else {
        alert('Por favor, insira um nome de produto válido e um preço positivo.');
    }
}

//  remover um produto da lista
function removeProduct(e) {
    if (e.target.classList.contains('delete')) {
        const listItem = e.target.parentElement;
        const price = parseFloat(listItem.textContent.match(/R\$ (\d+\.\d{2})/)[1]);

        removeProductFromLocalStorage(listItem.textContent);
        listItem.remove();
        updateTotal(-price);
    }
}

//  atualizar o total dos preços dos produtos
function updateTotal(price) {
    const totalPriceElement = document.getElementById('total-price');
    const currentTotal = parseFloat(totalPriceElement.textContent);
    const newTotal = currentTotal + price;
    totalPriceElement.textContent = newTotal.toFixed(2);
}

// salvar um produto no localStorage
function saveProductToLocalStorage(name, price) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, price });
    localStorage.setItem('products', JSON.stringify(products));
}

// carregar produtos do localStorage ao carregar a página
function loadProductsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    let total = 0;

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.name}: R$ ${product.price.toFixed(2)}
            <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg button>
        `;
        productList.appendChild(listItem);
        total += product.price;

        updateAutocomplete(product.name);
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}
    
//atualizar a lista de oplçoes do autocomplete
function updateAutocomplete(productName) {
    const datalist = document.getElementById('products');
    const optionExists = Array.from(datalist.options).some(option => option.value === productName);

    if (!optionExists) {
        const option = document.createElement('option');
        option.value = productName;
        datalist.appendChild(option);
    }
}

//remover um produto do localStorage
function removeProductFromLocalStorage(productText) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productName = productText.split(':')[0].trim();
    const productPrice = parseFloat(productText.match(/R\$ (\d+\.\d{2})/)[1]);

    products = products.filter(product => product.name !== productName || product.price !== productPrice);
    localStorage.setItem('products', JSON.stringify(products));
}
