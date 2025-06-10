import assert from 'assert'

class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    urlFeedback: () => cy.get("#urlFeedback"),
    submitBtn: () => cy.get("#btnSubmit"),
  };

  typeTitle(text){
    if (!text) return;
    this.elements.titleInput().type(text)
  }
  typeUrl(text){
    if (!text) return;
    this.elements.imageUrlInput().type(text)
  }
  clickSubmit(){
    this.elements.submitBtn().click()
  }
}


const registerForm = new RegisterForm();
const colors = {
  errors: 'rgb(220, 53, 69)',
  success: ''
}

describe('Image Registration', () => { 

      after(() => {
      cy.clearAllLocalStorage();
    });
     const input ={
    title: '',
    url:''
  }
  describe('Submitting an image with invalid inputs', () => {

it('Given I am on the image registration page', () => {
cy.visit("/");
});

it('When I enter "" in the title field', () => {
  registerForm.typeTitle(input.title);
})

it('Then I enter "${input.url}" in the URL field', () => {
  registerForm.typeUrl(input.url);
});
it('Then I click the submit button', () => {
  registerForm.clickSubmit();
});


it('Then I should see "Please type a title for the image" message above the title field', () => {
  registerForm.elements.titleFeedback().should('be.visible')
  .and('contain', 'Please type a title for the image')
});

it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
  registerForm.elements
    .urlFeedback()
    .should("be.visible")
    .and("contain", "Please type a valid URL");
});
it('And I should see an exclamation icon in the title and URL fields', () => {
  registerForm.elements.titleInput().should(([element]) => {
    const styles = window.getComputedStyle(element)
    const border = styles.getPropertyValue('border-right-color')
    assert.strictEqual(border, colors.errors);
  })
})

});

  describe('Submitting an image with valid inputs using enter key', () => {
    it("Given I am on the image registration page", () => {
      cy.visit("/");
    });
    it("When I enter 'Alien BR' in the title field", () => {
      registerForm.typeTitle('Alien BR');
    });
    
    it('When I enter "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field', () => {
      registerForm.typeUrl(
        "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg"
      );
    });

    it('Then I can hit enter to submit the form', () => {
      registerForm.clickSubmit();
    });
      
    it('And the list of registered images should be updated with the new item', () => {
      cy.get("#card-list").should("contain", "Alien BR");
    });

    it('Then The inputs should be cleared', () => {
      cy.get('#title').should('be.empty');
      cy.get("#imageUrl").should("be.empty");
    });
});
})
