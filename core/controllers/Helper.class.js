'use strict';

module.exports = class Helper
{

	constructor() {}

	compareArray(arr1, arr2)
	{
		if (arr1.length == arr2.length && arr1.every(function(u, i) {
        	return u === arr2[i];
    	}))
			return (true);
		return (false);
	}
}