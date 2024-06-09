let name = document.getElementById('name');
let dept = document.getElementById('dept');
let salary = document.getElementById('salary');
let insurance = document.getElementById('insurance');
let net = document.getElementById('netSalary');
let tax = document.getElementById('tax');
let save = document.getElementById('save');
let employee = [];

let status = 'save';
let public ;


function calc_salary() {
    if (salary.value !== '') {
        let total = salary.value - insurance.value - tax.value;
        net.value = total;
        net.style.background = '#778da9';
    } else {
        net.value = '';
        net.style.background = 'white';
    }
}

if (localStorage.employee !== null && localStorage.employee !== undefined) {
    employee = JSON.parse(localStorage.employee);
} else {
    employee = [];
}

save.addEventListener('click', function () {
    let emp = {
        name: name.value,
        dept: dept.value,
        net: net.value,
        tax: tax.value,
        insurance: insurance.value,
        salary: salary.value,
    };

    if (status === 'save'){
        employee.push(emp);
    }else {
        employee[public] = emp;
        status = 'save';
        save.innerHTML = 'Save';
    }

    localStorage.setItem('employee', JSON.stringify(employee));
    showData();
    clearData();
});

// function showData() {   // this will show the data in the normal order 
//     let output = '';
//     for (let i = 0; i < employee.length; i++) {
//         output += `
//         <tr>
//             <td>${employee[i].name}</td>
//             <td>${employee[i].dept}</td>
//             <td>${employee[i].net}</td>
//             <td>Modify</td>
//             <td>Delete</td>
//         </tr>`;
//     }
//     document.getElementById('tbody').innerHTML = output;
// }

// showData();


function clearData (){
    name.value = '';
    dept.value = '';
    salary.value = '';
    insurance.value = '';
    tax.value = '';
    net.value = '';

}


function showData() {
    let output = '';
    let boxOutput = '';

    // Loop through employees to display new data at the top
    for (let i = 0; i < employee.length; i++) {
        output += `
        <tr>
            <td>${employee[i].name}</td>
            <td>${employee[i].dept}</td>
            <td>${employee[i].net}</td>
            <td><button onclick = "updateData(${i})">Update</button></td>
            <td><button onclick = "deleteData(${i})">Delete</button></td>
        </tr>`;

        boxOutput += `
        <div class="employee-box">
            <div><span>Name:</span> ${employee[i].name}</div>
            <div><span>Dept:</span> ${employee[i].dept}</div>
            <div><span>Net Salary:</span> ${employee[i].net}</div>
            <div class="employee-buttons">
                <button onclick="updateData(${i})">Update</button>
                <button onclick="deleteData(${i})">Delete</button>
            </div>
        </div>`;
    }

    document.getElementById('tbody').innerHTML = output;
    document.getElementById('employee-container').innerHTML = boxOutput; // Add a container for the box layout
}




function deleteData(i){
    employee.splice( i , 1);    
    localStorage.employee  = JSON.stringify(employee);
    showData();    
}


function deleteAllData(i){
    localStorage.clear();
    employee = []; 
    showData();
}

function updateData(i){
    name.value = employee[i].name;
    dept.value = employee[i].dept;
    salary.value = employee[i].salary;
    tax.value = employee[i].tax;
    insurance.value = employee[i].insurance;
    net.value = employee[i].net;

    save.innerHTML = "Update Info";
    status = 'update';
    public = i;

    scroll({
        top:0,
        behavior:"smooth"
    });

}

showData();


// function for searching for value 

let searchType = 'name';

function getSearchType(id){

    let search = document.getElementById('search');

    if(id == 'searchName'){
        searchType = 'name';
        search.placeholder = 'Enter Employee name';
    }else {
        searchType = 'section';
        search.placeholder = 'Enter Department Name';
    }
    search.focus();

}

function searchData(value) {
    let table = '';
    let boxTable = ''; // For the box layout
    value = value.toLowerCase();

    if (searchType == 'name') {
        for (let i = 0; i < employee.length; i++) {
            if (employee[i].name.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td>${employee[i].name}</td>
                    <td>${employee[i].dept}</td>
                    <td>${employee[i].net}</td>
                    <td><button onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>`;

                boxTable += `
                <div class="employee-box">
                    <div><span>Name:</span> ${employee[i].name}</div>
                    <div><span>Dept:</span> ${employee[i].dept}</div>
                    <div><span>Net Salary:</span> ${employee[i].net}</div>
                    <div class="employee-buttons">
                        <button onclick="updateData(${i})">Update</button>
                        <button onclick="deleteData(${i})">Delete</button>
                    </div>
                </div>`;
            }
        }
    } else {
        for (let i = 0; i < employee.length; i++) {
            if (employee[i].dept.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td>${employee[i].name}</td>
                    <td>${employee[i].dept}</td>
                    <td>${employee[i].net}</td>
                    <td><button onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>`;

                boxTable += `
                <div class="employee-box">
                    <div><span>Name:</span> ${employee[i].name}</div>
                    <div><span>Dept:</span> ${employee[i].dept}</div>
                    <div><span>Net Salary:</span> ${employee[i].net}</div>
                    <div class="employee-buttons">
                        <button onclick="updateData(${i})">Update</button>
                        <button onclick="deleteData(${i})">Delete</button>
                    </div>
                </div>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
    document.getElementById('employee-container').innerHTML = boxTable;
}

