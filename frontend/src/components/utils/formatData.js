export const formatData = (data) => {
    let finalData = {
      labels: [],
      datasets: [
        {      
          label: "Price",   
          data: [],
          backgroundColor: "rgb(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          fill: false
        }
      ]
    };
  
    let dates = data.map((val) => {
      const ts = val[0];
      let date = new Date(ts);
      let min = ('0' + date.getMinutes()).slice(-2);
      let hour = ('0' + date.getHours()).slice(-2);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      

      let final = `${year}/${month}/${day} ${hour}:${min}`;
      return final;
    });
  
    let priceArr = data.map((val) => {
      return val[4];
    });
  
    
    finalData.labels = dates;
    finalData.datasets[0].data = priceArr;

    return finalData;
  };
  