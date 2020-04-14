<template>
  <div>
    <h3 class="judul"><strong>Add Sales Order</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Add Sales Order Form </h5>
            <b-form @submit="onSubmit" v-if="show">

                <b-row>
                    <b-col md="6">
                    <b-form-group>
                        <label for="noSalesOrder">Sales Order No</label>
                        <b-form-input
                            id="noSalesOrder"
                            v-model="new_sales_order.noSalesOrder"
                            type="text"
                            required
                            placeholder="Sales Order Number">
                        </b-form-input>
                    </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group>
                            <label for="date">Sales Order Date</label>
                            <b-form-input
                                id="date"
                                v-model="new_sales_order.date"
                                type="date"
                                required>   
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                 <b-form-group>
                    <label for="poNumber">Purchase Order Number</label>
                    <b-form-input
                        id="poNumber"
                        v-model="new_sales_order.poNumber"
                        type="text"
                        required
                        placeholder="Sales Order Number">
                    </b-form-input>
                </b-form-group>
                
                <b-form-group>
                    <label for="date">Purchase Order Date</label>
                    <b-form-input
                        id="poDate"
                        v-model="new_sales_order.poDate"
                        type="date"
                        required>
                    </b-form-input>
                </b-form-group>

                <b-row>
                    <b-col md="12">
                        <b-form-group>
                            <label for="companyName" >Company Name</label>
                            <b-form-select v-model="new_sales_order.company" required>
                                <template slot="companyName">
                                    <option :value="null" disabled>-- Choose Company --</option>
                                </template>
                                <option v-for="company in companies" :key="company.id" :value="company">
                                    {{ company.nama }} - {{ company.alamat }}
                                </option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
             

                <b-row>
                    <b-col md="5">
                      <label>Description</label>
                    </b-col><br>

                    <b-col md="2">
                       <label>Qty</label> 
                    </b-col><br>

                    <b-col md="2">
                    <label>UOM</label> 
                    </b-col>
                    <br>

                    <b-col md="2">
                    <label>Unit Price</label> 
                    </b-col>
                    <br>

                    <b-col md="1">
                    
                    </b-col>
                </b-row>

                <b-row class="service_orders" v-bind:key="item.id_service_order" v-for="item in service_orders">
                    <b-col>
                    <ServiceOrder v-bind:service_order="item" v-on:del-service-order="deleteRow" />
                    </b-col>
                </b-row> 
                    
                <b-row>
                    <b-col md="5">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add Description</button>
                    </b-col>
                </b-row> 

                
                <b-form-group>
                    <label for="termsConditions">Terms and Conditions</label>
                    <b-form-textarea
                        id="termsConditions"
                        v-model="new_sales_order.termsCondition"
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
    <b-modal title="Sales Order Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Sales Order telah berhasil dibuat.
    </b-modal>

    <b-modal title="Sales Order  Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Sales Order gagal dibuat.
    </b-modal>
  </div>
</template>

<script>
import ServiceOrder from '@/pages/SalesMarketing/ServiceOrder.vue';
import axios from 'axios';

export default {
    components : {
        ServiceOrder
    },
    data() { 
      return {
            service_orders: [],
            companies : [],
            new_sales_order : {
                createdBy : "Adi",
                poDate : '',
                poNumber : '',
                date : '',
                noSalesOrder : '',
                termsCondition : '',
                company : '',
                status : 'Active',
                serviceOrder : '',
            },
            new_service_order : {
                id_service_order : 0,
                deskripsi : '',
                pricePerUnit : '',
                uom : '',
                quantity : '',
                sales_order : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
      this.addRow();
      this.getAllCompany();
	},
    
    methods: {
        addRow(){
            this.new_service_order.id_service_order++;
            let service = Object.assign({}, this.new_service_order);
            this.service_orders.push(service)
        },

        deleteRow(id_service_order){
            this.service_orders = this.service_orders.filter(result => result.id_service_order !== id_service_order);
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.new_sales_order.serviceOrder = this.service_orders;
            console.log(this.service_orders[0]);
            this.addSalesOrder(JSON.stringify(this.new_sales_order));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },
        
        addSalesOrder(quot){
            axios.post('http://localhost:8080/api/sales-order/add', 
            quot, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.new_sales_order = res.data.result, this.showMessage(res.data.status)});
        },

        getAllCompany: function(){
            axios.get('http://localhost:8080/api/company/all')
            .then(result => this.companies = result.data.result);
        },

        redirect(){
            this.$router.push({ name: 'detail-sales-order',  params: {id:this.new_sales_order.id}});
        },

        hideModal(){
		    this.$refs['modal-hide'].hide();
		},
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
