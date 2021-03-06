// hack to make this a module
export default null;

// hack to use CommonJS syntax in TypeScript files (e.g. to load CSS)
// https://github.com/TypeStrong/ts-loader#loading-other-resources-and-code-splitting
declare global {
	const require: {
		<T>(path: string): T;
		(paths: string[], callback: (...modules: any[]) => void): void;
		ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
	};
}

// hack to connect an external ambient module
// https://github.com/Microsoft/TypeScript/issues/10178#issuecomment-263787616
import * as __ from "lodash";

declare global {
	const _: typeof __;
}
