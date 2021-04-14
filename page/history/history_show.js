// Call Api
var checkInURL = 'http://service.aiclub.cs.uit.edu.vn/checkinservice_30_datasql_api/checkin';     

var token = localStorage.getItem("userToken");

fetch(checkInURL, 
                {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                })
    .then((responseData)=>
                            {
                                return responseData.json();
                            })
    .then((jsonData) => 
                            {
                                return jsonData.checkin_list;
                            })
    .then((checkinList) =>  
                            {
                                var table = document.querySelector('.history-table-body');

                                checkinList.forEach(function(item) 
                                {
                                    var row = table.insertRow(-1),
                                        timeCell = row.insertCell(0),
                                        imageCell = row.insertCell(1),
                                        fullNameCell = row.insertCell(2),
                                        idCell = row.insertCell(3);
                                    
                                    row.classList.add('history-row')
                                    timeCell.classList.add('history-content');
                                    imageCell.classList.add('history-content');
                                    fullNameCell.classList.add('history-content');
                                    idCell.classList.add('history-content');

                                    timeCell.innerText = `${item.checkin_datetime}`;
                                    imageCell.innerHTML = `<img src="../../assets/img/person_image.png" alt="user image" class="history-user-img">`;
                                    fullNameCell.innerText = `${item.person_fullname}`;
                                    idCell.innerText = `${item.person_id}`;
                                })
                                
                            })