export class helpers{
    validateJSON = (data) => {
      for (let params in data) {
          console.log(data[params]);
          if (data[params].length === 0) return true;
      }
      return false;
    }
}