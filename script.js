let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');


const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

//save the leads from local storage
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

deleteBtn.addEventListener('click', function () {
    //clear localStorage
    localStorage.clear();
    //clear myLeads array
    myLeads = [];
    //clear the DOM
    render(myLeads);
})

inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
})

tabBtn.addEventListener('click', function () {
    //grab the url of the tab using chrome.tabs api
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url);
        //save myLeads to local storage
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads) {
    let listItems = "";
    for(let i=0; i<leads.length; i++) {
        //adding items to the listItems variable 
        listItems += `
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]} 
            </a>
        </li>
        `;
    }

    //Render listItems inside unordered list using ulEl.innerHTML
    ulEl.innerHTML = listItems;

}
