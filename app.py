from flask import Flask, jsonify, redirect, render_template
import pandas as pd
import numpy as np
app = Flask(__name__)

biodata_df = pd.read_excel("biodata1.xlsx", sheet_name=0)
biodata_df2 = pd.read_excel("biodata1.xlsx", sheet_name= 1)

@app.route("/")
def homepage():
    return render_template("index.html")
@app.route("/names")
def names():
    names_list = list(biodata_df)[2:]
    for i in range(len(names_list)):
        names_list[i] = "BB_" + str(names_list[i])
    return jsonify(names_list)
@app.route("/otu")
def otu():
    otu_list = biodata_df.iloc[:,1].tolist()
    return jsonify(otu_list)
@app.route("/metadata/<sample>")
def metadata(sample):
    sampleID = int(sample.split("_")[1])
    age = biodata_df2[sampleID][3]
    bbtype = biodata_df2[sampleID][5]
    ethnicity = biodata_df2[sampleID][1]
    gender = biodata_df2[sampleID][2]
    location = biodata_df2[sampleID][6]
    sampleid = sampleID
    metadata_dict = {        
    "AGE": age,
    "BBTYPE": bbtype,
    "ETHNICITY": ethnicity,
    "GENDER": gender,
    "LOCATION": location,
    "SAMPLEID": sampleid
    }
    return jsonify(metadata_dict)
@app.route("/wfreq/<sample>")
def wfreq(sample):
    sampleID = int(sample.split("_")[1])
    wash_freq = int(biodata_df2[sampleID][4])
    return jsonify(wash_freq)

@app.route("/samples/<sample>")
def samplevalue(sample):
    sampleNum = int(sample.split("_")[1])
    cols = ["OTU ID #", sampleNum]
    chosen = biodata_df.loc[:,("OTU ID #", sampleNum)]
    chosen[sampleNum] = pd.to_numeric(chosen[sampleNum], downcast="integer", errors="coerce")
    chosen = chosen.sort_values(by=sampleNum, ascending=False)
    otu_ids = chosen["OTU ID #"].tolist()
    sample_values = chosen[sampleNum].tolist()
    samples = [{"otu_ids": otu_ids}, {"sample_values": sample_values}]
    return jsonify(samples)

if __name__ == "__main__":
    app.run(debug=True)