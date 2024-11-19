// Utilities
import { defineStore } from 'pinia'

export const useContactStore = defineStore('app', {
  state: () => ({
    contacts:[
        {id:1, name:'Ali Alavi', phone:'+98990251212'},
        {id:2, name:'Mohsen Mortazavi', phone:'+989923524113'},
        {id:3, name:'Vue Member', phone:'+989363671514'},
        {id:4, name:'Xiao Lee', phone:'13092608772'},
    ]
    //
  }),
  getters:{
    getContacts: (state) => state.contacts,
  }
})
