import "reflect-metadata";

import { CreateSpecificationService } from "~@Service/specification/Create.service";
import { SpecificationMemoryRepository } from "~@Repository/specification/memory/Specification.repository";

let createSpecificationService: CreateSpecificationService;
let specificationMemoryRepository: SpecificationMemoryRepository;

describe('Create specification service', function () {

	beforeEach(function () {
		specificationMemoryRepository = new SpecificationMemoryRepository();
		createSpecificationService = new CreateSpecificationService(specificationMemoryRepository);
	});

	it('should be able to create specification', async function () {
		const newSpecification = {
			name: 'Specification',
			description: 'Specification'
		};
		await createSpecificationService.execute(newSpecification);
		const specification = await specificationMemoryRepository.findByName(newSpecification.name);
		expect(specification.name).toEqual(newSpecification.name);
	});

});
