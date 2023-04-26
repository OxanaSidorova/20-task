

describe('connect to test bd', () => {
  it('can connect to db', () => {
    cy.task(
      "queryDb", 
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroupp varchar(255), StudentTown varchar(255))"
    )
    })
    it ("Input entries",() => {
      cy.task(
      "queryDb",
      `INSERT INFO Students (Student ID, FirstName, StudentGrpope,City) VALUES
      (1, "Ivan", "09-22,"Barcelona"),
      (2, "Mariya", "10-22,"London"),
      (3, "Oxana", "08-22,"Milan");`
    ).then ((result)=> {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);  
      });
});
it("select", () => {
  cy.task(
   "queryDb",
   `SELECT FirstName FROM Students WHERE City ="Milan"`
  ).then ((result) => {
    expect(result[0].FirstName).to.equal("Oxana");
  });
});
it("add students task", ()=> {
  cy.task(
    "queryDb",
    `INSERT INTO Students (StudentsID, FirstName, StudentGroup,City) VALUES
 (4, "Mark", "11-22", "Moscow"),
 (5, "Jacke","11-22", "Boston")`
  ).then ((result)=> {
    cy.log(JSON.stringify(result));
    expect(result.affectedRows).to.equal(2);  
  });
});
it ("select all students", () => {
  cy.task ("queryDb",
  `SELECT * FROM Students
  Where StudentGroupe = "11-22";`
  ).then((result)=>{
   cy.log(JSON.stringify(result));
  expect(resultlength).to.equal(2);
  });
});
it("can delet the db",()=> {
  cy.task ("queryDb",`DROP TABLE Students`);

});
})
