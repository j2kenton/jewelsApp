export default {

  structureData(data){
    const dataStructured = {};
    data.forEach((element) => {
      if (!dataStructured[element.type]){
        dataStructured[element.type] = [];
      }
      const shape = {
        property: "shape",
        value: element.shape,
      };
      dataStructured[element.type].push(shape);
      const clarity = {
        property: "clarity",
        value: element.clarity,
      };
      dataStructured[element.type].push(clarity);
      if (typeof element.color === "string"){
        const color = {
          property: "color",
          value: element.color,
        };
        dataStructured[element.type].push(color);
      }
    });
    return dataStructured;
  },

  generateOptions(dataSet, input){
    const options = Object.entries(dataSet).map(entry => {
      const optionKey = entry[0];
      const optionValue = entry[1];
      const stoneOptions = optionValue.map(optionSingle => {
        return {
          parent: optionKey,
          property: optionSingle.property,
          value: optionSingle.value,
          label: `${optionSingle.property}: ${optionSingle.value} in ${optionKey}`,
        };
      });
      return stoneOptions; // options for each stone are nested in this array
    });
    let optionsFlat = []; // we need to flatten the nested arrays to single depth
    if (typeof [].flat === "function"){ // use bleeding edge array method if available ;)
      optionsFlat = options.flat();
    } else {
      optionsFlat = options.reduce((acc, val) => acc.concat(val), []); // revert to a conservative approach :)
    }
    optionsFlat = optionsFlat.filter(optionSingle => {
      return optionSingle.value.startsWith(input);
    });
    return optionsFlat;
  },

}