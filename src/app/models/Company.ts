export class Company{
    public id?:number;
    public name:string;
    public logo:string;

    constructor(name:string,logo:string,id:number){
        this.name = name;
        this.logo = logo;
        this.id = id;
    }
}