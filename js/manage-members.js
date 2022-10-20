/* To load details from POSTMAN we need to send a request to back-end (AJAX or FETCH) */

/* ------using AJAX------- */

/* STEP 01 - Initiate a XMLHttpRequest Object */
const http = new XMLHttpRequest();

/* STEP 02 - Set an eventLister to detect state change  */

http.addEventListener('readystatechange',()=>{
    // console.log(http.readyState); /* check 4 times - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
    if(http.readyState===http.DONE){
        $('#loader').hide();
        if(http.status === 200){
            const membersArrya = JSON.parse(http.responseText);
            if(membersArrya.length ===0){
                $('#tbl-members').addClass('empty');
            }
            membersArrya.forEach(member => {
                const rowHTML = `
            <tr>
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.address}</td>
                <td>${member.contact}</td>
            </tr>
            `;
            $('#table-members tbody').append(rowHTML);
            });

            
            // console.log("Responsed Recieved !");
        }else{
            $('#toast').show();
        }
    }
});


/* STEP 03 - Check request Command in documentation (ex: GET) | Open the request */

http.open('GET','https://31f81278-4815-4e43-9aab-9fe8c6e85653.mock.pstmn.io/members',true); /* true = sychnonous  */

/* STEP 04 - Setting addtional informations for the request */

/* STEP 05 - Send the request */

http.send();