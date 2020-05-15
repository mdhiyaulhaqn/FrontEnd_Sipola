<template>
  <div>
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item :to="{name: 'quotation'}">
          Quotation
        </b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'detail-quotation'}">
          Detail Quotation
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
          Update Quotation
        </b-breadcrumb-item>
      </b-breadcrumb>
    <h3 class="judul"><strong>Update Quotation</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <h5 class = "title-form">Update Quotation Form</h5>
            <b-form @submit="onModal" v-if="show">
                <div class = "row">
                    <div class = "col-md-7 col-12">
                        <b-form-group class="required">
                            <label class="label" for="noQuotation">Quotation No</label>
                            <b-form-input
                                id="noQuotation"
                                v-model="quotation.noQuotation"
                                type="text"
                                required
                                placeholder="Quotation Number"
                                disabled>
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <div class = "col-md-5 col-12">
                        <div style="color:black">
                        <b-form-group class="required">
                            <label class="label" for="date">Quotation Date</label>
                            <b-form-input
                                id="date"
                                v-model="quotation.date"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <b-form-group class="required">
                    <label class="label" for="companyName">Company Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="quotation.company.nama"
                        type="text"
                        required
                        placeholder="Company Name"
                        pattern=".*[a-zA-Z0-9-].*"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label" for="companyAddress">Company Address</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="quotation.company.alamat"
                        type="text"
                        required
                        placeholder="Company Address"
                        >
                    </b-form-input>
                </b-form-group>

                 <div class="d-none d-md-block d-lg-block">
                    <div class="row">
                        <div class = "col-md-6 required">
                            <label class="label" >Scope of Works</label>
                        </div>
                        <div class = "col-md-2 required">
                            <label class="label" >Quantity</label>
                        </div>
                        <div class = "col-md-3 required">
                            <label class="label" >Unit Price (IDR)</label>
                        </div>
                        <div class = "col-md-1">
                        </div>
                        <br>
                    </div>
                </div>

                <b-row class="services" v-bind:key="item.id_service" v-for="item in services">
                    <b-col>
                    <Service v-bind:service="item" v-on:del-service="deleteRow" />
                    </b-col>
                </b-row>

                  <b-row>
                    <div class ="col-md-6 col-12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add Scope of Works</button>
                    </div>
                </b-row>

                <!-- - Waktu Kerja : Normal working hour 8 Jam per Hari - Pembayaran : 100% setelah pekerjaan selesai - Validity : 1 bulan - Untuk jam kerja lebih dari normal working hour, maka dikenakan biaya lembur Rp.350.000,00 per jam - Untuk pekerjaan yang dilakukan di hari libur (Sabtu, Minggu dan Hari libur Nasional) dikenakan biaya tambahan Rp.2.500.000,00 Per Hari -->
                <b-form-group class="required">
                    <label class="label" for="termsConditions">Terms and Conditions</label>
                    <ckeditor :editor="editor"  v-model="quotation.termsCondition"></ckeditor>

                </b-form-group>

                <div class = "button-group">
                    <b-button class = "save-button" type="submit">Save</b-button>
                    <router-link :to="{name: 'detail-quotation'}">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    </router-link >
                </div>
            </b-form>
            </card>
        </div>
    </div>

     <b-modal
        id="modal-confirmation"
        centered
        v-model="warningModal"
        >
        <template v-slot:modal-title>
        <div class="container">
            <h5 id="modal-title-success">Save Changes?</h5>
        </div>
        </template>
        <template v-slot:default>
        <div class="container">
            <b-row>
            <b-col class="modal-icon col-2">
                <img src="@/assets/img/update-confirm-icon.png" alt="" width="50px">
            </b-col>
            <b-col class="col-10">
                <p id="modal-message">Quotation no {{quotation.noQuotation}} will be changed soon once you click the save button.</p>
            </b-col>
            </b-row>
        </div>
        </template>
        <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
            <b-button @click="onSubmit" class="save-button">
            Save
            </b-button>

            <b-button @click="cancel()" class="cancel-button">
            Cancel
            </b-button>
        </b-col>
        </template>
    </b-modal>

     <b-modal
        id="modal-success"
        centered
        v-model="successModal"
        @ok="redirect()"
        >
        <template v-slot:modal-title>
            <div class="container">
            <h5 id="modal-title-success">Success!</h5>
            </div>
        </template>
        <template v-slot:default>
            <div class="container">
            <b-row>
                <b-col class="modal-icon col-2">
                <img src="@/assets/img/success-icon.png" alt="" width="50px">
                </b-col>
                <b-col class="col-10">
                <p id="modal-message">Quotation no {{quotation.noQuotation}} was successfully changed.</p>
                </b-col>
            </b-row>
            </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
            <b-col class="button-confirm-group">
                <b-button @click="cancel()" class="back-button">
                  Back to List
                </b-button>
                <b-button @click="ok" class="see-button">
                  See Details
                </b-button>
            </b-col>
        </template>
    </b-modal>

    <!-- <b-modal title="Success!" v-model="successModal" hide-footer centered>
         <br>
        <div class = "container">
            <div class = "info">
            <b-row>
                 Quotation no {{quotation.noQuotation}} was successfully changed.
            </b-row>
            </div>
            <div style="float:right">
                <b-row>
                    <b-button id="cancel_update_button" @click="redirect" size="md" variant="primary">See Details</b-button>
                </b-row>
            </div>

        </div>

    </b-modal> -->

    <b-modal title="Quotation Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Quotation gagal dibuat.
    </b-modal>
  </div>
</template>

<script>

import Service from '@/pages/SalesMarketing/Service.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {
    components : {
      Service
    },

    data() {
      return {
            editor: ClassicEditor,
            services: [],
            id_services : {id:0},
            timestamp:"",

            quotation : {

            },
            new_service : {
                id_service : 0,
                nama : '',
                harga : '',
                quantity : '',
                quotation : '',
            },
            new_company : {
                nama : '',
                alamat : '',
                quotation : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            warningModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
        this.getDetail();
	},

    methods: {
        addRow(){
            this.new_service.id_service++;
            let service = Object.assign({}, this.new_service);
            this.services.push(service)
        },

        deleteRow(id_service){
            this.services = this.services.filter(result => result.id_service !== id_service);
        },

        onModal(evt) {
            this.warningModal = true;
        },

        onSubmit(evt) {
            // this.$refs['modal-confirmation'].hide();

            evt.preventDefault();

            this.quotation.service = this.services;

            this.updateQuotation(JSON.stringify(this.quotation));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            }
        },

        fetchData : function(){
            this.quotation.date = this.quotation.date.substring(0,10);
            let service_quot = this.quotation.service
            for(let i=0; i< service_quot.length ; i++){
                this.new_service.id_service++;
                this.new_service.nama = service_quot[i].nama;
                this.new_service.harga = service_quot[i].harga;
                this.new_service.quantity = service_quot[i].quantity;

                let service = Object.assign({}, this.new_service);
                this.services.push(service);

                this.new_service.nama = ''
                this.new_service.harga = ''
                this.new_service.quantity = ''
                this.new_service.quotation = ''
            }
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/quotation/' +this.$route.params.id)
            .then(res => {this.quotation = res.data, this.fetchData()})
            .catch(err => this.quotation = err.data);
        },

        updateQuotation(quot){
            axios.put('http://localhost:8080/api/quotation/update/' + this.$route.params.id,
            quot,
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.quotation = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'detail-quotation',  params: {id:this.quotation.id}});
        },

        cancel(){
            this.$router.push({ name: 'quotation'});
        },

        hideModal(){
		  	this.$refs['modal-hide'].hide();
		},
    }
}
</script>

<style scoped>

.required label:after {
    content: " *";
    color: red;
}
.add-button{
  width: 100%;
  background-color: white;
  color : #109cf1;
  border-color: #109cf1;
  margin-bottom: 10px;
}
.judul{
  text-align: center;
  color: black;
  margin: 5px 0 24px 0;
}
.title-form {
  font-weight: 600;
  margin-bottom: 20px;
}
.isi-form{
  margin-left: auto;
  margin-right: auto;
}

.save-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  margin-right: 10px;
  line-height: 15px;
  width: 120px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}

.cancel-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 1px;
  width: 80px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
}

.see-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  margin-left: 10px;
  line-height: 15px;
  width: 120px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}

.back-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 1px;
  width: 100px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}
.label{
  font-weight: 600;
}
#modal-message{
  font-size: 16px;
}
#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
}
.button-confirm-group{
  text-align: right;
}
h5{
  margin-bottom: -4px;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
#termsConditions{
    height: 180px;
}
</style>
