<template>
  <div>
    <h3 class="judul"><strong>Add Reimbursement Report</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group>
                    <label for="projectName">Project</label>
                    <b-form-input
                        id="projectName"
                        v-model="newReimbursement.projectName"
                        type="text"
                        required
                        placeholder="Project Description"
                        >
                    </b-form-input>
                </b-form-group>

                <h5>Expenses</h5>
                <b-row>
                    <b-col md="5">
                      <label>Expense Name</label>
                    </b-col><br>

                    <b-col md="3">
                    <label>Price</label> 
                    </b-col>
                    <br>

                    <b-col md="3">
                    <label>Date</label>
                    </b-col><br>

                    <b-col md="1">
                    </b-col>
                </b-row>

                <b-row class="expenses" v-bind:key="item.id_expense" v-for="item in expenses">
                    <b-col>
                    <Expense v-bind:expense="item" v-on:del-expense="deleteRow" />
                    </b-col>
                </b-row> 

                 <b-row>
                    <b-col md="12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add More Item</button>
                    </b-col>
                </b-row><br>
                
                <b-row>
                    <b-col>
                    <label>Attachment</label>
                    </b-col>
                </b-row>
                <!-- <div class="dropArea">
                    <input class="form-control" type="file" ref="files" id="input-file-now" v-on:change="handleFilesUpload()"/>
                </div> -->

                <!-- <div class="uploadBox"> 
                    <div class="uploadBoxMain" v-if="!itemsAdded">
                        <div class="form-group">
                            <div class="dropArea" @ondragover="onChange" :class="dragging ? 'dropAreaDragging' : ''" @dragenter="dragging=true" @dragend="dragging=false">
                                <p>Drop your file here</p>
                                <input type="file" id="items" name="items[]" multiple @change="onChange">
                                <p class="help-block">or Click to select</p>
                            </div>
                        </div>
                    </div>
                    <div class="uploadBoxResult">
                        <p><strong>Nama File</strong></p>
                        <ol>
                            <li v-for="name in itemsNames">{{name}}</li>
                        </ol>
                        <p><strong>Size File</strong></p>
                        <ol>
                            <li v-for="size in itemsSizes">{{size}}</li>
                        </ol>
                        <button @click="removeItems">Remove</button>
                        <div class="loader" v-if="isLoaderVisible">
                            <div class="loaderImg"></div>
                        </div>
                    </div>
                </div>          -->

                <div class = "button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "add-reimbursement-button" type="submit">Add</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>
    <b-modal title="Reimbursement Report Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Reimbursement telah berhasil dibuat.
    </b-modal>

    <b-modal title="Reimbursement Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Reimbursement gagal dibuat.
    </b-modal>
  </div>
</template>

<script>

import Expense from '@/pages/ServiceTeam/ExpenseReimbursement.vue';
import axios from 'axios';

export default {
    components : {
      Expense
    },
    data() { 
      return {
            expenses: [],
            file: [],
            id_expense : {id:0},
            timestamp:"",
            files: '',
            newReimbursement : {
                createdBy : "adi",
                projectName : '',
                totalReimburse : 0,
                statusReimburse : 'On Progress',
                status : 'Active',
                listExpense : '',
                listAttachment : '',
            },
            new_expense : {
                id_expense : 0,
                nama : '',
                nominal : '',
                tanggal : '',
                createdBy : 'Adi',
                paidBy : 'Adi',
                reimbursement : '',
                status : 'Active'
            },
            new_attachment : {
                id_attachment : 0,
                fileName : '',
                image : '',
                reimbursement : '',
            },
            // new_company : {
            //     nama : '',
            //     alamat : '',
            //     quotation : '',
            // },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},

            //untuk attachment
            // dragging: false,
            // items: [],
            // itemsAdded: '',
            // itemsNames: [],
            // itemsSizes: [],
            // itemsTotalSize: '',
            // // formData: '',
            // attachments: [],
        }
    },

    beforeMount() {
      this.addRow();
	},
    
    methods: {
        addRow(){
            this.new_expense.id_expense++;
            let expense = Object.assign({}, this.new_expense);
            this.expenses.push(expense)
        },

        deleteRow(id_expense){
            this.expenses = this.expenses.filter(result => result.id_expense !== id_expense);
        },

        onSubmit(evt) {
            console.log("on submit")
            evt.preventDefault();
            this.newReimbursement.listExpense = this.expenses;
            // this.newReimbursement.listAttachment = this.attachments;
            // // console.log(this.newReimbursement.listExpense);
            // // console.log("perbedaan");
            // console.log(this.newReimbursement.listAttachment);
            this.addReimbursement(JSON.stringify(this.newReimbursement));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } else {
                this.failedModal = true;
            }
        },
        
        addReimbursement(reimburse){
            console.log("add reimburse")
            axios.post('http://localhost:8080/api/reimbursement/add', 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.newReimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        // addFile(e) {
        //   let dropFile = e.dataTransfer.files;
        //   if(!dropFile) return;
        //   ([...dropFile]).forEach(file => {
        //       this.files.push(file);
        //   });  
        // },

        // removeFile(file) {
        //     this.files = this.files.filter(f => {
        //         return f != file;
        //     });
        // },

        redirect(){
            this.$router.push({ name: 'detail-reimbursement',  params: {id:this.newReimbursement.id}});
        },

        hideModal(){
		    this.$refs['modal-hide'].hide();
        },

        bytesToSize(bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return 'n/a';
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            if (i === 0) return bytes + ' ' + sizes[i];
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        },

        // onChange(e) {
        //     // this.formData = new FormData();
        //     let files = e.target.files || e.dataTransfer.files;
        //     this.itemsAdded = files.length;
        //     let fileSizes = 0;
            
        //     for (let x in files) {
        //         if (!isNaN(x)) {
        //             // let attach = Object.assign({}, this.new_attachment);
        //             // var arrayBufferView = new Uint8Array( files[x]);
        //             // var blob = new Blob( [ arrayBufferView ], { type: files[x].type } );
        //             this.itemsNames[x] = files[x].name;
        //             this.new_attachment.id_attachment++;
        //             // const blob = new Blob(files[x].__proto__.__proto__.arrayBuffer, { type: files[x].type});
        //             this.new_attachment.fileName = files[x].name;
        //             console.log(files[x]);
        //             console.log(this.new_attachment.fileName);
        //             this.new_attachment.image = files[x].__proto__.__proto__;
        //             // this.new_attachment.image = blob;
        //             console.log(this.new_attachment.image);
        //             this.itemsSizes[x] = this.bytesToSize(files[x].size);
        //             fileSizes += files[x].size;
        //             let attach = Object.assign(this.new_attachment);
        //             this.attachments.push(attach);
        //             console.log("test");
        //             console.log(this.attachments);
        //             // this.formData.append('items[]', this.items);
        //         }
        //     }
        //     this.itemsTotalSize = this.bytesToSize(fileSizes);
        // },

        // removeItems() {
        //     this.items = '';
        //     this.itemsAdded = '';
        //     this.itemsNames = [];
        //     this.itemsSizes = [];
        //     this.itemsTotalSize = '';
        //     this.dragging = false;
        // },

        // handleFilesUpload(){
        //     this.files = this.$refs.files.files[0];
        //     let formData = new FormData();
        //     formData.append('files', this.files);
        //     axios.post('http://localhost:8080/api/attachment/uploadFile', 
        //     formData).then(res => {this.new_attachment = res.data});
        //     let attach = Object.assign(this.new_attachment);
        //     this.attachments.push(attach)
        // },

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

.add-reimbursement-button{
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

/* .uploadBox {
    position: relative;
    background: #eee;
    padding: 0 1em 1em 1em;
    margin: 1em;
}
.uploadBox h3 {
    padding-top: 1em;
}
.uploadBox .uploadBoxMain {
    position: relative;
    margin-bottom: 1em;
    margin-right: 1em;
}

/* Drag and drop 
.uploadBox .dropArea {
    position: relative;
    width: 100%;
    height: 300px;
    border: 5px dashed #00ADCE;
    text-align: center;
    font-size: 2em;
    padding-top: 80px;
}
.uploadBox .dropArea input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
} */
/* End drag and drop*/

</style>