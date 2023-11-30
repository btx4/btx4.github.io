//Problem 1

sam = {
  firstName: "Sam",
  department: "Tech",
  designation: "Manager",
  salary: 40000,
  raiseEligible: true,
};

mary = {
  firstName: "Mary",
  department: "Finance",
  designation: "Trainee",
  salary: 18500,
  raiseEligible: true,
};

bill = {
  firstName: "Bill",
  department: "HR",
  designation: "Executive",
  salary: 21200,
  raiseEligible: false,
};
console.log("Question 1");
console.log(sam);
console.log(mary);
console.log(bill);

//Problem 2
techStars = {
  companyName: "Tech Stars",
  website: "www.techstars.site",
  employees: [
    {
      firstName: "Sam",
      department: "Tech",
      designation: "Manager",
      salary: 40000,
      raiseEligible: true,
    },
    {
      firstName: "Mary",
      department: "Finance",
      designation: "Trainee",
      salary: 18500,
      raiseEligible: true,
    },
    {
      firstName: "Bill",
      department: "HR",
      designation: "Executive",
      salary: 21200,
      raiseEligible: false,
    },
  ],
};
console.log("Question 2");
console.log(techStars);

//Problem 3
techStars2 = {
  companyName: "Tech Stars",
  website: "www.techstars.site",
  employees: [
    {
      firstName: "Sam",
      department: "Tech",
      designation: "Manager",
      salary: 40000,
      raiseEligible: true,
    },
    {
      firstName: "Mary",
      department: "Finance",
      designation: "Trainee",
      salary: 18500,
      raiseEligible: true,
    },
    {
      firstName: "Bill",
      department: "HR",
      designation: "Executive",
      salary: 21200,
      raiseEligible: false,
    },
    {
      firstName: "Anna",
      department: "Tech",
      designation: "Executive",
      salary: 25600,
      raiseEligible: false,
    },
  ],
};

console.log("Question 3");
console.log(techStars2);


//Problem 4
totalSalary = 0;
for (const employee of techStars2.employees) {
  totalSalary += employee.salary;
}
console.log("Question 4");
console.log(totalSalary);


//Problem 5
techStars3 = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: [
      {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true,
      },
      {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true,
      },
      {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false,
      },
      {
        firstName: "Anna",
        department: "Tech",
        designation: "Executive",
        salary: 25600,
        raiseEligible: false,
      },
    ],
  };

function increaseSalary(company){
    for (const employee of company.employees) {
        if (employee.raiseEligible == true){
            employee.salary = employee.salary *1.1;
            employee.raiseEligible = false;
        }
    }
}
increaseSalary(techStars3);
console.log("Question 5");
console.log(techStars3);

//Problem 6
techStars4 = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: [
      {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true,
      },
      {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true,
      },
      {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false,
      },
      {
        firstName: "Anna",
        department: "Tech",
        designation: "Executive",
        salary: 25600,
        raiseEligible: false,
      },
    ],
  };

  increaseSalary(techStars4);



  const workingFromHome = ['Anna', 'Sam'];

for (const employee of techStars4.employees) {
    employee.wfh = workingFromHome.includes(employee.firstName);
}
console.log("Question 6")
console.log(techStars4);