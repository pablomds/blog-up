export class utils {
  static monthNames = [
    "Jan.",
    "Febr.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  static getUnixTimeStamp = (dateAsUnixTimeStamp: Date): number =>
    dateAsUnixTimeStamp.getTime();

  static formatUnixTimeStampToDate = (unixTimeStamp: number): Date =>
    new Date(unixTimeStamp);

  static formatDateToArray = (unixTimeStamp: number) => {
    const currentDate = this.formatUnixTimeStampToDate(unixTimeStamp);
    return [
        currentDate.getDate(), this.monthNames[currentDate.getMonth()], currentDate.getFullYear()
    ]
  }
}