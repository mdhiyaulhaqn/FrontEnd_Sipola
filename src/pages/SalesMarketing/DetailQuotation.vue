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
                    <div class = "col-8 nama-perusahaan">PT BOVERI INDONESIA</div>
                    <div class = "col-4">Created by : I Made Adisurya Nugraha <br>Created At : 10 Februari 2019</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Quotation Number</div>
                    <div class = "col-6">: QS.18/X/094</div>

                </b-row>
                <b-row>
                    <div class = "col-2">Quotation Address</div>
                    <div class = "col-6">: 04 April 2019</div>
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
                                <b-table :items="services">
                                </b-table>
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <b-row>
                    <div class = "col-12"><br>Terms and Condition</div>
                    <div class = "col-12">
                        - Waktu Kerja : Normal working hour 8 Jam per Hari <br>
                        - Pembayaran : 100% setelah pekerjaan selesai <br>
                        - Validity : 1 bulan<br>
                        - Untuk jam kerja lebih dari normal working hour, maka  dikenakan biaya lembur Rp.350.000,- per jam<br>
                        - Untuk pekerjaan yang dilakukan di hari libur (Sabtu, Minggu dan Hari  libur Nasional) dikenakan biaya tambahan
                        Rp.2.500.000,- Per Hari
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
                    <span class="ti-download"></span>The system is downloading quotation no. QS.18/X/094
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

export default {
  data() {
    return {
      services :[...tableData],
      table1: {
        title: "Quotation List",
        subTitle: "",
        columns: [...tableColumns],
        data: [...tableData]
      },
    };
  },
  methods:{
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