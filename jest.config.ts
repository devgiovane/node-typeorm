const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

export default {
	bail: true,
	clearMocks: true,
	coverageProvider: "v8",
	roots: ['<rootDir>'],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	preset: "ts-jest",
	testMatch: [
	  	"**/__tests__/**/*.[jt]s?(x)",
	  	"**/?(*.)+(spec|test).[tj]s?(x)"
	],
};
