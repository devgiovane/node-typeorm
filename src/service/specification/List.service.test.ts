import "reflect-metadata";

import { ListSpecificationService } from "~@Service/specification/List.service";
import { SpecificationMemoryRepository } from "~@Repository/specification/memory/Specification.repository";

let listSpecificationService: ListSpecificationService;
let specificationMemoryRepository: SpecificationMemoryRepository;

describe('List specification service', function () {

	beforeEach(function () {
		specificationMemoryRepository = new SpecificationMemoryRepository();
		listSpecificationService = new ListSpecificationService(specificationMemoryRepository);
	});

	it('should be able to list all specification', async function () {
		const newSpecification = {
			name: 'Specification',
			description: 'Specification'
		}
		await specificationMemoryRepository.save(newSpecification);
		const specifications = await listSpecificationService.execute();
		const specification = await specificationMemoryRepository.findByName(newSpecification.name);
		expect(specifications).toEqual([specification]);
	});

});
