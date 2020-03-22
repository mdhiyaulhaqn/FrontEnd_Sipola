<template>
    <div class="row">
        <div class = "col-12">
            <div class="judul">
                <strong>
                    Detail Quotation
                </strong>
            </div> 
            
            <card>
                <b-row>
                    <div class = "col-8 nama-perusahaan">{{quotation.company.nama}}</div>
                    <div class = "col-4">Created by : {{quotation.createdBy}} <br>Created At : {{ quotation.date.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Quotation Number</div>
                    <div class = "col-6">: {{quotation.noQuotation}}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Quotation Address</div>
                    <div class = "col-6">: {{quotation.date}}</div>
                </b-row>
                <b-row>
                    <div class = "col-6"><br>Service</div>
                    <div class = "col-6">
                         <button v-b-modal.modal-download id ="download_button" class="btn btn-primary">
                            Download
                            <span class="ti-download"></span>
                        </button>
                    </div>
                </b-row>
                
                <b-row>
                    <b-col >
                        <div class="tabel-service">
                            <div slot="raw-content" class="table-responsive" style="font-size:11px">
                                <b-table :items="quotation.service">
                                </b-table>
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <b-row>
                    <div class = "col-12"><br>Terms and Condition</div>
                    <div class = "col-12">{{quotation.termsCondition}}
                    </div>
                </b-row>

                <b-row>
                   
                    <div class="col">
                        <br>
                        <button id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                        <button id ="edit_button" class="btn btn-primary">
                            Edit
                        </button>
                    </div>
                </b-row>

            </card>
        </div>

         <b-modal id="modal-download" ref="modal-download" hide-footer centered title="Download Quotation">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <span class="ti-download"></span>The system is downloading quotation no. {{quotation.noQuotation}}
                </b-row>
                </div>
                <div class = "tombol_okay">
                    <b-row>
                        <b-button class = "button_back" @click="hideModal" size="md" variant="primary">Okay</b-button>
                    </b-row>
                </div>
        
            </div>
        </b-modal>

    </div>
</template>

<script>

const tableColumns = []
const tableData = [
     {
        'no': 1,
        'scope of work': "Supervisi pemasangan Transformator  6 MVA ITP Citeureup",
        'quantity': "1 Lot",
        'unit price(IDR)' : '200.000.000',
        'total price(IDR)' : '200.000.000',
        },
        {
        'no': 2,
        'scope of work': "Electrical contact surface flexible lamination, braid and adaptor including replacement of spring washer",
        'quantity': "2 Lot",
        'unit price(IDR)' : '100.000.000',
        'total price(IDR)' : '200.000.000',
    }
]

import axios from 'axios';

export default {
  data() {
    return {
      quotation : '',
    };
  },
  beforeMount(){
        this.getDetail();

    },
  methods:{
      getDetail: function(){
          
            axios.get('http://localhost:8080/api/quotation/' +this.$route.params.id)
            .then(res => {this.quotation = res.data})
            .catch(err => this.quotation = err.data);
            console.log(quotation);
        },
        
      hideModal(){
        this.$refs['modal-download'].hide();
    },
  }
};
</script>

<style scoped>
body {
    font-family: 'Muli', sans-serif;
    background: #fafafa;
}

.judul{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 20px;
}
.nama-perusahaan{
    color: black;
    font-size:20px;
    margin-bottom: 20px;
}
.tabel-service{
    font-size:15px;
}
#download_button{
    font-size: 10px;
    float:right;
    background-color: green;
    color:white;
    border-color: white;
}

#modal-download{
    color:black;
}

.ti-download{
    margin-left:10px;
    margin-right: 10px;
}

.button_back{
    background-color: #109CF1;
    color:white;
    border-color: white;
    float:right;
    margin-top: 40px;
}

.tombol_okay{
    float:right;
}

#manage-button{
    margin-left: auto;
    margin-right: auto;
}

#delete_button{
    font-size: 10px;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
}
#edit_button{
    font-size: 10px;
    background-color: #109CF1;
    color:white;
    border-color: white;
}
</style>