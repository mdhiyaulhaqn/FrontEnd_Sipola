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

                <!-- <b-row class="attachmentInput">
                    <b-col>
                       <drop class="drop" @drop="handleDrop">drop files</drop>
                       <div>
                           <li v-for="item in files">{{item.name}}</li>
                       </div> -->
                    <!-- <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
                    <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple /> -->
                    <!-- </b-col>
                </b-row>
                <b-row> -->
                    
                <!-- <b-row>
                    <b-col md="12">
                        <b-form-group> 
                        <div class="file is-boxed is-secondary">
                            <label class="file-label">
                            <input class="file-input" type="file" ref="file" multiple v-on:change="handleFilesUpload()"/>
                            <span class="file-cta">
                                <span class="file-icon"><i class="ti-upload"></i></span>
                                <span class="file-label">Drop Your Files Here...</span>
                            </span>
                                <span class="file-name" v-if="file">{{file.name}}</span>
                            </label>
                        </div>
                        </b-form-group>
                    </b-col>
                </b-row> -->

                <b-row> 
                    <b-col>
                        <div class="dropzone">
                        <input type="file" class="input-file" ref="file" id="file"
                        @change="selectFile" />
                        <p v-if="!uploading && !isAnyImage" class="call-to-action">
                            <i class="far fa-arrow-alt-circle-up" style='font-size:30px'></i>
                         Drag and drop your files here 
                         <label class="labelFile" for="file"><button class="button-label">Select <i class="far fa-arrow-alt-circle-up"></i></button></label></p>
                         
                        
                        
                        <p v-if="uploading" class="progressbar"></p>
                        <div class="box-image" v-if="isAnyImage">
                            <div class="per-item" >
                                <img v-for="file in previewFile" :key="file" :src="file" alt="Image" class="image-preview">
                                <!-- <p v-bind:key="file" v-for="file in previewFile">{{file.name}}</p> -->
                            </div>
                        </div>
                        </div>
                    </b-col>
                </b-row>

                <!-- <div id="upload">
                    <vue-dropzone 
                        ref="dropzone" 
                        id="drop1" 
                        :options="dropOptions"
                        @vdropzone-complete="afterComplete"
                        ></vue-dropzone>
                        <button @click="removeAllFiles">Remove All Files</button>
                </div> -->

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
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
// import vueDropzone from 'vue2-dropzone';
   
export default {
    components : {
      Expense,
    //   vueDropzone,
    },
    data() { 
      return {
            // dropOptions: {
            //     url: "https://httpbin.org/post",
            //     maxFilesize: 200, // MB
            //     maxFiles: 4,
            //     chunking: true,
            //     chunkSize: 300, // Bytes
            //     thumbnailWidth: 100, // px
            //     thumbnailHeight: 100,
            //     addRemoveLinks: true
            // },
            
            // variabel for attachment
            uploading : false,
            file: '',
            files: [],
            avatar: null,
            isAnyImage: false,
            attachment: '',
            statusAttach:'',
            attachments : [],
            uploadedFile: [],
            progress : 0,
            previewFile : [],
            // batas attachment

            expenses: [],
            id_expense : {id:0},
            timestamp:"",
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
                id: 0,
                fileName : '',
                image : '',
                reimbursement : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
            
      }
    },

    beforeMount() {
      this.addRow();
    //   this.attachment = Object.assign({}, this.new_attachment);
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

        onSubmit(evt) {
            evt.preventDefault();
            console.log(this.attachment);
            // this.attachments.push(this.attachment);
            console.log(this.attachments);
            this.newReimbursement.listAttachment = this.attachments;
            this.newReimbursement.listExpense = this.expenses;
            this.addReimbursement(JSON.stringify(this.newReimbursement));
        },

        addReimbursement(reimburse){
            console.log("add reimburse")
            console.log(reimburse);
            axios.post('http://localhost:8080/api/reimbursement/add', 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.newReimbursement = res.data.result, this.showMessage(res.data.status)});
        },

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


        handleFilesUpload(){
            this.file = this.$refs.file.files[0];            
            let image = this.$refs.file.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.avatar = e.target.result;
            }
            console.log(this.file);
            this.uploadFile(this.file);
        },

        selectFile(){
            // const files = this.$refs.files.files;
            // this.files = [ ...this.files, ...files];
            this.file = this.$refs.file.files[0];
            let image = this.$refs.file.files[0];
            this.isAnyImage = true;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                let ava = e.target.result;
                this.previewFile.push(ava);
            }
            // this.uploadedFile.push(this.file);
            console.log('habis ini');
            console.log(this.previewFile);
            this.uploadFile(this.file);
            // this.uploadFile(file);
            
            console.log
        },

        uploadFile(attach) {
            let formData = new FormData();
            console.log(attach);
            formData.append('file', this.file);
            axios.post('http://localhost:8080/api/attachment/uploadFile', 
            // FormData)
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {this.attachment = res.data.result});
            this.uploadedFile.push(this.attachment);
            this.attachments.push(this.attachment);
            // this.uploadedFile.push(m);
            console.log(this.attachment);
            console.log(this.attachments)
            console.log('tes');
        },

        
        // afterComplete(file) {
        //     console.log(file);
        //     this.files = this.$refs.dropzone.file;
        //     console.log(this.files);
        //     var x;
        //     for (x in this.files) {
        //         console.log(this.files[x].file);
        //         let formData = new FormData();
        //         formData.append('file', this.files[x]);
        //         axios.post('http://localhost:8080/api/attachment/uploadFile', 
        //         // FormData)
        //         formData,
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         })
        //         .then(res => {this.attachment = res.data.result});
        //         let attach = Object.assign(this.new_attachment, this.attachment);
        //         this.attachments.push(attach);
        //     }

        // },
        // removeAllFiles() {
        //     this.$refs.dropzone.removeAllFiles();
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

.file-label {
    height: 100px;
    width: 100%;
}

.image-preview {
    height: 100px;
    width: 100px;
    padding: 5px 10px 5px 10px;
}


.dropzone {
    min-height: 200px;
    padding: 10px 10px;
    position: relative;
    cursor: pointer;
    outline: 2px dashed black; 
    outline-offset: -10px;
    border-color: white;
}

.input-file{
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
    background: black;
}

.dropzone:hover {
    background: lightgray;
}

.dropzone .call-to-action {
    font-size: 1.2rem;
    text-align: center;
    padding: 70px 0;
}

.button-label{
    background-color: white;
    color: black;
    border: 1px solid lightgray;
}


</style>