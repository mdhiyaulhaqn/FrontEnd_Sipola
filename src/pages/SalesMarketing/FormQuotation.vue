<template>
  <div>
    <h3 class="judul"><strong>Add Quotation</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Add Quotation Form </h5>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <div class = "row">
                    <div class = "col-7">
                        <b-form-group>
                            <label for="quotationNo">Quotation No</label>
                            <b-form-input
                                id="quotationNo"
                                v-model="newQuotation.noQuotation"
                                type="text"
                                required
                                placeholder="Quotation Number">
                            </b-form-input>
                        </b-form-group>
                    </div>

             
                    <div class = "col-5">
                        <div style="color:black">
                        <b-form-group>
                            <label for="quotationDate">Quotation Date</label>
                            
                            <b-form-input
                                id="quotationDate"
                                v-model="newQuotation.date"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <b-form-group>
                    <label for="companyName">Company Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="newQuotation.companyName"
                        type="text"
                        required
                        placeholder="Company Name"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <label for="companyAddress">Company Address</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="newQuotation.termsConditions"
                        type="text"
                        required
                        placeholder="Company Address"
                        >
                    </b-form-input>
                </b-form-group>

                <b-row>
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
                </b-form-group>

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

import Service from '@/pages/SalesMarketing/Service.vue';


  export default {
    components : {
      Service
    },
    data() {
        
      return {
            services: [],
            id_services : {id:0},

            newQuotation: {
                noQuotation: null,
                quotationDate: null,
                companyName: null,
                companyAddress: null,
                termsConditions: null,
            },
            newService : {
                id_service : 0,
                nama : null,
                harga : null,
                quantity : null,
            },
            newCompany : {
                nama : null,
                address : null,
            },
            show: true
        }
    },

    beforeMount() {
      this.addRow();
	},
    
    methods: {
        deleteRow(id_service){
            this.services = this.services.filter(result => result.id_service !== id_service);
        },
        addRow(){
            this.newService.id_service++;
            let a = Object.assign({}, this.newService);
            this.services.push(a)
        },
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
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
.isi-form{
    margin-left: auto;
    margin-right: auto;
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
