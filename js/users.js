const add = document.querySelector("#add")
const tbody = document.querySelector("#tbody")
const addTransaction = document.querySelector("#addTransaction")
readFromStorage = (storageKey) => {
    let data
    try{
        data = JSON.parse(localStorage.getItem(storageKey))||[]
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
writeToStorage = (storageKey, data) => localStorage.setItem(storageKey, JSON.stringify(data))
const show=(id)=>{
    console.log(id)
    writeToStorage("id", id)
    window.location.href="single.html"
}

const showAddTransaction=(id)=>{
    console.log(id)
    writeToStorage("id", id)
    window.location.href="addTransaction.html"
}

const del = (id)=>{
    const data = readFromStorage("customers")
    data.splice(id, 1)
    writeToStorage("customers", data)
    display(data)
}
display = (data) => {
    tbody.innerHTML=""
    if(data.length == 0){
        tbody.innerHTML+=`<tr>
            <td colspan="4" class="bg-danger text-white text-center">no users yet</td>
        </tr>
        `;
    }
    else{
        data.forEach((customer, i) => {
            tbody.innerHTML+=`
            <tr>
            <td>${customer.accNum}</td>
            <td>${customer.name}</td>
            <td>${customer.balance}</td>
            <td>
            <button class="btn btn-danger mx-3" onClick="show(${i})">show</button>
            <button class="btn btn-danger mx-3">Edit</button>
            <button class="btn btn-danger mx-3" onClick = del(${i})>delete</button>
            <button class="btn btn-danger mx-3" onClick= showAddTransaction(${i})>Add transaction</button>

            </td>
        </tr>
            `
        });
    }    

}

if(add){
    add.addEventListener("submit", (e)=>{
        e.preventDefault()
        let customerData = {
            accNum:Date.now(), 
            transactions:[],
            name: add.elements.name.value,
            balance: add.elements.balance.value,
        }
        const data = readFromStorage("customers")
        data.push(customerData)
        writeToStorage("customers", data)
        window.location.href="index.html"
    })
}
if(tbody){
    const data = readFromStorage("customers")
    display(data)
}
const single=document.querySelector("#single")
if(single){
    const id = localStorage.getItem("id")
    const data = readFromStorage("customers")
    if(id>data.length || id<0) { 
        single.innerHTML=`<p class="alert alert-danger">Invalid id</p>`
    }
    else
        single.innerHTML=`
            <li>${data[id].accNum}</li>
            <li>${data[id].name}</li>
            <li>${data[id].balance}</li>`
}
if(addTransaction){
    addTransaction.addEventListener("submit", (e)=>{
        e.preventDefault()
        const trans = {
            tType: addTransaction.elements.tType.value, 
            tValue: addTransaction.elements.balance.value
        }
        const id = localStorage.getItem("id")
        const data = readFromStorage("customers")
        data[id].transactions.push(trans)
        console.log(trans)
        if(trans.tType=="withdraw") 
            data[id].balance = +data[id].balance - +trans.tValue
        else
            data[id].balance = +data[id].balance + +trans.tValue
        writeToStorage("customers", data)
        window.location.href="index.html"
    })
}