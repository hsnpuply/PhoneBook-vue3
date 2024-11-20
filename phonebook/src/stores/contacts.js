// Utilities
import { defineStore } from 'pinia'

export const useContactStore = defineStore('app', {
  state: () => ({
    contacts:[
        // {id:1, name:'Ali Alavi', phone:'+98990251212'},
        // {id:2, name:'Mohsen Mortazavi', phone:'+989923524113'},
        // {id:3, name:'Vue Member', phone:'+989363671514'},
        // {id:4, name:'Xiao Lee', phone:'13092608772'},
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
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })
      const data = await response.json();
      this.contacts.push(data);
      alert(this.contacts)
    },

    async deleteContact(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id)
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method:'delete'
      })
    }
  }
})
