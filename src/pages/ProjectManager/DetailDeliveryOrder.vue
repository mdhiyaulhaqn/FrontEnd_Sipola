<template>
    <div class="row">
        <div class = "col-12">
           <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item :to="{name: 'delivery-order'}">
                Delivery Order
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                Detail Delivery Order
                </b-breadcrumb-item>
            </b-breadcrumb>
            <h3 class="judul"><strong>Detail Delivery Order</strong></h3>
            <div ref="content">
            <div class = "row">
            <div class="col-md-12 col-sm-12 col-xs-12 col-12 d-block d-xs-block d-sm-block center">
            <card class="col">
              <h5 class="text-center">Delivery Order</h5>
                <div class="container-fluid">
                <b-row>
                    <div class="perusahaan col-sm-12 text-center">
                        <b class="col-sm-12">{{company.nama}}</b>
                        <p class="col-sm-12">{{company.alamat}}</p>
                    </div>
                </b-row>

                <b-row>
                    <div class = "col-lg-8 col-sm-7 col-xs-6">
                         <b-row>
                            <div class = "col-lg-5 col-sm-5 col-6">Delivery Order No</div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{delivery_order.noDeliveryOrder}}</div>

                            <div class = "col-lg-5 col-sm-5 col-6">Purchase Order No</div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{ delivery_order.poNumber}}</div>
                        </b-row>
                    </div>
                    <div class = "col-lg-4 col-sm-5 col-xs-6">
                        <b-row>
                            <div class = "col-lg-5 col-sm-5 col-6">Created by</div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{delivery_order.createdBy}} </div>
                            <div class = "col-lg-5 col-sm-5 col-6">Created at</div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{delivery_order.createdAt.slice(0, 19) | moment('lll') }}</div>
                        </b-row>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-lg-8 col-sm-7 col-xs-6">
                        <b-row>
                            <div class = "col-lg-5 col-sm-5 col-6">QC Passed / Delivery</div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{ delivery_order.qcPassed}}</div>
                        </b-row>
                     </div>
                </b-row>
                <b-row>
                    <div class = "col-lg-8 col-sm-7 col-xs-6">
                        <b-row>
                            <div class = "col-lg-5 col-sm-5 col-6">Ship By</div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{ delivery_order.shipBy}}</div>
                        </b-row>
                     </div>
                </b-row>
                 <b-row>
                    <div class = "col-lg-6 col-sm-4 col-12"><br>Product</div>
                    <div class = "col-lg-6 col-sm-8 col-12">
                         <button  @click="downloadReport" id="download_button" class="btn btn-primary">
                            Download
                            <span class="ti-download"></span>
                        </button>
                    </div>
                </b-row>

                <b-row>
                    <b-col >
                        <div class="tabel-service">
                            <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                <b-table
                                :items="delivery_order.product"
                                :fields="fields">
                                 <template v-slot:cell(id)="row">
                                    {{delivery_order.product.indexOf(row.item) + 1}}
                                </template>
                                </b-table>
                            </div>
                        </div>
                    </b-col>

                </b-row>

                <b-row>
                    <div class = "col-12"><br>Terms and Condition</div>
                    <div class = "col-12" id="terms-condition" v-html=delivery_order.termsCondition>
                    </div>
                </b-row>
                <b-row>
                    <div class = "button-group col-sm-12">
                        <b-button v-b-modal.modal-delete id="delete-button" class="btn btn-primary">Delete</b-button>
                        <router-link :to="{name: 'update-delivery-order'}">
                            <b-button id="edit-button" class="btn btn-primary">Edit</b-button>
                        </router-link>
                    </div>
                </b-row>
                </div>
            </card>
            </div>
            </div>
            </div>
        </div>
        <b-modal
            id="modal-download"
            ref="modal-download"
            centered
            >
            <template v-slot:modal-title>
                <div class="container">
                <h5 id="modal-title-download">Downloading Delivery Order ...</h5>
                </div>
            </template>
            <template v-slot:default>
                <div class="container">
                <b-row>
                    <b-col class="modal-icon col-2">
                        <img src="@/assets/img/download-icon.png" alt="" width="50px">
                    </b-col>
                    <b-col class="col-10">
                        <p id="modal-message"> The system is downloading delivery order no. {{delivery_order.noDeliveryOrder}}</p>
                    </b-col>
                </b-row>
                </div>
            </template>
             <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                <b-button @click="ok()" id="ok-button">
                    OK
                </b-button>
                </b-col>
            </template>
        </b-modal>
         <b-modal
            id="modal-delete"
            ref="modal-delete"
            centered
            >
            <template v-slot:modal-title>
                <div class="container">
                <h5 id="modal-title-delete">Delete Delivery Order?</h5>
                </div>
            </template>
            <template v-slot:default>
                <div class="container">
                <b-row>
                    <b-col class="modal-icon col-2">
                        <img src="@/assets/img/delete-confirm-icon.png" alt="" width="50px">
                    </b-col>
                    <b-col class="col-10">
                        <p id="modal-message">Delivery order no. {{delivery_order.noDeliveryOrder}} will be removed from the list.</p>
                    </b-col>
                </b-row>
                </div>
            </template>
            <template v-slot:modal-footer="{ cancel }">
                <b-col class="button-confirm-group">
                <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
                    Yes, delete it
                </b-button>
                <b-button @click="cancel()" id ="cancel_delete_button" class="btn btn-danger">
                    Cancel
                </b-button>
                </b-col>
            </template>
        </b-modal>

        <b-modal
            id="modal-success"
            ref="modal-success"
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
                    <p id="modal-message">Delivery order no. {{delivery_order.noDeliveryOrder}} was successfully deleted from list.</p>
                    </b-col>
                </b-row>
                </div>
            </template>
            <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                <b-button @click="ok()" id="ok-button">
                    OK
                </b-button>
                </b-col>
            </template>
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import authHeader from '../../services/auth-header';

export default {
    data() {
        return {
            delivery_order : {
              createdAt: []
            },
            successModal : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Name', sortable: true},
                {key: 'quantity', label: 'Quantity', sortable: true},
                {key: 'projectNo', label: 'ProjectNo', sortable: true},
            ],
            company: {
              id: '',
              nama: '',
              alamat: '',
            },
            url_local: 'http://localhost:8080/api/delivery-order/',
            url_deploy: 'https://sipola-sixab.herokuapp.com/api/delivery-order/'
        };
    },
    beforeMount(){
        this.getDetail();

    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.delivery_order.status = 'Inactive';
            this.deleteDeliveryOrder(this.delivery_order);
        },

        showMessage(status){
            this.successModal = true;

        },

        getDetail: function(){
            axios.get(this.url_deploy +this.$route.params.id, { headers: authHeader() })
            .then(res => {this.delivery_order = res.data, this.getNumber(), this.company = res.data.company})
            .catch(err => this.delivery_order = err.data);
        },

        getNumber(){
            for(let i = 0; i < this.delivery_order.product.length; i++){
                this.delivery_order.product[i].nomer = i+1;
            }
        },

        deleteDeliveryOrder(deliveryOrder){
            axios.put( this.url_deploy + 'change-status/' + this.$route.params.id,
                deliveryOrder,
                {
                    headers: authHeader()
                }
            )
            .then(res => {this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'delivery-order'});
        },

        hideModal(){
            this.$refs['modal-download'].hide();
        },
         downloadReport:function(){

            //Set Variable
            var doc = new jsPDF()
            let noDeliveryOrder = this.delivery_order.noDeliveryOrder
            let qcPassed = this.delivery_order.qcPassed
            let purchaseOrderNo = this.delivery_order.poNumber
            let termsCondition = this.delivery_order.termsCondition
            let company = this.delivery_order.company

            var img = new Image()
            img.src = "data:image/jpeg;base64,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"

            let startX = 25
            let startY = 20

            //HEADER

            doc.addImage(img, 'png', startX, 10, 25, 25);
            doc.setFontStyle("bolditalic");
            doc.setFontSize(10);
            doc.text('Your professional service solution',startX + 28,startY+5)

            var widthPaper = doc.internal.pageSize.width

            doc.setFontStyle("bold");
            doc.setFontSize(18);
            doc.text('Delivery Order', widthPaper/2 - 15, startY+25);

            doc.setFontStyle("light");
            doc.setFont('times new roman');
            doc.setFontSize(11);

            startY += 10
            doc.text('Delivery Order No ', startX, startY+35); doc.text(': ' + noDeliveryOrder, 65,startY+35);
            doc.text('QC Passed / Delivery ', startX, startY+41); doc.text(': '+ qcPassed, 65,startY+41);
            doc.text('Purchase Order ', startX, startY+47); doc.text(': '+ purchaseOrderNo, 65,startY+47);
            doc.text('Ship By ', startX, startY+53); doc.text(': ', 65,startY+53);

            doc.setFontStyle("bold");
            doc.text('Customer,', widthPaper-85, startY+35);
            doc.text(company.nama, widthPaper-85, startY+41);


            var lines = doc.splitTextToSize(company.alamat, 65);
            doc.text(lines, widthPaper-85, startY+47)

            doc.setFontStyle("light");

            //TABLE
            var product = this.delivery_order.product

            var columns = [
                {title: "No", dataKey: "nomer"},
                {title: "Description", dataKey: "nama"},
                {title: "Quantity", dataKey: "quantity"},
                {title: "Project / Serv. No.", dataKey: "projectNo"},
            ]

            doc.autoTable(columns, product, {
                startY:startY+65,
                margin:25,
                headStyles: {
                    fillColor: [218,37,28],
                    textColor: [255, 255, 255], //White
                    align : "center"
                },
                bodyStyles : {
                     textColor: [0, 0, 0], //White
                     fontSize : 10,
                },
                theme:'striped',
            });

            let finalY = doc.autoTable.previous.finalY;
            doc.setFontStyle("bold");

            //SYARAT DAN PENAWARAN
            doc.setFontStyle("bold");
            doc.text('REMARKS : ', startX, finalY+10);
            doc.rect(startX, finalY+15, 160, 20);
            doc.setFontStyle("light");

            var newY = finalY+40

            doc.setFontSize(11)
            doc.fromHTML(termsCondition, startX, newY, {
                pagesplit: true,
                'width':160,
            });

            //FOOTER
            var footerY = doc.internal.pageSize.height-5

            doc.text('Released & Approved By,', startX, footerY-75);  doc.text('Checked & Received By,', startX + 120, footerY-75);

            doc.text('(....................................)', startX, footerY-50); doc.text('(....................................)', startX + 120, footerY-50);
            doc.text('Date : ', startX, footerY-45); doc.text('Date : ', startX+ 120, footerY-45);
            doc.setDrawColor(0, 0, 0);


            doc.line(startX, footerY-35, startX+170, footerY-35);

            doc.addImage(img, 'png', startX, footerY-30, 20, 20);

            doc.setFont("muli")
            doc.setFontSize(14);
            doc.setTextColor('#348FBA')
            doc.text('PT SixAB Tehnik Industri', startX+22, footerY-18);

            doc.setFontStyle("bolditalic");
            doc.setTextColor('Black');
            doc.setFontSize(8);
            doc.text("Office & Workshop: ", 130,footerY-30)


            doc.setFontStyle("light")
            doc.setFont("times new roman")
            doc.text("Jl. Raya Puspitek-Parung Km. 7, Taman Sari Bukit Damai", 130, footerY-25)
            doc.text("Pedurenan Gunung Sindur, Bogor 16340", 130, footerY-20)
            doc.text("Phone : 0251 861.7096",130, footerY-15)
            doc.text("Fax : 0251 861.7097",130, footerY-10)


            doc.save('('+noDeliveryOrder + ') ' + ".pdf");

            this.$refs['modal-download'].show();

        }
    }
};
</script>

<style scoped>
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
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

.fa-warning{
    margin-left:10px;
    margin-right: 10px;
}

.modal-header{
    background-color: #FF3E1D;
}

#edit-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  width: 110px;
  margin-left: 10px;
  line-height: 15px;
  font-size: 12px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
}

#delete-button{
  background-color: #FF3E1D;
  border-color: #FF3E1D;
  width: 80px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
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
  font-size: 12px;
  width: 110px;
  border-color: #ff3e1d;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}
#cancel_delete_button{
  font-size: 12px;
  background-color: #ff3e1d;
  color:white;
  border-color: white;
  border-width: 1px;
  line-height: 15px;
}
h5{
  font-weight: bold;
}
#download_button{
    font-size: 10px;
    float:right;
    background-color: green;
    color:white;
    border-color: white;
}
.perusahaan{
    margin-bottom: 20px;
}
#modal-message{
  font-size: 16px;
}
#modal-title-delete{
  color:#FF3E1D;
  font-weight: 1000;
  margin-bottom: -4px;
}
#modal-title-download{
    color: #109CF1;
    font-weight: 1000;
    margin-bottom: -4px;
}
#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
  margin-bottom: -4px;
}
</style>
