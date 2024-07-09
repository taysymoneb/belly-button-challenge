
//function that populates the metadata

function demoInfo(sample)
{
    //console.log(sample);

    //use d3.json to get the data
    d3.json("samples.json").then((data) => {
        //get metadata
        let metaData = data.metadata;
        //console.log(metaData);

        //should return one result
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        d3.select("#sample-metadata").html("");

        //get value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
           d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

//function to build the graphs

function buildBarChart(sample)
{
  //console.log(sample);
  //let data = d3.json("samples.json");
  //console.log(data);

  d3.json("samples.json").then((data) => {
    //get sample data
    let sampleData = data.samples;
    //console.log(sampleData);

    
    //should return one result
    let result = sampleData.filter(sampleResult => sampleResult.id == sample);
    //console.log(result);
   
    //access index 0 from the array
    let resultData = result[0];
    console.log(resultData);

    // get otu_ids, labels, and sample_values
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
    //console.log(otu_ids);
    //console.log(otu_labels);
    //console.log(sample_values);

    // build bar chart
    //get y ticks
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    let xValues = sample_values.slice(0, 10);
    let textLabels = otu_labels.slice(0, 10);
    //console.log(textLabels);
 
    let barChart = {
      y: yticks.reverse(),
      x: xValues.reverse(),
      text: textLabels.reverse(),
      type: "bar",
      orientation: "h"
    }

    let layout = {
      title: "Top Ten Belly Button Bacteria"
    };

    Plotly.newPlot("bar", [barChart], layout);

 });
}

//function that builds bubble chart
function buildBubbleChart(sample)
{
  d3.json("samples.json").then((data) => {
    //get sample data
    let sampleData = data.samples;
    //console.log(sampleData);

    
    //should return one result
    let result = sampleData.filter(sampleResult => sampleResult.id == sample);
    //console.log(result);
   
    //access index 0 from the array
    let resultData = result[0];
    console.log(resultData);

    // get otu_ids, labels, and sample_values
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
    //console.log(otu_ids);
    //console.log(otu_labels);
    //console.log(sample_values);

    // build the bubble chart
 
    let bubbleChart = {
      y: sample_values,
      x: otu_ids,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Bluered"
      }
    }

    let layout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", [bubbleChart], layout);

 });
}

//function to initialize the dashboard
function initialize()
{

    //access drop down selector from the index.html file
    var select = d3.select("#selDataset");

    //use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names; //array of just the names
        console.log(sampleNames);

      //use for each in order to create options for each sample in selector
      sampleNames.forEach((sample) => {
         select.append("option")
              .text(sample)
              .property("value", sample); 

      });

      let sample1 = sampleNames[0];

      //call function to build the metadata
      demoInfo(sample1);
      //call function to build the bar chart
      buildBarChart(sample1);
      //call function to build bubble chart
      buildBubbleChart(sample1);
  });


}

//function that updates the dashboard
function optionChanged(item)

{
   //prints item
   demoInfo(item);
   //call to build bar chart
   buildBarChart(item);
  //call function to build bubble chart
  buildBubbleChart(item);
}

//call the initialize function
initialize();