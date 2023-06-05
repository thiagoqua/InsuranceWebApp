import { Producer } from "./Producer";

export class Admin{
    public id:number;
    public username:string;
    public token?:string;
    public producer:number;
    public producerNavigation:Producer;

    constructor(id:number,username:string,token:string,producerId:number,producer:Producer){
        this.id = id;
        this.username = username;
        this.token = token;
        this.producer = producerId;
        this.producerNavigation = producer;
    }    
}