<script>
                    fetch("http://127.0.0.1:5000/names")
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                      let output = data.json()
                      })
                  


                    let select_tag = document.getElementById("selDataset");
                    let option_tag = document.createElement("option");

                    option_tag.setAttribute("value", "")
                    option_tag.innerHTML = 
                    select_tag.appendChild(option);

                    </script>