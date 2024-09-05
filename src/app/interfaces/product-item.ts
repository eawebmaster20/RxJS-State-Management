export interface IProduct{
    image: {
         thumbnail: string;
         mobile: string;
         tablet: string;
         desktop: string;
    },
    name: string;
    category: string;
    price: number,
    id:number;
 }
 
 export interface ICart extends IProduct{
     quantity:number;
     // image: {
     //      thumbnail: string;
     //      mobile: string;
     //      tablet: string;
     //      desktop: string;
     // },
     // name: string;
     // category: string;
     // price: number,
     // id:number;
  }