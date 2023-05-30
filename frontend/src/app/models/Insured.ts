export class Insured{
    public firstname:string;
    public lastname:string;
    public license:string;
    public folder:number;
    public life:string;
    public born:Date;
    public address:number;
    public dni:number;
    public producer:number;
    public description?:string;
    public cuit?:string;
    public id?:number;

    constructor(
        firstname:string,
        lastname:string,
        license:string,
        folder:number,
        life:string,
        born:Date,
        address:number,
        dni:number,
        producer:number,
        description?:string,
        cuit?:string,
        id?:number
    ){
        this.firstname = firstname;
        this.lastname = lastname;
        this.license = license;
        this.folder = folder;
        this.life = life;
        this.born = born;
        this.address = address;
        this.dni = dni;
        this.producer = producer;
        this.description = description;
        this.cuit = cuit;
        this.id = id;
    }
}