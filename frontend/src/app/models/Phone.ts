export class Phone{
    public number:string;
    public insured?:number;
    public id?:number;
    public description?:string;

    constructor(number:string,description?:string,insured?:number,id?:number,){
        this.insured = insured;
        this.number = number;
        this.id = id;
        this.description = description;
    }
}