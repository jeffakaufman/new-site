var SortedView = Backbone.Marionette.CompositeView.extend({
	appendHtml: function(collectionView, itemView, index) {
		var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
		var children = childrenContainer.children();
		if (children.size() <= index) {
			childrenContainer.append(itemView.el);
		} else {
			childrenContainer.children().eq(index).before(itemView.el);
		}
	},
});