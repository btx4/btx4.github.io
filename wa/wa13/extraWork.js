
class Employee {
    constructor(name, department,designation,salary,raiseEligible){
        this.name = name;
        this.department = department;
        this.designation = designation;
        this.salary = salary;
        this.raiseEligible = raiseEligible
    }
}

class Company {
    constructor(name,website,employees){
        this.name = name;
        this.website = website;
        this.employees = employees;
    }
}
sam = new Employee("Sam","Tech","Manager",40000,true);
mary = new Employee("Mary","Finance","Trainee",18500,true);
bill = new Employee("Bill","HR","Executive",21200,false)
listOfEmployees = [];
listOfEmployees2 = [];
listOfEmployees.push(sam);
listOfEmployees.push(mary);
listOfEmployees.push(bill);
listOfEmployees2.push(sam);
listOfEmployees2.push(mary);
listOfEmployees2.push(bill);

techStars = new Company("Tech Stars", "www.techstars.site", listOfEmployees)

console.log("Question 1");
console.log(sam);
console.log(mary);
console.log(bill);

console.log("Question 2");
console.log(techStars);


anna = new Employee("Anna","Tech","Executive",25600,false);

listOfEmployees2.push(anna);
techStars2 = new Company("Tech Stars", "www.techstars.site", listOfEmployees2);

console.log("Question 3");
console.log(techStars2)
totalSalary = 0;
for (const employee of techStars2.employees) {
    totalSalary += employee.salary
}
console.log("Question 4")
console.log(totalSalary)


function increaseSalary(company){
    for (const employee of company.employees) {
        if (employee.raiseEligible == true){
            employee.salary = employee.salary *1.1;
            employee.raiseEligible = false;
        }
    }
}

techStars3 = techStars2;
increaseSalary(techStars3);
console.log(techStars3)