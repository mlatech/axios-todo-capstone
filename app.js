
const form = document.form //selecting the form
//axios.get(url/id) --find
function getData() {
    axios.get("https://api.vschool.io/karyna/todo")
        .then(response => createTodo(response.data))
        .catch(err => alert(err))
}
getData()
//delete todo function          
const deleteFunc = function (li, todo) {
    axios.delete("https://api.vschool.io/karyna/todo/" + todo._id)
        .then(response => alert(`${todo.title} successfully deleted!`))
        .catch(error => alert(error))
    li.remove()
}
//checkbox function
const checkboxFunc = function (itemId, todoObject) {
    
    axios.put("https://api.vschool.io/karyna/todo/" + itemId, todoObject)
      
        .then(res => console.log(res.data), alert(`completed!`))
        .catch(error => alert(error))
}


//clears list on page 
function clearList() {
    const elemnt = document.getElementById('list')
    while (elemnt.firstChild) {
        elemnt.removeChild(elemnt.firstChild)
    }
}

//create html elements/ make it show to the user
function createTodo(todo) {
    for (let i = 0; i < todo.length; i++) {
        const todoId = todo[i]._id
        const li = document.createElement('li')
        li.setAttribute('id', 'li')
        li.textContent = todo[i].title + " " + todo[i].price 
        document.getElementById('list').appendChild(li)
      
        // use appendChild to add checkbox and delete buttons to each new li
        const check = document.createElement('input')
        check.type = 'checkbox'
        check.setAttribute('id', 'check')
        li.appendChild(check)
        li.classList.add(`.li${todo[i]._id}`)
        if (todo[i].completed) {
            li.style.textDecoration = "line-through"
        }
        else {
            li.style.textDecoration = "none"
        }
        check.classList.add(`check${todo[i]._id}`)
        const selectedCheck = document.querySelector(`.check${todo[i]._id}`)

        selectedCheck.addEventListener('click', e => {
            if (todo[i].completed === true) {

                const selectedCheck = document.querySelector(`.check${todo[i]._id}`)

                let checked = {
                    completed: false
                }
                checkboxFunc(todoId, checked)
                li.style.textDecoration = "none"
                return selectedCheck.checked = false
            }
            else if (todo[i].completed === false) {
                const selectedCheck = document.querySelector(`.check${todo[i]._id}`)
                let notChecked = {
                    completed: true
                }

                checkboxFunc(todoId, notChecked)
                li.style.textDecoration = "line-through"
                return selectedCheck.checked = true
            }

        })//append delete button
        const delBtn = document.createElement('button')
        delBtn.textContent = "X"
        delBtn.setAttribute('id', 'delete')
        li.appendChild(delBtn)

        delBtn.addEventListener('click', e => {
            const item = delBtn.parentElement
            deleteFunc(item, todo[i])
        })
    }
}

//eventlistener for submit button
form.addEventListener('submit', function (e) {
    e.preventDefault()
    clearList()
    //get user input and store it.. grabs text and puts it in a new object to send in a post request
    const newItem = {
        title: form.title.value,
        price: form.price.value,
        description: form.description.value,
        imgUrl: form.image.value
    }

    //clear form after submit
    form.title.value = ""
    form.price.value = ""
    form.description.value = ""
    form.image.value = ""


    //sends post request to my api and adds new todo to it 
    axios.post("https://api.vschool.io/karyna/todo", newItem)
        .then(response => getData())//when it comes back, get all data (including new item that was just added)
        .catch(error => alert(error))



})
