(async() => {

    const USERS_API = "https://test-users-api.herokuapp.com/";
    const usersApi = axios.create({
        baseURL: USERS_API
    });
    //get all items
    const usersRespons = await usersApi.get("/users");
    console.log(usersRespons.data.data);

    //remove item by id
    const res = await usersApi.delete("users/" + "5d42d6745d05110014015992");
    //add new item
    usersApi.post('/users', { name: 'new_old_user', age: 100 })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })

})();