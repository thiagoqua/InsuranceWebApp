import { Insured } from "./Insured";

export class ExcelDataResultDTO{
    public interpreted:Insured[];
    public nonInterpreted:string[];

    constructor(interpreted:Insured[],nonInterpreted:string[]){
        this.interpreted = interpreted;
        this.nonInterpreted = nonInterpreted;
    }
}