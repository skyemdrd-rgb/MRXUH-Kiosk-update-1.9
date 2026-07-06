// ===========================
// TEMPORARY DATA
// ===========================

let editingIndex = -1;

const doctorModal = document.getElementById("doctorModal");

const doctorName = document.getElementById("doctorName");
const doctorSpecialty = document.getElementById("doctorSpecialty");
const doctorRoom = document.getElementById("doctorRoom");
const doctorFloor = document.getElementById("doctorFloor");
const doctorSchedule = document.getElementById("doctorSchedule");
const doctorTime = document.getElementById("doctorTime");
const doctorSecretary = document.getElementById("doctorSecretary");
const doctorPhone = document.getElementById("doctorPhone");
const doctorRemarks = document.getElementById("doctorRemarks");

const saveDoctor = document.getElementById("saveDoctor");
const cancelDoctor = document.getElementById("cancelDoctor");

const params = new URLSearchParams(window.location.search);

const specialtyKey = params.get("specialty");

console.log("SPECIALTY:", specialtyKey);
console.log("DATA:", doctorData[specialtyKey]);

let specialty;

try {

    specialty = JSON.parse(localStorage.getItem(specialtyKey));

} catch {

    specialty = null;

}

if (!specialty) {

    specialty = structuredClone(doctorData[specialtyKey]);

    localStorage.setItem(
        specialtyKey,
        JSON.stringify(specialty)
    );

}

let adminMode = false;

// ===========================
// ELEMENTS
// ===========================

const title = document.getElementById("directoryTitle");
const grid = document.getElementById("doctorGrid");

const adminButton = document.getElementById("adminButton");
const addDoctorButton = document.getElementById("addDoctorButton");

const loginModal = document.getElementById("loginModal");
const loginPassword = document.getElementById("loginPassword");

const loginButton = document.getElementById("loginButton");
const cancelLogin = document.getElementById("cancelLogin");

// ===========================
// PAGE TITLE
// ===========================

title.textContent = specialty.title;

// ===========================
// RENDER DOCTORS
// ===========================

function renderDoctors() {

    grid.innerHTML = "";

    specialty.doctors.forEach((doctor,index)=>{

        grid.innerHTML += `

        <div class="doctorCard">

            <div class="cardHeader">

                <h2>${doctor.name}</h2>

                ${
                    adminMode
                    ?

                    `<div class="editButtons">

                        <button class="edit" onclick="editDoctor(${index})">✏</button>

                        <button class="delete" onclick="deleteDoctor(${index})">🗑</button>

                    </div>`

                    :

                    ""

                }

            </div>

            <div class="specialty">

                ${doctor.specialty}

            </div>

            <div class="cardBody">

                <div class="info">

                    📍 ${doctor.room}, ${doctor.floor}

                </div>

                <div class="info">

                    📅 ${doctor.schedule}

                </div>

                <div class="info">

                    🕒 ${doctor.time}

                </div>

                <div class="info">

                    ☎ ${doctor.phone}

                </div>

            </div>

        </div>

        `;

    });

}

renderDoctors();

function editDoctor(index){

    editingIndex = index;

    const doctor = specialty.doctors[index];

    doctorName.value = doctor.name;
    doctorSpecialty.value = doctor.specialty;
    doctorRoom.value = doctor.room;
    doctorFloor.value = doctor.floor;
    doctorSchedule.value = doctor.schedule;
    doctorTime.value = doctor.time;
    doctorSecretary.value = doctor.secretary || "";
    doctorPhone.value = doctor.phone;
    doctorRemarks.value = doctor.remarks || "";

    doctorModal.style.display = "flex";

}

saveDoctor.onclick = function () {

    const doctor = {

        name: doctorName.value,

        specialty: doctorSpecialty.value,

        room: doctorRoom.value,

        floor: doctorFloor.value,

        schedule: doctorSchedule.value,

        time: doctorTime.value,

        secretary: doctorSecretary.value,

        phone: doctorPhone.value,

        remarks: doctorRemarks.value

    };

    if (editingIndex === -1) {

        specialty.doctors.push(doctor);

    } else {

        specialty.doctors[editingIndex] = doctor;

    }

    saveDoctors();

    renderDoctors();

    doctorModal.style.display = "none";

};




// ===========================
// ADMIN BUTTON
// ===========================

adminButton.onclick = function () {

    // Not in admin mode → Login
    if (!adminMode) {

        loginModal.style.display = "flex";
        loginPassword.focus();
        return;

    }

    // Already in admin mode → Exit editing
    adminMode = false;

    adminButton.innerHTML = "🔒";

    addDoctorButton.style.display = "none";

    renderDoctors();

}

// ===========================
// LOGIN
// ===========================

loginButton.onclick = function(){

    if(loginPassword.value==="1234"){

        adminMode = true;

        loginModal.style.display = "none";

        addDoctorButton.style.display = "inline-block";

        addDoctorButton.onclick = function(){

            editingIndex = -1;

            doctorName.value = "";
            doctorSpecialty.value = "";
            doctorRoom.value = "";
            doctorFloor.value = "";
            doctorSchedule.value = "";
            doctorTime.value = "";
            doctorSecretary.value = "";
            doctorPhone.value = "";
            doctorRemarks.value = "";

            doctorModal.style.display = "flex";

        };

        adminButton.innerHTML = "🔓";

        renderDoctors();

    }

    else{

        alert("Incorrect Password");

    }

}

// ===========================
// CANCEL LOGIN
// ===========================

cancelLogin.onclick=function(){

    loginModal.style.display="none";

}

cancelDoctor.onclick = function () {

    doctorModal.style.display = "none";

}

// ===========================
// CLOSE MODAL WHEN CLICKING
// OUTSIDE
// ===========================

window.onclick=function(e){

    if(e.target===loginModal){

        loginModal.style.display="none";

    }

}

function saveDoctors(){

    localStorage.setItem(

        specialtyKey,

        JSON.stringify(specialty)

    );

}

function deleteDoctor(index){

    if(confirm("Delete this doctor?")){

        specialty.doctors.splice(index,1);

        saveDoctors();

        renderDoctors();

    }

}

function goBack() {

    window.history.back();

}
