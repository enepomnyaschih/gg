interface RestFactory<T> {
	(response: any): T;
}

export default RestFactory;
