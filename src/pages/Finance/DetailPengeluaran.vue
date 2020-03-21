<template>
    <div class="row">
        <div class = "container">
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
                <b-row class="button-group">
                    <b-col>
                        <br>
                        <button v-b-modal.modal-delete id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                        <button id ="edit_button" class="btn btn-primary">
                            Edit
                        </button>
                    </b-col>
                </b-row>

            </card>
        </div>

         <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Expense">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="ti-trash"></b-col>
                    <b-col cols="9">
                        Tiket Pesawat CGK - Sawangan will be removed from expense list.
                    </b-col>
                </b-row>
                </div>
                <b-row>
                    <b-col class="button-confirm-group">
                         <b-button @click="hideModal" id ="confirm_delete_button" variant="outline-danger">
                            Yes, Delete it
                        </b-button>
                        <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                            No
                        </b-button>
                    </b-col>
                </b-row>
                <!-- <div class = "tombol_okay">
                    <b-row>
                        <b-button class = "button_back" @click="hideModal" size="md" variant="primary">Okay</b-button>
                    </b-row>
                </div> -->
        
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
        this.$refs['modal-delete'].hide();
    },
  }
};
</script>

<style scoped>
body {
    font-family: 'Muli', sans-serif;
    background: #fafafa;
}

.container{
    max-width: 983px;
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

.button-group{
    text-align: center;
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

.ti-trash{
    font-size: 50px;
    text-align: center;
    color:#ff3e1d;
}

.button-confirm-group{
    text-align: right;
}

#confirm_delete_button{
    font-size: 10px;
    width: 130px;
    border-color: #ff3e1d;
    border-width: 1px;
    margin-right: 10px;
}

#cancel_delete_button{
    font-size: 10px;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
    border-width: 1px;
}


.button_back{
    background-color: #109CF1;
    color:white;
    border-color: white;
    /* float:right; */
    /* margin-top: 40px; */
}
</style>