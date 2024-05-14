document.addEventListener('DOMContentLoaded', function() {
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patientTableBody = document.getElementById('patient-list');
    const addPatientBtn = document.getElementById('add-patient-btn');
    const patientForm = document.getElementById('patient-form');
  
    function renderPatientList() {
      patientTableBody.innerHTML = '';
  
      patients.forEach(patient => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = patient.id;
        
        const nameCell = document.createElement('td');
        nameCell.textContent = patient.name;
  
        const actionsCell = document.createElement('td');
        
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Report';
        viewButton.addEventListener('click', function() {
            if (patient.name === 'ratan') {
                window.location.href = 'ratan.html';
            } else {
          window.location.href = report1.html?id=${patient.id};
            }
        });
        actionsCell.appendChild(viewButton);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Record';
        deleteButton.addEventListener('click', function() {
          const index = patients.findIndex(p => p.id === patient.id);
          patients.splice(index, 1);
          localStorage.setItem('patients', JSON.stringify(patients));
          renderPatientList();
        });
        actionsCell.appendChild(deleteButton);
  
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(actionsCell);
        
        patientTableBody.appendChild(row);
      });
    }
  
    function savePatientDetails(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const bloodGroup = document.getElementById('blood-group').value;
      const aadharNumber = document.getElementById('aadhar-number').value;
      const ecgReport = document.getElementById('ecg-report').value;
      const newId = patients.length + 1;
  
      patients.push({ id: newId, name: name, age: age, bloodGroup: bloodGroup, aadharNumber: aadharNumber, ecgReport: ecgReport });
      localStorage.setItem('patients', JSON.stringify(patients));
  
      window.location.href = 'rep.html'; 
    }
  if (addPatientBtn) {
      addPatientBtn.addEventListener('click', function() {
        window.location.href = 'add_patient.html';
      });
    }
  
    if (patientForm) {
      patientForm.addEventListener('submit', savePatientDetails);
    }
  
    renderPatientList();
  });