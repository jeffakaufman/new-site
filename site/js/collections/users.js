var Users = Backbone.Collection.extend({
	model: User,

	url: '/api/books',

	sortKey: "createdOn",

	sortDirect: "DSC",

	currentStatus: function(status) {
		return _(this.filter(function(data) {
			return data.get("status") == status;
		}));
	},

	comparator: function(a) {
		var val = a.get(this.sortKey);
		return val;
	},

	sortUsing: function(field) {
		this.sortKey = field;
		this.sort();
	},

	// Overriding sortBy (copied from underscore and just swapping left and right for reverse sort)
	sortBy: function(iterator, context) {
		var obj = this.models,
		direction = this.sortDirection;

		return _.pluck(_.map(obj, function(value, index, list) {
			return {
				value: value,
				index: index,
				criteria: iterator.call(context, value, index, list)
			};
		}).sort(function(left, right) {
			// swap a and b for reverse sort
			var a = direction === "ASC" ? left.criteria : right.criteria,
				b = direction === "ASC" ? right.criteria : left.criteria;

			if (a !== b) {
				if (a > b || a === void 0) return 1;
				if (a < b || b === void 0) return -1;
			}
			return left.index < right.index ? -1 : 1;
		}), 'value');
	},

});