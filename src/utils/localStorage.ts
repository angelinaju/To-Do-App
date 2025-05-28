// export function setItem(key: string, value: unknown) {      // add key and value to localstorage
//     try {
//         window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//         console.log(error); 
//     }
// }

// export function getItem(key: string) {                      // get item from localStorage using the key
//     try {
//         const item = window.localStorage.getItem(key);
//         return item ? JSON.parse(item) : undefined;
//     } catch  (error){
//         console.log(error);
//     }
// }