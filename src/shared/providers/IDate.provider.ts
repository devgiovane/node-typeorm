export interface IDateProvider {
	compare(startDate: Date, endDate: Date): number;
	convertToUTC(date: Date): string;
	dateNow(): Date;
}
