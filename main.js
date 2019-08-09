(async() => {

    function showUserCard(obj) {
        let userCardDiv = document.createElement('div');
        userCardDiv.className = "row";
        document.getElementById('userList').appendChild(userCardDiv);

        let userName = document.createElement('input');
        userName.value = obj.name;
        userName.className = "userInput";
        let userAge = document.createElement('input');
        userAge.type = "number";
        userAge.value = obj.age;
        userAge.className = "userInput";
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Dellete";
        deleteBtn.className = 'dellBtn';
        //response от создания возвращает _id, а get просто id
        if (obj._id) obj.id = obj._id;
        ////
        deleteBtn.userId = obj.id;
        deleteBtn.addEventListener('click', function() {
            console.log(deleteBtn.userId);
            DeleteUser(deleteBtn.userId);
            deleteBtn.parentElement.remove();
        });

        let saveBtn = document.createElement('button');
        saveBtn.innerText = "Save";
        saveBtn.className = 'saveBtn';
        saveBtn.userId = obj.id;
        saveBtn.addEventListener('click', function() {

            let name = saveBtn.parentElement.childNodes[0].value;
            let age = saveBtn.parentElement.childNodes[1].value;
            let userId = saveBtn.parentElement.childNodes[3].userId;
            let newUserObj = {
                id: userId,
                name: name,
                age: age
            };
            EditUser(newUserObj);
        });

        userCardDiv.appendChild(userName);
        userCardDiv.appendChild(userAge);
        userCardDiv.appendChild(deleteBtn);
        userCardDiv.appendChild(saveBtn);
    }

    const apiLinc = 'https://test-users-api.herokuapp.com';
    const usersApi = axios.create({
        baseURL: apiLinc
    });

    async function GetUsers() {
        let res = await usersApi.get('/users');
        let data = res.data.data;
        return data;
    }
    async function CreateNewUser(newUser) {
        let res = await usersApi.post('/users', newUser)
            .then(function(response) {
                console.log(response);
                showUserCard(response.data.data);
            })
            .catch(function(error) {
                console.log(error);
            });

    }

    async function DeleteUser(id) {
        let res = await usersApi.delete('/users/' + id)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    async function EditUser(obj) {
        let res = await usersApi.put('/users/' + obj.id, { name: obj.name, age: obj.age })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }


    //first read
    let usersArray = await GetUsers();
    usersArray.forEach(element => {
        showUserCard(element);
    });
    //create new user
    let createBtn = document.getElementById('addNewUser');
    createBtn.addEventListener('click', function() {
        let name = document.getElementById('nameInput').value;
        let age = document.getElementById('ageInput').value;
        let newUserObj = {
            name: name,
            age: age
        };
        CreateNewUser(newUserObj);
    })

})();