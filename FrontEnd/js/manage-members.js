/* To load details from POSTMAN we need to send a request to back-end (AJAX or FETCH) */
const pageSize = 5;
let page = 1;

getMembers();

function getMembers(query=`${$('#txt-search').val()}`){

    /* ------using AJAX------- */

    /* STEP 01 - Initiate a XMLHttpRequest Object */
    const http = new XMLHttpRequest();



    /* STEP 02 - Set an eventLister to detect state change  */

    http.addEventListener('readystatechange',()=>{
        // console.log(http.readyState); /* check 4 times - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
        if(http.readyState===http.DONE){
            $('#loader').hide();
            if(http.status === 200){

                const totalMembers = +http.getResponseHeader("X-Total-Count"); /* + uses to convert to int */
                initPagination(totalMembers);

                const membersArrya = JSON.parse(http.responseText);

                if(membersArrya.length ===0){
                    $('#tbl-members').addClass('empty');
                }else{
                    $('#tbl-members').removeClass('empty');
                }
                
                
                membersArrya.forEach(member => {
                    const rowHTML = `
                    <tr tabIndex='0'>
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

    http.open('GET',`http://localhost:8080/lms/api/members?size=${pageSize}&page=${page}&q=${query}`,true); /* true = sychnonous  */

    /* STEP 04 - Setting addtional informations for the request */

    /* STEP 05 - Send the request */

    http.send();

}

function initPagination(totalMembers){
    const totalPages = Math.ceil(totalMembers/pageSize);

    let html = '';
    for(let i = 1; i <= totalPages; i++){
        html += `<li class="page-item ${i===page?'active':''}"><a class="page-link" href="#">${i}</a></li>`;
    }

    html = `<li class="page-item ${page===1?'disabled':''}"><a class="page-link" href="#">Previous</a></li>
    ${html}
    <li class="page-item ${page===totalPages?'disabled':''}"><a class="page-link" href="#">Next</a></li>`;

    $('#pagination > .pagination').html(html);

    $('#pagination > .pagination').click((eventData)=>{
        const elm = eventData.target;
        if(elm && elm.tagName === 'A'){
            const activePage = ($(elm).text());
    
            if(activePage === 'Next'){
                page++;
                getMembers();
            }else if(activePage === 'Previous'){
                page--;
                getMembers();
            }else{
                if(page != activePage){
                    page = +activePage;
                    getMembers();
                }
            }
        }
    });
}




$('#txt-search').on('input',()=>{
    page=1;
    getMembers();
});
