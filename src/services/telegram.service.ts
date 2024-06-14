class TelegramService {
    async neworder(url: string){
        const response = await fetch(url);
        return response;
    }
}
export default new TelegramService