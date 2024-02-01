import type { MyObject } from "./types";

class GlobalHelper {
    static  updateObjectById = (arr: MyObject[], updatedObject: MyObject): MyObject[] => {
        const updatedArray = arr.map((obj) => (obj.id === updatedObject.id ? updatedObject : obj));
        return updatedArray;
      };
      
}



export default GlobalHelper