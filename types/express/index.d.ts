declare namespace Express { 
   export interface Request {
    //  con esta linea podeos crear n propiedades para el objeto req: Request
     [key: string]: any
   }
 }

