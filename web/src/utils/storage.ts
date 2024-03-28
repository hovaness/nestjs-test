export const storage = {
    get<T>():T | null{
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    },
    set<T>(value:T){
        localStorage.setItem('user',JSON.stringify(value));
    }
}