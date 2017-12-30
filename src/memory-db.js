var data = [
  { color: 'black', count: 0 },
  { color: 'white', count: 0 },
];

function add(color) {
  var good = findByColor(color);

  if (good) {
    good.count += 1;

    return good;
  }

  return { color: color, count: 1 };
}

function findByColor(color) {
  return data.find(function (good) {
    return good.color === color;
  });
}

function findAll() {
  return data;
}

module.exports = {
  add: add,
  findAll: findAll,
  findByColor: findByColor,
};
