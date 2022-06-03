// Create object through Class - represents a reference
class Reference {
    constructor(reference, link) {
      this.reference = reference;
      this.link = link;
    }
  }
  
  // Interface object to manage interface tasks
  class Interface {
    static displayReferences() {
      const references = Save.getReferences();
  
      references.forEach((ref) => Interface.addReferenceToList(ref));
    }
  
    static addReferenceToList(ref) {
      const col = document.querySelector('#reference-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${ref.reference}</td>
        <td>${ref.link}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      col.appendChild(row);
    }
  
    static deleteReference(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#entry-form');
      container.insertBefore(div, form);
  
      // disappear in 4 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 4000);
    }
  
    // clear the values of the fields
    static clearValues() {
      document.querySelector('#reference').value = '';
      document.querySelector('#link').value = '';
    }
  }
  
  // object to save referecnces
  class Save {
    static getReferences() {
      let references;
      if(localStorage.getItem('references') === null) {
        references = [];
      } else {
        references = JSON.parse(localStorage.getItem('references'));
      }
  
      return references;
    }
  
    // add new reference to storage
    static createReference(ref) {
      const references = Save.getReferences();
      references.push(ref);
      localStorage.setItem('references', JSON.stringify(references));
    }
  
    //remove a soecific reference from storage
    static removeReference(link) {
      const references = Save.getReferences();
  
      // for each loop to find the one clicked on
      references.forEach((ref, index) => {
        if(ref.link === link) {
          references.splice(index, 1);
        }
      });
  
      localStorage.setItem('references', JSON.stringify(references));
    }
  }
  
  // Display on screen the references
  document.addEventListener('DOMContentLoaded', Interface.displayReferences);
  
  // listen for submit then add an entire reference
  document.querySelector('#entry-form').addEventListener('submit', (e) => {
    
    // Prevent an actual submit
    e.preventDefault();
  
    // let vairbles equal reference form's values
    const reference = document.querySelector('#reference').value;
    const link = document.querySelector('#link').value;
  
    // validation methods - prevent half filled form
    if(reference === '' || link === '') {
      Interface.showAlert('Please fill out all required fields', 'danger');
    } else {
      // let ref = object
      const ref = new Reference(reference, link);
  
      // add new reference to interface
      Interface.addReferenceToList(ref);
  
      // create new reference to saved refs
      Save.createReference(ref);
  
      // validation method - show when ref has been created
      Interface.showAlert('Reference Created', 'success');
  
      // clear values in fields
      Interface.clearValues();
    }
  });
  
  // delete reference
  document.querySelector('#reference-list').addEventListener('click', (e) => {
    
    // delete reference from interfacee
    Interface.deleteReference(e.target);
  
    // delete reference from saved
   Save.removeReference(e.target.parentElement.previousElementSibling.textContent);
  
    // validation method - show when ref has been deleted
    Interface.showAlert('Reference Deleted', 'success');
  });