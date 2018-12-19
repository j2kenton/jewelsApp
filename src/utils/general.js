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

}