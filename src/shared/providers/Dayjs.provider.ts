import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "~@Shared/providers/IDate.provider";

dayjs.extend(utc);

export class DayjsProvider implements IDateProvider {

	public dateNow(): Date {
		return dayjs().toDate();
	}

	public compare(startDate: Date, endDate: Date): number {
		return dayjs(this.convertToUTC(endDate)).diff(this.convertToUTC(startDate), "hours");
	}

	public convertToUTC(date: Date): string {
		return dayjs(date).utc().local().format();
	}

}
