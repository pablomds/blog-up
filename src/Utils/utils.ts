export class utils {

    static getUnixTimeStamp = (dateAsUnixTimeStamp: Date):number =>
        dateAsUnixTimeStamp.getTime();

    static formatUnixTimeStampToDate = (unixTimeStamp: number):Date =>
        new Date(unixTimeStamp);

}