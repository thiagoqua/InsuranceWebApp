import { Insured } from "./Insured";

export class ExcelDataResultDTO{
    public interpreted:Insured[];
    public nonInterpreted:number[];

    constructor(interpreted:Insured[],nonInterpreted:number[]){
        this.interpreted = interpreted;
        this.nonInterpreted = nonInterpreted;
    }
}