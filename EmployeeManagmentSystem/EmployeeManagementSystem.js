const readlineSync = require('readline-sync');

let EMPLOYEEDATA = [
  { id: "01", name: "helen", position: "manager", department: "finance" },
  { id: "02", name: "mahlet", position: "secretary", department: "finance" }
];

let jsonData = JSON.stringify(EMPLOYEEDATA);

function loadEmployees() {

  return JSON.parse(jsonData);
}

function saveEmployees(employees) {
 
  jsonData = JSON.stringify(employees);
}

function addEmployee(id, name, position, department) {
  let employees = loadEmployees();
  employees.push({ id, name, position, department });
  saveEmployees(employees);
  console.log("Employee added successfully!");
}

function listEmployees() {
  let employees = loadEmployees();
  if (employees.length === 0) {
    console.log("No employees in the system.");
    return;
  }
  console.log("List of Employees:");
  employees.forEach(employee => {
    console.log("ID: " + employee.id + ", Name: " + employee.name + ", Position: " + employee.position + ", Department: " + employee.department);
  });
}

function findEmployee(id) {
  let employees = loadEmployees();
  const employee = employees.find(employee => employee.id === id);
  if (employee) {
    console.log("Employee found: ID: " + employee.id + ", Name: " + employee.name + ", Position: " + employee.position + ", Department: " + employee.department);
  } else {
    console.log("Employee with ID '" + id + "' not found.");
  }
}

function updateEmployee(id, newName, newPosition, newDepartment) {
  let employees = loadEmployees();
  const employeeIndex = employees.findIndex(employee => employee.id === id);
  if (employeeIndex !== -1) {
    const employee = employees[employeeIndex];
    employee.name = newName || employee.name;
    employee.position = newPosition || employee.position;
    employee.department = newDepartment || employee.department;
    saveEmployees(employees);
    console.log("Employee updated successfully!");
  } else {
    console.log("Employee with ID '" + id + "' not found.");
  }
}

function deleteEmployee(id) {
  let employees = loadEmployees();
  const employeeIndex = employees.findIndex(employee => employee.id === id);
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    saveEmployees(employees);
    console.log("Employee deleted successfully!");
  } else {
    console.log("Employee with ID '" + id + "' not found.");
  }
}

function startEmployeeManagement() {
  while (true) {
    console.log("\nEMPLOYEE MANAGEMENT SYSTEM");
    console.log("1. Add new Employee");
    console.log("2. List all Employees");
    console.log("3. Search for Employee by ID");
    console.log("4. Update Employee's information");
    console.log("5. Delete Employee");
    console.log("6. Exit");

    const choice = readlineSync.question("Enter your choice (1-6): ");

    switch (choice) {
      case "1":
        const id = readlineSync.question("Enter employee ID: ");
        const name = readlineSync.question("Enter employee name: ");
        const position = readlineSync.question("Enter employee position: ");
        const department = readlineSync.question("Enter employee department: ");
        addEmployee(id, name, position, department);
        break;
      case "2":
        listEmployees();
        break;
      case "3":
        const searchId = readlineSync.question("Enter employee ID to search: ");
        findEmployee(searchId);
        break;
      case "4":
        const updateId = readlineSync.question("Enter employee ID to update: ");
        const newName = readlineSync.question("Enter new name (or leave blank to keep current): ");
        const newPosition = readlineSync.question("Enter new position (or leave blank to keep current): ");
        const newDepartment = readlineSync.question("Enter new department (or leave blank to keep current): ");
        updateEmployee(updateId, newName, newPosition, newDepartment);
        break;
      case "5":
        const deleteId = readlineSync.question("Enter employee ID to delete: ");
        deleteEmployee(deleteId);
        break;
      case "6":
        console.log("Exiting the program. Goodbye!");
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

startEmployeeManagement();

