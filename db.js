var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/reco', {logging: false});

let City = db.define('city', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  hooks: {
    beforeDestroy (city) {
      console.log('city from beforeDestroy hook: ', city);
      Restaurant.destroy({
        where: { cityId: city.id }
      });
    }
  }
});

let Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER
  },
  review: {
    type: Sequelize.TEXT
  }
});

Restaurant.belongsTo(City);
City.hasMany(Restaurant, { onDelete: 'cascade', hooks: true });

module.exports = {
  City: City,
  Restaurant: Restaurant
};
