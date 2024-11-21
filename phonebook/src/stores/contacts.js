// Utilities
import { defineStore } from 'pinia'

export const useContactStore = defineStore('app', {
  state: () => ({
    contacts:[
        {id:1, fullname:'Ali Alavi', phoneNumber:'+98990251212',selectedDate:'2021-11-04',isCoworker:true},
        {id:2, fullname:'Mohsen Mortazavi', phoneNumber:'+989923524113',selectedDate:'2022-11-04',isCoworker:false},
        {id:3, fullname:'Hosein mirzazade', phoneNumber:'09122222',selectedDate:'2023-11-04',isCoworker:false},
        {id:4, fullname:'Taghi Mohseni', phoneNumber:'09052397698',selectedDate:'2024-11-04',isCoworker:false},
        
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
    
     addContact(contact) {
      this.contacts.push(contact)

    },

     deleteContact(id) {
      // Filter out the contact with the specified id
      const temp = this.contacts.filter((contact) => contact.id !== id);
      this.contacts = temp;

    },
     updateContact(id, updatedData) {
      const index = this.contacts.findIndex((contact) => contact.id === id);
      console.log(index);
      
      if (index !== -1) {
        this.contacts[index] = { ...updatedData };
        console.log(`Updated contact:`, this.contacts[index]);
      } else {
        console.error(`Contact with id ${id} not found.`);
      }
    }
  }
})
