export class Producer{
    public firstname:string;
    public lastname:string;
    public joined:Date;
    public code:number;
    public id?:number;

    constructor(firstname:string,lastname:string,joined:Date,code:number,id?:number){
        this.firstname = firstname;
        this.lastname = lastname;
        this.joined = joined;
        this.code = code;
        this.id = id;
    }
}