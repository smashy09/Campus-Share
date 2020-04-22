function postData(url = '', data = {}) {
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referer',
        body: JSON.stringify(data),
     }). then(res => res.json());
         
}

function signIn() {
    const body = {
        email: document.forms[0].elements[0].value,
        password: document.forms[0].elements[1].value

    }
    postData('/', body)
        .then((res) => {
            if (res.status !== 200) throw new Error (res.error);
            console.log("this works")
        })
        .catch((error) => {
            window.alert(error.message);
            window.location.replace('/index.html')
        })
     

}


function signUp() {
        console.log('sign up')
        const body = {
            email: document.forms[0].elements[0].value,
            password: document.forms[0].elements[1].value,
            username: document.forms[0].elements[2].value
        }
        postData('/signup', body)
        .then((res) => {
            if (res.status !== 200) throw new Error (res.error);
            console.log("this works")
        })
        .catch((error) => {
            window.alert(error.message);
            window.location.replace('/index.html')
        })
    
}
    

function forgotPassword() {
        console.log('sending password')
    }

function resetPassword() {
        console.log('reset up')
    }  