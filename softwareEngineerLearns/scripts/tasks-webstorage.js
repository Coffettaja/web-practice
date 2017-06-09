storageEngine = function() {
	var initialized = false;
	var initializedObjectStores = {};

	return {
		/**
		 * This must be called to initialize the storage engine before using it.
		 * If initialization is succesful, successCallback will be invoked with null object.
		 * If errorCallback is invoked then the storage engine cannot be used.
		 * @param  {Function} successCallback The callback that will be invoked if succesful
		 * @param  {Function} errorCallback   The callback invoked in error scenarios
		 */
		init: function(successCallback, errorCallback) {
			if (window.localStorage) {
				initialized = true;
				successCallback(null);
			} 
			else {
				errorCallback("storage_api_not_supported", 
					"The web storage API is not supported.");
			}
		},

		/**
		 * The client must call this to initialize a specific object type in the engine.
		 * @param  {String} type The type of the object to be stored.            	
		 * @param  {Function} successCallback The callback that will be invoked if succesful	
		 * @param  {Function} errorCallback   The callback invoked in error scenarios
		 */
		initObjectStore: function(type, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback("storage_api_not_initialized",
					"The storage engine has not been initialized.");
			}
			else if (!localStorage.getItem(type)) {
				localStorage.setItem(type, JSON.stringify({}));
			}
			initializedObjectStores[type] = true;
			successCallback(null);
		},

		/**
		 * Handles adding and editing objects of specific type.
		 * If the id property of the object passed in is null or undefined,
		 * an id is assigned for the object and the object is saved.
		 * If the id is non-null, the object is updated.
		 * If the id cannot be found, errorCallback is invoked.
		 * On success, the newly saved object is returned to the successCallback.
		 * @param  {String} type            The type of object that is stored.
		 * @param  {Object} obj             The object that is stored.
		 * @param  {Function} successCallback The callback that is invoked after the object has been
		 *                                    	committed to the storage engine.
		 * @param  {Function} errorCallback   The callback that is invoked in error scenarios.
		 */
		save: function(type, obj, successCallback, errorCallback) {

		},

		/**
		 * Finds all objects of specific type.
		 * @param  {String} type            	The type of object to find.
		 * @param  {Function} successCallback 	The callback that is invoked if succesful.
		 * @param  {Function} errorCallback   	The callback that is invoked in error scenarios.
		 */
		findAll: function(type, successCallback, errorCallback) {

		},

		/**
		 * Deletes object of specific type with specific id.
		 * @param  {String} type            Type of object to delete.
		 * @param  {String|number} id       The unique if of the object.
		 * @param  {Function} successCallback 	The callback invoked after deleting the object.
		 * @param  {Function} errorCallback   	The callback invoked in error scenarios.
		 */
		delete: function(type, id, successCallback, errorCallback) {

		},

		/**
		 * Find objects with specific value of specific property.
		 * @param  {String} type            Type of object to find.
		 * @param  {String} propertyName    The property name to be matched.
		 * @param  {String} propertyValue   The value that the property should have.
		 * @param  {Function} successCallback 	Invoked after the query completes.
		 * @param  {Function} errorCallback   	Callback that is invoked in error scenarios.
		 */
		findAllByProperty: function(type, propertyName, propertyValue, successCallback, errorCallback) {

		},

		/**
		 * Get an object with specific id for specific type, or null if no such object is found.
		 * @param  {String} type            	The type of object to search for.
		 * @param  {String|number} id         The unique id of the object.
		 * @param  {Function} successCallback The callback that is invoked after the query completes.
		 * @param  {Function} errorCallback   The callback that is invoked in error scenarios.
		 */
		findById: function(type, id, successCallback, errorCallback) {

		}
	}
}();