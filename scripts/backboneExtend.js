Backbone.Model.prototype.parse = function(resp, options) {
	if (_.isObject(resp._id)) {
		resp[this.idAttribute] = resp._id.$oid;
		delete resp._id;
	}
	return resp;
};
Backbone.Model.prototype.toExtendedJSON= function() {
	var attrs = this.attributes;
	var attrs = _.omit(attrs, this.idAttribute);
	if (!_.isUndefined(this[this.idAttribute])) {
		attrs._id = { $oid: this[this.idAttribute] };
	}
	return attrs;
};

Backbone.Model.prototype.sync = function() {
	var toJSON = this.toJSON;
	this.toJSON = this.toExtendedJSON;
	var ret = Backbone.sync.apply(this, arguments);
	this.toJSON = toJSON;
	return ret;
}