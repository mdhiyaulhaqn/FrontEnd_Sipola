<template>
  <div>
    <h3 class="judul"><strong>Add Expense</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Add Expense Form </h5>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group>
                    <label class="label" for="nama">Expense Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.nama"
                        type="text"
                        required
                        placeholder="Expense Name"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <label class="label" for="nominal">Nominal</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="newPengeluaran.nominal"
                        type="text"
                        required
                        placeholder="Company Address"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <label class="label" for="tanggal">Date</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.tanggal"
                        type="date"
                        required
                        placeholder="Date"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <label class="label" for="paidBy">Paid by</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.paidBy"
                        type="text"
                        required
                        placeholder="Paid by"
                        >
                    </b-form-input>
                </b-form-group>


                <!-- <b-row>
                    <b-col md="6">
                      <label>Scope of Works</label>
                    </b-col>

                    <b-col md="2">
                    <label>Quantity</label> 
                    </b-col>

                    <b-col md="3">
                    <label>Unit Price</label> 
                    </b-col>

                    <b-col md="1">
                    
                    </b-col>
                </b-row>

                <b-row class="services" v-bind:key="item.id_service" v-for="item in services">
                    <b-col>
                    <Service v-bind:service="item" v-on:del-service="deleteRow" />
                    </b-col>
                </b-row> 
                    
                <b-row>
                    <b-col md="12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add Scope of Works</button>
                    </b-col>
                </b-row> 

                
                <b-form-group>
                    <label for="termsConditions">Terms and Conditions</label>
                    <b-form-textarea
                        id="termsConditions"
                        v-model="newQuotation.terms"
                        type="text"
                        required
                        placeholder="Terms and Conditions"
                        >
                    </b-form-textarea>
                </b-form-group> -->

                <div class = "button-group">

                <b-button class = "cancel-button" type="reset">Cancel</b-button>
                <b-button class = "add-quotation-button" type="submit">Add</b-button>

                </div>
                
            </b-form>
            </card>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    components : {
    },
    data() {
      return {
            services: [],
            id_services : {id:0},

            newPengeluaran: {
                nama : null,
                nominal : 0,
                tanggal : null,
                paidBy : null
            },
            
            show: true
        }
    },

    beforeMount() {
    //   this.addRow();
	},
    
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.nama = ''
            this.form.nominal = ''
            this.form.tanggal = null
            this.form.paidBy = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style scoped>

.add-button{
    width:360px;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
}

.judul{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 20px;
}

.title-form{
    font-weight: 900;
}

.isi-form{
    margin-left: auto;
    margin-right: auto;
}

.label{
    font-weight: 700;
}

.add-quotation-button{
    border-color: white;
    background-color: #109CF1;
    color:white;
}

.cancel-button{
    color:#109CF1;
    border-color:#109CF1;
    background-color: white;
}

.button-group{
    float:right;
}

</style>
