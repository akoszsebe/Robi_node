function loadAllUsers(){
    $.ajax({
        url: '/api/listUsers',
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data,null,3);
            document.getElementById("list").innerHTML = tmp;
        },
        error: function () {
        }
    });
}

function loadUser(){
    var id = document.getElementById("id").value;
    if (id == "") {
        alert('id is required');
        retrun;
    }
    $.ajax({
        url: '/api/loadUser?id='+id,
        data: {},
        success: function (data) {
            document.getElementById("updtaediv").classList.remove('hidden');
            document.getElementById("updtaediv").classList.add('show');
            document.getElementById("upusr").value = data.name;
            document.getElementById("upage").value = data.age;
            if( data.male == 'true') document.getElementById("upradiotrue").checked = true;
                else document.getElementById("upradiofalse").checked = true;
        },
        error: function () {
        }
    });
}


function removeUser(){
    var id = document.getElementById("id").value;
    if (id == "") {
        alert('id is required');
        retrun;
    }
    $.ajax({
        url: '/api/removeUser?id='+id,
        data: {},
        success: function (data) {
            document.getElementById("upusr").value = "";
            document.getElementById("upage").value = "";
            if( data.male == 'true') document.getElementById("upradiotrue").checked = true;
                else document.getElementById("upradiofalse").checked = true;
        },
        error: function () {
        }
    });
}

function updateUser(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("upusr").value;
    var male = document.getElementById('upradiotrue').checked;
    var age = document.getElementById("upage").value;
    $.ajax({
        url: '/api/updateUser?id='+id+'&name='+name+'&male='+male+'&age='+age,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            if (tmp == 'true') {
                    document.getElementById("btupdate").classList.remove('btn-primary');
                    document.getElementById("btupdate").classList.add('btn-success');
                    setTimeout(function(){
                        document.getElementById("btupdate").classList.remove('btn-success');
                        document.getElementById("btupdate").classList.add('btn-primary');   
                    },1000)
                }
                else alert('failed');
        },
        error: function () {
        }
    });
}


function login(){
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
     console.log(name+ " " + password);
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        url: '/api/login?username='+name+'&password='+password,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            console.log(tmp)
            if (tmp == 'true') {
                       window.location = "http://allamvizsga-akoszsebe.c9users.io/home"
                } else{
                       alert('elbasztad vagy nem vagy regisztralva'); 
                }
        },
        error: function () {
        }
    });
}

function register(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var lastname = document.getElementById("lastname").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var ocupation = document.getElementById("ocupation").value;
    $.ajax({
        url: '/api/register?username='+username+'&password='+password+'&name='+name+'&lastname='+lastname+'&ocupation='+ocupation,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            if (tmp == 'true') {
                    alert(' sikeres regisztracio');
                } else{
                       alert('sikertelen regisztracio'); 
                }
        },
        error: function () {
        }
    });
}


function getlogdinUser(){
    var a_username = document.getElementById("a_username")
    $.ajax({
        url: '/api/getuserfromsession',
        data: {},
        success: function (data) {
            a_username.innerHTML = data;
        },
        error: function () {
            a_username.innerHTML = "kityaszar";
        }
    });
}