"use strict";
window.storageEngine = function() {
	let database;
	let objectStores;

	function isDBInitialized(errorCallback) {
	if (!database) {
		errorCallback("storage_api_not_initialized", "The storage engine has not been initialized.");
	}
}

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
			isDBInitialized(errorCallback);

			let exists = false;
			$.each(database.objectStoreNames, function(i, v) {
				if (v === type) {
					exists = true;
				}
			});

			if (exists) {
				successCallback(null);
			}
			else {
				let version = database.version + 1;
				database.close();
				let request = indexedDB.open(window.location.hostname + 'DB', version);
				request.onsuccess = function(event) {
					successCallback(null);
				}

				request.onerror = function(event) {
					errorCallback("storage_api_not_initialized", "It is not possible to initialize the storage.");
				}

				request.onupgradeneeded = function(event) {
					database = event.target.result;
					let objectStore = database.createObjectStore(type, { keyPath: 'id', autoIncrement: true });
				}
			}
		},

		save: function(type, obj, successCallback, errorCallback) {
			isDBInitialized(errorCallback);

			if (!obj.id) {
				// Deletes the id property itself, makes it undefined.
				// Since IndexedDB is responsible for generating keys,
				// it does not expect to find an id property at all on
				// unsaved objects, even one with value of null.
				delete obj.id; 
			}
			else {
				// Note, first uses toString() if not string, e.g. parseInt(010) === 8
				obj.id = parseInt(obj.id, 10); 
			}

			// A transaction groups together a set of operations on one or more object stores.
			// The transaction will auto-commit once all requests against it have completed.
			// "readwrite" must be specified to modify the objects in the object store. (default: "read")
			let transx = database.transaction([type], "readwrite");
			transx.oncomplete = function(event) {
				successCallback(obj);
			}

			transx.onerror = function(event) {
				errorCallback("transaction_error", "It is not possible to store the object.");
			}

			let objectStore = transx.objectStore(type);
			let request = objectStore.put(obj); // put method used to persist the object
			
			// onsuccess of request always called before onsuccess of transaction
			request.onsuccess = function(event) {
				obj.id = event.target.result;
			}

			request.onerror = function(event) {
				errorCallback("object_not_stored", "It is not possible to store the object.");
			}
		},

		saveAll: function(type, objs, successCallback, errorCallback) {
			isDBInitialized(errorCallback);

			let trasnx = database.transaction([type], "readwrite");
			transx.oncomplete = function(event) {
				successCallback(objs);
			};
			transx.onerror = function(event) {
				errorCallback("transaction_error", "It is not possible to store the object.");
			};

			let objectStore = transx.objectStore(type);
			$.each(objs, function(index, obj) {
				if (!obj.id) {
					delete obj.id;
				}
				else {
					obj.id = parseInt(obj.id);
				}
				let request = objectStore.put(obj);
				request.onsuccess = function(event) {
					obj.id = event.target.result;
				};
				request.onerror = function(event) {
					errorCallback("object_not_stored", "It is not possible to store the object.");
				};
			});
		},

		findAll: function(type, successCallback, errorCallback) {
			isDBInitialized(errorCallback);

			let result = [];
			let transx = database.transaction(type);
			let objectStore = transx.objectStore(type);

			// A cursor represents a result set, and can be navigated
			// to access all the records in the result set.
			objectStore.openCursor().onsuccess = function(event) {
				let cursor = event.target.result;
				
				// if there are no further entries in the set, cursor is null
				if (cursor) {
					result.push(cursor.value);
					cursor.continue(); // where does the program go here? how is this loop...
				}
				else {
					successCallback(result);
				}
			}
		},

		delete: function(type, id, successCallback, errorCallback) {
			let obj = {}; //????
			obj.id = id;	// What is this needed for?
			let transx = database.transaction([type], "readwrite");
			transx.oncomplete = function(event) {
				successCallback(id);
			}

			transx.onerror = function(event) {
				console.log(event);
				errorCallback("transaction_error", "It is not possible to store the object.");
			}

			let objectStore = transx.objectStore(type);
			let request = objectStore.delete(id);
			request.onsuccess = function(event) {

			}

			request.onerror = function(event) {
				errorCallback("object_not_stored", "It is not possible to delete the object.");
			}
		},

		findByProperty: function(type, propertyName, propertyValue, successCallback, errorCallback) {
			isDBInitialized(errorCallback);
			let result = [];
			let transx = database.transaction(type);
			let objectStore = transx.objectStore(type);
			objectStore.openCursor().onsuccess = function(event) {
				let cursor = event.target.result;
				if (cursor) {
					if (cursor.value[propertyName] === propertyValue) {
						result.push(cursor.value);
					}

					cursor.continue();
				}
				else {
					successCallback(result);
				}
			}
		},

		findById: function(type, id, successCallback, errorCallback) {
			isDBInitialized(errorCallback);
			let transx = database.transaction([type]);
			let objectStore = transx.objectStore(type);
			let request = objectStore.get(id);
			
			request.onsuccess = function(event) {
				successCallback(event.target.result);
			}

			request.onerror = function(event) {
				errorCallback("object_not_stored", "The requested object could not be located.");
			}
		}
	}
}();

