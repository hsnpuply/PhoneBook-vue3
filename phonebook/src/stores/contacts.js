// Utilities
import { defineStore } from 'pinia'

export const useContactStore = defineStore('app', {
  state: () => ({
    contacts:[
        {id:1, fullname:'Ali Alavi', phoneNumber:'+98990251212',selectedDate:'2024-11-04',isCoworker:true},
        {id:2, fullname:'Mohsen Mortazavi', phoneNumber:'+989923524113',selectedDate:'2024-11-04',isCoworker:true},
        // {id:3, name:'Vue Member', phoneNumber:'+989363671514'},
        // {id:4, name:'Xiao Lee', phoneNumber:'13092608772'},
    ]
    //
  }),
  getters:{
    getContacts: (state) => state.contacts,
  },
  actions:{
    async getAllContacts(){
        const response = await fetch('http://localhost:3001/contacts');
        const data = await response.json();
        this.contacts = data;
        console.log(`contacts`, this.contacts);
    },
    
    async addContact(contact) {
      this.contacts.push(contact)
      // const response = await fetch('http://localhost:3001/contacts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(contact),
      // })
      // const data = await response.json();
      // this.contacts.push(data);
    },

    async deleteContact(id) {
      // Filter out the contact with the specified id
      const temp = this.contacts.filter((contact) => contact.id !== id);
      this.contacts = temp;

      
      // const response = await fetch(`http://localhost:3001/contacts/${id}`, {
      //   method:'delete'
      // })
    }
  }
})
