

// async function signup(req,res) {
//     const username = document.querySelector(".signup-username").value;
//     const password = document.querySelector(".signup-password").value;
//     await axios.post("http://localhost:3001/signup",{
//         username:username,
//         password:password,
//     });
//     alert("signed up completed");
// }


async function signup() {
    const username = document.querySelector(".signup-username").value;
    const password = document.querySelector(".signup-password").value;

    try {
        await axios.post("http://localhost:3001/signup", {
            username: username,
            password: password,
        });
        alert("Sign-up completed!");
    } catch (error) {
        console.error('There was an error during sign-up:', error);
        alert("Sign-up failed!");
    }
}

async function signin() {
    const username = document.querySelector(".signin-username").value;
    const password = document.querySelector(".signin-password").value;

    try {
        const response = await axios.post("http://localhost:3001/signin", {
            username: username,
            password: password,
        });
        localStorage.setItem("token",response.data.token);
        alert("Sign-in completed!");
    } catch (error) {
        console.error('There was an error during sign-in:', error);
        alert("Sign-in failed!");
    }
}


async function info() {
    try {
        const response = await axios.get("http://localhost:3001/me",{
            headers:{
                token:localStorage.getItem("token")      
            }
        });
        localStorage.setItem("token",response.data.token);
        document.querySelector(".populate").innerHTML = "username" + response.data.username + "password" + response.data.password;
        alert("info fetched");
    } catch (error) {
        console.error('There was an error:', error);
        alert("cant fetch data");
    }
}
info();

function logout(){
    localStorage.removeItem("token");
    document.querySelector(".populate").innerHTML = "";
}

