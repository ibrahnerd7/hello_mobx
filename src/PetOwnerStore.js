import { action, autorun, computed, makeObservable, observable, runInAction } from "mobx";

class PetOwnerStore{
    pets =[];
    owners=[];

    constructor(){
        makeObservable(this,{
            pets:observable,
            owners:observable,
            totalOwners:computed,
            totalPets:computed,
            storeDetails:computed,
            getPetsByOwner:action,
            createPet:action,
            createOwner:action,
            updatePet:action,
            updateOwner:action,
            deletePet:action,
            deleteOwner:action,
            assignOwnerToPet:action
        });
        autorun(this.logStoreDetails);
        //Reaction that just runs once
        runInAction(this.prefetchData)
    }

    get totalOwners(){
        return this.owners.length;
    }

    get totalPets(){
        return this.pets.length;
    }

    getPetsByOwner(ownerId){
        return this.pets.filter((pet)=>{
            return pet.owner && pet.owner.id === ownerId;
        })
    }

    createPet(pet={id:0,name:"",type:"",breed:"", owner:null}){
        this.pets.push(pet);
        return pet;
    }

    createOwner(owner={id:0, firstName: "", lastName:""}){
        this.owners.push(owner);
    }

    updateOwner(ownerId, update){
        const ownerIndexAtId = this.owners.findIndex((owner)=>owner.id === ownerId);
        if(ownerIndexAtId >-1 && update){
            this.owners[ownerIndexAtId] = update;
        }
    }

    updatePet(petId, update){
        const petIndexAt = this.pets.findIndex((pet)=> pet.id === petId);
        if(petIndexAt > -1 && update){
            this.pets[petIndexAt] = update;
        }
    }

    deletePet(petId){
        const petIndexAtId = this.pets.findIndex((pet)=>pet.id === petId);
        if(petIndexAtId > -1){
            this.pets.splice(petIndexAtId,1);
        }
    }

    deleteOwner(ownerId){
        const ownerIndexAtId = this.owners.findIndex((owner)=>owner.id === ownerId);
        if(ownerIndexAtId > -1){
            this.owners.splice(ownerIndexAtId, 1)
        }
    }

    assignOwnerToPet(ownerId, petId){
        const petIndexAtId = this.pets.findIndex((pet)=>pet.id === petId);
        const ownerIndexAtId = this.owners.findIndex((owner)=>owner.id === ownerId);
        if(petIndexAtId  > -1 && ownerIndexAtId > -1){
            this.pets[petIndexAtId].owner = this.owners[petIndexAtId];
        }
    }

    get storeDetails(){
        return `We have ${this.pets.length} total pets an ${this.pets.length} total owners, so far!!!`
    }

    logStoreDetails(){
        console.log(this.storeDetails());
    }

    prefetchData = () => {
        const owners = [{ firstName: "Aleem", lastName: "Isiaka", id: 1 }];
        const pets = [
          {
            id: 1,
            name: "Lincy",
            breed: "Siamese",
            type: "Cat",
            ownerId: 1,
          },
        ];
    
        setTimeout(() => {
          console.log("Fetch complete update store");
          owners.map((pet) => this.createOwner(pet));
          pets.map((pet) => {
            this.createPet(pet);
            this.assignOwnerToPet(pet.ownerId, pet.id);
            return pet;
          });
        }, 3000);
      };
    
}

export default PetOwnerStore;

