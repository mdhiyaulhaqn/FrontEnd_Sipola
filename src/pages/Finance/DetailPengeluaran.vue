<template>

    <div class="row">
        <div class = "col-12">
            <div class="judul">
                <strong class="judul">
                    Expense Detail
                </strong>
            </div> 
            
            <card>
                <div class = "nama-pengeluaran">Tiket Pesawat CGK - Sawangan</div>
                <b-row>
                    <b-col cols="4"></b-col>
                    <b-col cols="2" class="detail-label">Nominal</b-col>
                    <b-col cols="6" class="detail-text">: Rp10.000</b-col>
                </b-row>
                <b-row>
                    <b-col cols="4"></b-col>
                    <b-col cols="2" class="detail-label">Date</b-col>
                    <b-col cols="6" class="detail-text">: Feb, 4 2020</b-col>
                </b-row>
                <b-row>
                    <b-col cols="4"></b-col>
                    <b-col cols="2" class="detail-label">Paid by</b-col>
                    <b-col cols="6" class="detail-text">: Susanto N.</b-col>
                </b-row>
                <b-row>
                    <b-col cols="4"></b-col>
                    <b-col cols="2" class="detail-label">Created date</b-col>
                    <b-col cols="6" class="detail-text">: Mar, 3 2020</b-col>
                </b-row>
                <b-row>
                    <b-col cols="4"></b-col>
                    <b-col cols="2" class="detail-label">Created by</b-col>
                    <b-col cols="6" class="detail-text">: Ulhaq</b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <br>
                        <button id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                        <button id ="edit_button" class="btn btn-primary">
                            Edit
                        </button>
                    </b-col>
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
export default {
  data() {
    return {
      services :[...tableData],
      table1: {
        title: "Pengeluaran List",
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
    font-weight: 10000;
}

.nama-pengeluaran{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 50px;
    font-weight: bold;
}

.row {
    margin-bottom: 20px;
}

.detail-label{
    /* text-align: right; */
    padding-left: 40px;
    font-weight: bold;
}

button{
    border-radius: 8px;
}

#delete_button{
    font-size: 10px;
    width: 56;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
}
#edit_button{
    font-size: 10px;
    width: 130px;
    background-color: #109CF1;
    color:white;
    border-color: white;
}

.button_back{
    background-color: #109CF1;
    color:white;
    border-color: white;
    float:right;
    margin-top: 40px;
}
</style>