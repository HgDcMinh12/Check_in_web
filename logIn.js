var dataAPI = 'http://service.aiclub.cs.uit.edu.vn/checkinservice_30_datasql_api/login_admin';

function logIn(data) {
    localStorage.setItem("userData", data['username']);
    fetch(dataAPI,
                {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data) 
                })
                
    
        .then((responseData) => 
                                {
                                    return responseData.json();
                                })
        .then((jsonData) =>
                                {
                                    return jsonData.token;
                                })
        .then((token) =>
                                {
                                    localStorage.setItem("userToken", token);
                                    return token;
                                })
}
export default logIn;