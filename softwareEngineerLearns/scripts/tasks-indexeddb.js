storageEngine = function() {
	let database;
	let objectStores;

	return {
		init: function(successCallback, errorCallback) {
				if (window.indexedDB) {
					// Request to open the database. Database is named based on the domain name.
					// E.g. www.testing.com ==> www.testing.comDB
					let request = indexedDB.open(window.location.hostname+'DB', 1);

					request.onsuccess = function(event) {
						database = request.result;
						successCallback(null);
					}

					request.onerror = function(event) {
						errorCallback("storage_not_initialized", "It is not possible to initialize the storage.");
					}
				}
				else {
					errorCallback("storage_api_not_supported", "The web storage API is not supported.");
				}
		},

		initObjectStore: function(type, successCallback, errorCallback) {

		},

		save: function(type, obj, successCallback, errorCallback) {

		},

		findAll: function(type, successCallback, errorCallback) {

		},

		delete: function(type, id, successCallback, errorCallback) {

		},

		findByProperty: function(type, propertyName, propertyValue, successCallback, errorCallback) {

		},

		findById: function(type, id, successCallback, errorCallback) {

		}
	}
}();