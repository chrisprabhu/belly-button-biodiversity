// Fetch JSON names and update Dropdown Menu
                      let url = '/names'
                      d3.json(url, function(jsonData){
                      let select_tag = document.getElementById("selDataset");
     
                        jsonData.pop()
                        jsonData.forEach((sample_name) => {
                        let option_tag = document.createElement("option");
                        option_tag.innerHTML = sample_name;
                        select_tag.appendChild(option_tag);
                      
                      });
                      
                    });


let url2 = "/samples/BB_940"
                      d3.json(url2, function(json_Data){

let sample_values = json_Data[1].sample_values.slice(0,10); 
let otu_ids = json_Data[0].otu_ids.slice(0,10);
let ordered_otu_array = []

let url3 = "/otu"
                      d3.json(url3, function(json_Data){

  for(i=0; i < otu_ids.length; i++) {
    ;
  ordered_otu_array.push(json_Data[otu_ids[i]])
  
  };
   
 });
let pie_trace = {
  values: sample_values,
  labels: otu_ids,
  text: ordered_otu_array,
  type: "pie"
};

let data = [pie_trace];

let layout = {
  height: 400,
  width: 500
};

Plotly.newPlot("pie_chart", data, layout);
// Bubble Chart

let bubble_trace = {
  x: otu_ids,
  y: sample_values,
  text: ordered_otu_array,
  mode: 'markers',
  marker: {
    size: sample_values,
    color: otu_ids
  }
};

let bubble_data = [bubble_trace]

let bubble_layout = {
  title: "Bubble Chart",
  height: 600,
  width: 1200
};

Plotly.newPlot("bubble_chart", bubble_data, bubble_layout)

})


// Update Charts

function updatePlotly(sample_id){
    let pieDiv = document.getElementById("pie_chart");
    let bubbleDiv = document.getElementById("bubble_chart")

        let url4 = `/samples/${sample_id}`
                      d3.json(url4, function(json_Data){

        let new_sample_values = json_Data[1].sample_values.slice(0,10);
        let new_otu_ids = json_Data[0].otu_ids.slice(0,10);

        Plotly.restyle(pieDiv, "values", [new_sample_values]);
        Plotly.restyle(pieDiv, "labels", [new_otu_ids]);
        Plotly.restyle(bubbleDiv, "x", [new_otu_ids]);
        Plotly.restyle(bubbleDiv, "y", [new_sample_values]);
        Plotly.restyle(bubbleDiv, "marker.size", [new_sample_values]);
        Plotly.restyle(bubbleDiv, 'marker.color', [new_otu_ids]);
  })
};

// Dropdown Menu onchange Function

function optionChanged(dropdown_choice) {

updatePlotly(dropdown_choice)
updateMetaData(dropdown_choice)
};
function updateMetaData(sample_id) {
                    let metadata_table = document.getElementById("metadata_table");
                    metadata_table.innerHTML= "";

                        let url5 = `/metadata/${sample_id}`
                        d3.json(url5, function(jsonData){
                      for(let row in jsonData) {
                      let metadata_table = document.getElementById("metadata_table");
                      let table_row = document.createElement("tr");
                      let table_data = document.createElement("td");
                      table_data.innerHTML = `${row}: ${jsonData[row]}`;
                      table_row.appendChild(table_data);
                      metadata_table.appendChild(table_row);
                    }
                      });
                    }
                    updateMetaData("BB_940")