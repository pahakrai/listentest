Template.stockInfo.created = function () {
  this.autorun(function () {
  console.log('created '+Router.current().params.stockCode);
    this.subscription = Meteor.subscribe('singleStockInfo', Router.current().params.stockCode);
  }.bind(this));
};

Template.stockInfo.rendered = function () {
  console.log('rendered '+Router.current().params.stockCode);
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.stockInfo.helpers({

  product: function () {
    return StockInfoCollection.findOne();
  }
});