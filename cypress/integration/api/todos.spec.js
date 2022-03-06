var lastId
const task = "Walk the cat"

describe("CRUD - todos", () => {

  it("Create todo - POST", () => {
    cy.request({
      url: 'http://localhost:3000/todos',
      method: 'POST',
      body: {
        text: task,
        done: false,
      },
    })
      .then((response) => {
        cy.log(JSON.stringify(response.body))
        lastId = response.body.id
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('text', task)
        expect(response.body).to.have.property('done', false)
        expect(response.body).to.have.property('id')
      })
  });

  it("Read todo - GET", () => {
    cy.request({
      url: `http://localhost:3000/todos/${lastId}`,
      method: 'GET',
    })
      .then((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('text', task)
        expect(response.body).to.have.property('done', false)
        expect(response.body).to.have.property('id', lastId)
      })
  });

  it("Update todo - PUT", () => {
    cy.request({
      url: `http://localhost:3000/todos/${lastId}`,
      method: 'PUT',
      body: {
        text: 'Walk the turtle',
        done: true,
      },
    })
      .then((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('text', 'Walk the turtle')
        expect(response.body).to.have.property('done', true)
        expect(response.body).to.have.property('id', lastId)
      })
  });

  it("Delete todo - DELETE", () => {
    cy.request({
      url: `http://localhost:3000/todos/${lastId}`,
      method: 'DELETE',
    })
      .then((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('text', 'Walk the turtle')
        expect(response.body).to.not.have.property('done', true)
        expect(response.body).to.not.have.property('id', lastId)
        expect(response.body).to.deep.equal({})
      })
  });
});
