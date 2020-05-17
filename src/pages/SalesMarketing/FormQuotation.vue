<template>
  <div>
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'quotation'}">
        Quotation
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Add Quotation
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Add Quotation</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <h5 class = "title-form">Add Quotation Form</h5>
            <b-form @submit="onSubmit" v-if="show">
                <div class = "row">
                    <div class = "col-md-7 col-12">
                        <b-form-group class="required">
                            <label class="label" for="noQuotation">Quotation No</label>
                            <b-form-input
                                id="noQuotation"
                                v-model="new_quotation.noQuotation"
                                type="text"
                                required
                                placeholder="Quotation Number">
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <div class = "col-md-5 col-12">
                        <div style="color:black">
                        <b-form-group class="required">
                            <label  class="label"  for="date">Quotation Date</label>
                            <b-form-input
                                id="date"
                                v-model="new_quotation.date"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <b-form-group class="required">
                    <label class="label"  for="companyName">Company Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="new_company.nama"
                        type="text"
                        required
                        placeholder="Company Name"
                        pattern=".*[a-zA-Z0-9-].*"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label"  for="companyAddress">Company Address</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="new_company.alamat"
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

                <b-form-group class="required">
                    <label class="label" for="termsConditions">Terms and Conditions</label>
                    <ckeditor :editor="editor"  v-model="new_quotation.termsCondition"></ckeditor>
                </b-form-group>

                <div class = "button-group">
                    <b-button class = "save-button" type="submit">Save</b-button>
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>
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
                <p id="modal-message">Quotation was successfully added.</p>
            </b-col>
            </b-row>
        </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
            <b-col class="button-confirm-group">
                <b-button @click="cancel()" class="back-button">
                    Back to List
                </b-button>
                <b-button @click="ok()" class="see-button">
                    See Details
                </b-button>
            </b-col>
        </template>
    </b-modal>
    <!-- <b-modal title="Quotation Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Quotation telah berhasil dibuat.
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

            new_quotation : {
                createdBy : "adi",
                date : '',
                noQuotation : '',
                termsCondition : '',
                status : 'Active',
                company : '',
                service : '',
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
            send : {objects : null},
        }
    },

    beforeMount() {
      this.addRow();
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

        onSubmit(evt) {
            evt.preventDefault();
            this.new_quotation.company = this.new_company;
            this.new_quotation.service = this.services;
            this.addQuotation(JSON.stringify(this.new_quotation));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            }
        },

        addQuotation(quot){
            axios.post('http://localhost:8080/api/quotation/add',
            quot,
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.new_quotation = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'detail-quotation',  params: {id:this.new_quotation.id}});
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

.ck-editor__editable {
    min-height: 500px;
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
  margin: 11px 0 24px 0;
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

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}
.label{
    font-weight: 600;
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
#modal-message{
    font-size: 16px;
}
#modal-title-success{
    color: #109CF1;
    font-weight: 1000;
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
    height: 200px;
}

</style>
