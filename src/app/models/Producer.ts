export class Producer{
    public firstname:string;
    public lastname:string;
    public joined:Date;
    public id?:number;

    constructor(firstname:string,lastname:string,joined:Date,id?:number){
        this.firstname = firstname;
        this.lastname = lastname;
        this.joined = joined;
        this.id = id;
    }
}