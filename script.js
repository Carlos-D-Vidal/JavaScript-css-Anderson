import {data} from  "./database.js"
const btnNav = document.querySelectorAll("#btn-nav")

console.log(btnNav)
btnNav.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        separaCategorias(btn.innerText)
    })
})
function renderProducts(list=[]){
    const ul = document.querySelector("#products")
    ul.innerHTML = ""
    list.forEach((item)=>{
        ul.insertAdjacentHTML("afterbegin",`
        <li>
        <img src="${item.img}">
        <h3>  ${item.tag} </h3>
        <div class="div-texts">
            <p class="p-name">${item.nameItem}</p>
            <p class="p-descr">${item.description}</p>
            <p class="p-value">R$ ${item.value}</p>
        </div>
        <button class="btn-add">Adicionar ao carrinho</button>
    </li>
        `)
        const btnAdd = document.querySelector(".btn-add")
        btnAdd.addEventListener("click",()=>{
        addToCart(item)
        })
    })
    
}
renderProducts(data)
let cartList = []
function addToCart(item){
    // console.log(cartList.length)
    if(cartList.length==0){
        item.id = 1
    }else{
        item.id = cartList[cartList.length-1].id +1
    }
    cartList.push(item)
    console.log(item)
    // const index =cartList[cartList.length]
    renderCart(cartList)
}
function renderCart(list=[]){
    const ulCart = document.querySelector("#cart")
    ulCart.innerHTML = ""
    list.forEach((item)=>{
        ulCart.insertAdjacentHTML("afterbegin",`
        <li>
            <img src="${item.img}">
            <div id="cart">
                <p class="p-name">${item.nameItem}</p>
                <p class="p-value">R$ ${item.value}</p>
            </div>
            <button class="btn-remove">Remover produto</button>
        </li>
    `)
    const btnRemove = document.querySelector(".btn-remove")
    btnRemove.addEventListener("click",()=>{
        removeToCart(item)
    })
    })
}
function removeToCart(item){
    const index = cartList.findIndex((cart)=>cart.id == item.id)
    cartList.splice(index,1)
    renderCart(cartList)
    console.log(cartList)
}

function separaCategorias(categoria){
    
    console.log(categoria)
    if(categoria != "Todos"){
        const filterArray = data.filter((item)=>{
            return item.tag[0] == categoria
        })
        renderProducts(filterArray)
    }else{
        renderProducts(data)
    }
      
}

let newArray = []
for(let i =0;i<data.length;i++){
    if(data[i].tag[0] == "Acessórios"){
        newArray.push(data[i])
    }
}
const filterArray = data.filter((item)=>{
    return item.tag[0] == "Camisetas"
})
console.log(filterArray)

const input = document.querySelector("input")
input.addEventListener("input",(event)=>{
    const filter = data.filter((item)=>{
        return item.nameItem.includes(event.target.value) || item.tag[0].includes(event.target.value)
    })
    renderProducts(filter)
})
