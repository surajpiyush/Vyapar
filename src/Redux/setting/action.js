import { GENERAL } from "./actionTypes";

export const getGenearl = (content) => ({
    
   type: GENERAL,
   payload: {
      content,
   },
});
