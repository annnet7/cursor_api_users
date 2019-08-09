(async() => {

    const USERS_API = "https://test-users-api.herokuapp.com/";
    const usersApi = axios.create({
        baseURL: USERS_API
    });
    //get all items
    const usersRespons = await usersApi.get("/users");

    let usersList = usersRespons.data.data;
    //console.log(usersList);

    function addNewRowInTable(item) {
        //console.log(item);
        var rowDiw = document.createElement('div');
        rowDiw.className = 'row';
        document.getElementById('userList').appendChild(rowDiw);

        let nameDiv = document.createElement('input');
        nameDiv.className = 'userInput';
        nameDiv.value = item['name'];
        rowDiw.appendChild(nameDiv);

        let ageDiv = document.createElement('input');
        ageDiv.className = 'userInput';
        ageDiv.value = item['age'];
        ageDiv.type = "number";
        rowDiw.appendChild(ageDiv);


        //del button
        let delButton = document.createElement('button');
        if (item._id) item.id = item._id;
        delButton.metaId = item.id;
        delButton.className = 'dellBtn';
        delButton.innerText = "Delete";
        rowDiw.appendChild(delButton);
        //save button
        let saveButton = document.createElement('button');
        saveButton.metaId = item['id'];
        saveButton.className = 'saveBtn';
        saveButton.innerText = "Save";
        rowDiw.appendChild(saveButton);

    }

    usersList.forEach(user => {
        addNewRowInTable(user);
    });

    //события на кнопку для удаления
    let delBtnList = [...document.getElementsByClassName('dellBtn')];
    // console.log(delBtnList);
    delBtnList.forEach(delButton => {
        delButton.addEventListener('click', async function() {
            console.log(this.metaId);
            //удаляю дивку
            //console.log(delButton.parentElement.parentElement);
            delButton.parentElement.remove();
            //удаляю строку на сервере
            const res = await usersApi.delete("users/" + this.metaId);
        })
    });
    //события на кнопку для изменений
    let saveBtnList = [...document.getElementsByClassName('saveBtn')];
    // console.log(delBtnList);
    saveBtnList.forEach(saveButton => {
        saveButton.addEventListener('click', function() {
            let changeName = this.parentElement.childNodes[0].value;
            let changeAge = +this.parentElement.childNodes[1].value;
            // let userAge = +document.getElementById('age').value;
            console.log(changeName, changeAge);
            usersApi.put('/users/' + saveButton.metaId, { name: changeName, age: changeAge })
                .then(function(response) {
                    console.log(response);

                })
                .catch(function(error) {
                    console.log(error);
                })
        })
    });

    //console.log(document.getElementById('name').value);
    let regUserButton = document.getElementById('regUserBtn');
    regUserButton.addEventListener('click', function() {
            let userName = document.getElementById('name').value;
            let userAge = +document.getElementById('age').value;
            console.log(userName, userAge);
            usersApi.post('/users', { name: userName, age: userAge })
                .then(function(response) {
                    console.log(response);
                    addNewRowInTable(response.data.data);
                })
                .catch(function(error) {
                    console.log(error);
                })
        })
        //add new item
        /* usersApi.post('/users', { name: 'new_old_user', age: 100 })
             .then(function(response) {
                 console.log(response);
             })
             .catch(function(error) {
                 console.log(error);
             })*/

})();