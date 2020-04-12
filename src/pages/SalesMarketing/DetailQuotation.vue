<template>
    <div class="row">
        <div class = "col-12">
            <div class="judul">
                <strong>
                    Detail Quotation
                </strong>
            </div>
            <div ref="content">

            <card>
                <div class="container-fluid">
                <b-row>
                    <div class = "col-lg-7 col-sm-7 col-xs-6 nama-perusahaan">{{quotation.company.nama}}</div>
                    <div class = "col-lg-5 col-sm-5 col-xs-6">
                        <div class ="row">
                            <div class = "col-lg-5 col-sm-5 col-6">Created By </div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{quotation.createdBy}} </div>
                            <div class = "col-lg-5 col-sm-5 col-6">Created At </div>
                            <div class = "col-lg-7 col-sm-7 col-6">: {{ quotation.createdAt.split("T")[0].split("-").reverse().join('-') }}</div>
                        </div>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-lg-3 col-sm-4 col-6">Quotation Number </div>
                    <div class = "col-lg-6 col-sm-8 col-6">: {{quotation.noQuotation}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-3 col-sm-4 col-6">Quotation Date </div>
                    <div class = "col-lg-6 col-sm-8 col-6">: {{ quotation.date.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-3 col-sm-4 col-6">Address </div>
                    <div class = "col-lg-6 col-sm-8 col-6">: {{quotation.company.alamat}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-6 col-sm-4 col-12"><br>Service</div>
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
                                :items="quotation.service"
                                :fields="fields">
                                 <template v-slot:cell(id)="row">
                                    {{quotation.service.indexOf(row.item) + 1}}
                                </template>
                                 <template v-slot:cell(Total_Price(IDR))="row">
                                    {{row.item.harga}} * {{row.item.quantity}}
                                </template>
                                <template slot="FOOT_Total_Price(IDR)">
                                    <td>TOTAL<td>
                                    <td><td/>
                                    <td>{{quotation.total_harga_semua}}</td>
                                </template>
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
                        <button v-b-modal.modal-delete id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                         <router-link :to="{name: 'update-quotation'}">
                            <button id ="edit_button" class="btn btn-primary">
                                Edit
                            </button>
                         </router-link>
                    </div>
                </b-row>
                </div>

            </card>
            </div>
        </div>

         <b-modal id="modal-download" ref="modal-download" hide-footer centered title="Download Quotation">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <span class="ti-download"></span>The system is downloading quotation no. {{quotation.noQuotation}}<br><br>
                </b-row>
                </div>
                <div class = "tombol_okay">
                    <b-row>
                        <b-button id = "edit_button" @click="hideModal" size="md" variant="primary">Okay</b-button>
                    </b-row>
                </div>

            </div>
        </b-modal>

        <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Quotation?" ok-only>
            <br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="ti-trash"></b-col>
                    <b-col cols="9">
                       Quotation no {{quotation.noQuotation}} will be removed from the list.
                    </b-col>
                </b-row>
                </div>
                <b-row>
                    <b-col class="button-confirm-group">
                         <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
                            Yes, Delete it
                        </b-button>
                        <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                            No
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
        <b-modal title="Success!" v-model="successModal" @ok="redirect()" centered ok-only>
          <br>
            <div class = "container">
                <div class = "info">
                    <b-row>
                        <span class="ti-success"></span>Quotation no. {{quotation.noQuotation}} was successfully deleted from list.
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
import jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import html2canvas from "html2canvas"

export default {
    data() {
        return {
            quotation : '',
            successModal : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Scope of Work', sortable: true},
                {key: 'quantity', label: 'Quantity', sortable: true},
                {key: 'harga', label: 'Unit Price(IDR)', formatter: value => {
                    return value.toLocaleString('de-DE')}
                },
                {key: 'total_harga', label:  'Total_Price(IDR)', formatter: value => {
                    return value.toLocaleString('de-DE')}
                }
            ]
        };
    },

    beforeMount(){
        this.getDetail();
    },

    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.quotation.status = 'Inactive';
            this.deleteQuotation(JSON.stringify(this.quotation));
        },

        showMessage(status){
            this.successModal = true;
        },

        computeTotal(){
            var total_harga_semua = 0;
            for (let i = 0; i < this.quotation.service.length; i++) {
                this.quotation.service[i].nomer = i+1;
                this.quotation.service[i].total_harga = this.quotation.service[i].harga * this.quotation.service[i].quantity;
                total_harga_semua +=  this.quotation.service[i].total_harga;
            }
            this.quotation.total_harga_semua = total_harga_semua;
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/quotation/' +this.$route.params.id)
            .then(res => {this.quotation = res.data, this.computeTotal()})
            .catch(err => this.quotation = err.data);
        },

        deleteQuotation(quot){
            axios.put('http://localhost:8080/api/quotation/change-status/' + this.$route.params.id,
            quot,
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'quotation'});
        },

        hideModal(){
            this.$refs['modal-download'].hide();
        },
        downloadReport:function(){
            var doc = new jsPDF()
            let noQuotation = this.quotation.noQuotation
            let date = this.quotation.date.split("T")[0].split("-").reverse().join('-')
            let createdAt = this.quotation.createdAt.split("T")[0].split("-").reverse().join('-')
            let createdBy = this.quotation.createdBy
            let companyName = this.quotation.company.nama
            let companyAddress = this.quotation.company.alamat
            let termsCondition = this.quotation.termsCondition

            doc.setFontStyle("bold");
            doc.setFontSize(16);
            doc.text('Quotation', 25, 38);

            doc.setFontStyle("light");
            doc.setFont('times new roman');
            doc.setFontSize(10);
            doc.text('Inquiry No ', 25, 45); doc.text(': ', 55,45); doc.text('Date : ' + date, 150,45); 
            doc.text('Quotation No ', 25, 50); doc.text(': '+ noQuotation, 55,50);
            doc.text('Revision ', 25, 55); doc.text(': ', 55,55);

            doc.setFontSize(10);
            doc.text('Kepada Yth,', 25, 65);
            doc.text(companyName, 25, 70);
            doc.text(companyAddress, 25, 75);

            doc.text('Bersama ini kami sampaikan penawaran harga sebagai berikut', 25, 90);

            var service = this.quotation.service

            var columns = [
                {title: "No", dataKey: "nomer"},
                {title: "Scope of Work", dataKey: "nama"},
                {title: "Qty", dataKey: "quantity"},
                {title: "Price/ unit (IDR)", dataKey: "harga"},
                {title: "Total Price (IDR)", dataKey: "total_harga"}
            ]
            doc.autoTable(columns, service, {
                startY:100,
                margin:25,  
                minCellHeight : 200,
                headStyles: {
                        fillColor: [189,38,64],  
                        textColor: [255, 255, 255], //White     
                },
                theme:'grid',
            });

            let finalY = doc.autoTable.previous.finalY;
            var totalharga = 'Rp '+this.quotation.total_harga_semua.toLocaleString('de-DE');
            doc.text('Total Harga : '+ totalharga, 120, finalY+10);

            var lMargin=20; //left margin in mm
            var rMargin=20; //right margin in mm
            var pdfInMM=210;  // width of A4 in mm

            doc.setFontStyle("bold");
            doc.text('Syarat dan Kondisi Penawaran : ', 25, finalY+20);
            doc.setFontStyle("light");
            var termsSplit = termsCondition.split("-")
            var newY = finalY+20
            for (let i = 0; i < termsSplit.length-1; i++){
                var service = '-' + termsSplit[i+1]
                var lines = doc.splitTextToSize(service, (pdfInMM-lMargin-rMargin));
                console.log(lines)
                newY = finalY + 25 + i*5
                
                doc.text(lines, 25, newY);
                
            }
            newY +=10;

            
            
            doc.text('Demikian penawaran harga yang kami sampaikan dan kami tunggu kabar selanjutnya dari Bapak/Ibu.', 25, newY+10);
            doc.text('Terima kasih atas perhatiannya.', 25, newY+15);

            doc.text('Best Regards,', 25, newY+25);
            doc.addPage()

            doc.text(createdBy, 25, newY+35);
            doc.line(25, newY+60, 210, newY+60);

            doc.setFontSize(8);

            doc.setFontStyle("bold");
            doc.text("Office & Workshop: ", 140,newY+65)

            doc.setFontStyle("light");
            doc.text("Jl. Raya Puspitek-Parung Km. 7, Taman Sari Bukit Damai", 140, newY+70)
            doc.text("Pedurenan Gunung Sindur, Bogor 16340", 140, newY+75)
            doc.text("Phone : 0251 861.7096",140, newY+80)
            doc.text("Fax : 0251 861.7097",140, newY+85)
            

            doc.save(noQuotation + ".pdf");

            this.$refs['modal-download'].show();

        }
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

.fa-warning{
    margin-left:10px;
    margin-right: 10px;
}

.modal-header{
    background-color: #FF3E1D;
}

.button_back{
    background-color: #FF3E1D;
    color:white;
    border-color: white;
    float:right;
    margin-top: 40px;
}

.button_oke{
    background-color:white;
    color:#FF3E1D;
    border-color: #FF3E1D;
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
</style>
