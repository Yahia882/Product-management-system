// get total
// create product
// save localstorge
// clear inputs
// read data
// delete item
// delete all data
// count
// update
// search
// clean data


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumit = document.getElementById('sumit');
let mood = 'create';
let temp;
let searchMood = 'title'; 


// get total
function getTotal()
{
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
let dataProduct;
if (localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else {
    dataProduct = [];
}

sumit.onclick = function()
{
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    // clean Data
    if(title.value != '' && price.value != '' && newProduct.count <= 150){
        if (mood == 'create') 
        {
                // count
                if(newProduct.count > 1)
                {
                    for(let i = 0; i < newProduct.count; i++)
                    {
                        dataProduct.push(newProduct);
                    }
                }
                else
                {
                    dataProduct.push(newProduct);
                }
        }
        else
        {
            dataProduct[temp] = newProduct;
            mood = 'create';
            sumit.innerHTML = 'Create';
            count.style.display='block';
        }
        clearInputs();
    }



    


    // save localstorge
    localStorage.setItem('product', JSON.stringify(dataProduct));
    readData();
}


/*
// create product
let dataProduct = [];
sumit.onclick = function()
{
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    dataProduct.push(newProduct)
    localStorage.setItem('product', JSON.stringify(dataProduct))
}
*/

// clear inputs
function clearInputs()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read data
function readData()
{
    getTotal();
    let table = '';
    for (let i = 0; i < dataProduct.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnData = document.getElementById('deleteAll');
    if (dataProduct.length > 0)
    {
        btnData.innerHTML = `
        <button onclick="deleteAllData()">Delete All (${dataProduct.length})</button>
        `
    }else{
        btnData.innerHTML = '';
    }
}
readData();


// delete item
function deleteItem(i)
{
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    readData();
}


// delete all data
function deleteAllData()
{
    localStorage.clear();
    dataProduct.splice(0);
    readData();
}

function updateData(i)
{
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display='none';
    category.value = dataProduct[i] .category;
    sumit.innerHTML = 'Update'
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


// Search 
function getSearchMood(id)
{
    let search = document.getElementById('search');
    if (id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    readData();
}

// Search Data
function searchData(value){
    let table = '';
    if (searchMood == 'title')
    {
        for(let i = 0; i < dataProduct.length ;i++)
        {
            if(dataProduct[i].title.includes(value.toLowerCase()))
            {
                table +=
                    `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                    </tr>
                    `
            }
        }
    }
    else
    {
        for(let i = 0; i < dataProduct.length ;i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table +=
                    `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                    </tr>
                    `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
