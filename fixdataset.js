module.exports = {
  fix: function (array, categories) {
    let uniqueExt = categories.slice(0, 97);
    let uniqueParser = categories.slice(97, 99);
    let uniqueEcma = categories.slice(99, 106);
    let uniquePlugins = categories.slice(111, 146);
    let uniqueSourceType = categories.slice(106, 108);
    let temp = [];
    uniqueExt.forEach(u => {
      if (array[0].includes(u)) {
        temp.push("TRUE");
      } else {
        temp.push("FALSE");
      }
    });
    uniqueParser.forEach(u => {
      if (array[1].includes(u)) {
        temp.push("TRUE");
      } else {
        temp.push("FALSE");
      }
    });
    uniqueEcma.forEach(u => {
      if (array[2] == u) {
        temp.push("TRUE");
      } else {
        temp.push("FALSE");
      }
    });
    uniqueSourceType.forEach(u => {
      if (array[3].includes(u)) {
        temp.push("TRUE");
      } else {
        temp.push("FALSE");
      }
    });
    temp.push(array[4]);
    temp.push(array[5]);
    temp.push(array[6]);
    uniquePlugins.forEach(u => {
      if (array[7].includes(u)) {
        temp.push("TRUE");
      } else {
        temp.push("FALSE");
      }
    });
    temp.push(array[8] / 100);
    for (let i = 9; i < array.length; i++) {
      temp.push(array[i]);
    }
    return temp;
  }
}