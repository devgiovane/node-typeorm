import { container } from "tsyringe";

import { IDateProvider } from "~@Shared/providers/IDate.provider";
import { DayjsProvider } from "~@Shared/providers/Dayjs.provider";

const dayjsProvider = new DayjsProvider();

container.registerInstance<IDateProvider>(
	"DayjsProvider", dayjsProvider
);
