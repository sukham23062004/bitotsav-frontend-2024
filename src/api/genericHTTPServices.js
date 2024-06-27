class HTTPServices {
	apiClient;
	endPoint;

	constructor(apiClient, endPoint) {
		this.apiClient = apiClient;
		this.endPoint = endPoint;
	}

	// path example -> /login
	get(path) {
		this.apiClient.get(this.endPoint + path);
	}
	post(path, entity) {
		this.apiClient.post(this.endPoint + path, entity);
	}

	// change these methods accordingly
	put(id, entity) {
		this.apiClient.put(this.endPoint + "/" + id, entity);
	}
	patch(id, entity) {
		this.apiClient.patch(this.endPoint + "/" + id, entity);
	}
	delete(id) {
		this.apiClient.delete(this.endPoint + "/" + id);
	}
}

const create = (apiClient, endPoint) => {
	// apiClient -> publicApiClient or privateApiClient
	// endpoint example -> /api/user
	return new HTTPServices(apiClient, endPoint);
};

export default create;
