import { Address } from "./Address";
import { Company } from "./Company";
import { Phone } from "./Phone";
import { Producer } from "./Producer";

export class Insured{
    public firstname:string;
    public lastname:string;
    public company:number;
    public license:string;
    public folder:number;
    public life:string;
    public born:Date;
    public addressNavigation:Address;
    public dni:number;
    public producer:number;
    public phones:Phone[];
    public address?:number;
    public producerNavigation?:Producer;
    public companyNavigation?:Company;
    public description?:string;
    public cuit?:string;
    public id?:number;

    constructor(
        firstname:string,
        lastname:string,
        company:number,
        license:string,
        folder:number,
        life:string,
        born:Date,
        addressNavigation:Address,
        dni:number,
        producer:number,
        phones:Phone[],
        address?:number,
        producerNavigation?:Producer,
        description?:string,
        cuit?:string,
        id?:number
    ){
        this.firstname = firstname;
        this.lastname = lastname;
        this.company = company;
        this.license = license;
        this.folder = folder;
        this.life = life;
        this.born = born;
        this.dni = dni;
        this.producer = producer;
        this.addressNavigation = addressNavigation;
        this.phones = phones;
        this.producerNavigation = producerNavigation;
        this.address = address;
        this.description = description;
        this.cuit = cuit;
        this.id = id;
    }
}