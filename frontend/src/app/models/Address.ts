export class Address{
    public street:string;
    public number:string;
    public city:string;
    public province:string;
    public country:string;
    public floor?:number;
    public departament?:number;
    public id?:number;   

    constructor(street:string,number:string,city:string,province:string,country:string,
                floor?:number,departament?:number,id?:number){
        this.street = street;
        this.number = number;
        this.city = city;
        this.province = province;
        this.country = country;
        this.floor = floor;
        this.departament = departament;
        this.id = id;
    }
}