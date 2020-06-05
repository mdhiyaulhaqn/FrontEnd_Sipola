<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Income & Expense Summary
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Income & Expense Summary</strong></h3>
      <card>
        <b-container fluid>
          <b-row align-h="center" style="margin: 12px 0 0 0;">
            <b-form>
              <b-row align-v="end">
                <b-form-group class="form-tanggal">
                    <label class="label" for="startDate">Start Date</label>
                    <b-form-input
                        id="startDate"
                        v-model="startDate"
                        type="date"
                        placeholder="Start Date"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="form-tanggal">
                    <label class="label" for="endDate">End Date</label>
                    <b-form-input
                        id="endDate"
                        v-model="endDate"
                        type="date"
                        placeholder="End Date"
                        >
                    </b-form-input>
                </b-form-group>
                <div class = "button_group">
                  <b-button class ="find-button" @click="onSubmit" style="font-size:13px">
                    Find
                    <i class="fa fa-search" style="color: white; margin-left: 5px;"></i>
                  </b-button>
                </div>
              </b-row>
            </b-form>
          </b-row>

          <div v-if="this.invalidDate" style="text-align:center; color: red;">
            <p class="invalid-date-text">Date is invalid ! </p>
            <p class="invalid-date-text">End date must be greater or equal to start date.</p>
          </div>

          <!-- SUMMARY STATEMENT -->
          <b-container class="summary_statement">
            <b-row>
              <b-col class="col-5 col-md-6" style="padding: 0">
                  <p>Income</p>
              </b-col>
              <b-col class="">
                <b-row align-h="between">
                  <p>:</p>
                  <p>Rp{{formatPrice(totalPendapatan)}}</p>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="expense-summary">
              <b-col class="col-5 col-md-6" style="padding: 0">
                  <p>Expense</p>
              </b-col>
              <b-col class="">
                <b-row align-h="between">
                  <p>:</p>
                  <p>Rp{{formatPrice(this.totalPengeluaran)}}</p>
                </b-row>
              </b-col>
            </b-row>

            <b-row v-if="this.totalPendapatan - this.totalPengeluaran > 0">
              <b-col class="col-5 col-md-6" style="padding: 0">
                  <p class="profit">Profit</p>
              </b-col>
              <b-col class="">
                <b-row align-h="between">
                  <p class="profit">:</p>
                  <p class="profit">Rp{{formatPrice(this.totalPendapatan - this.totalPengeluaran)}}</p>
                </b-row>
              </b-col>
            </b-row>

            <b-row v-else>
              <b-col class="col-5 col-md-6" style="padding: 0">
                  <p class="loss">Loss</p>
              </b-col>
              <b-col class="">
                <b-row align-h="between">
                  <p class="loss">:</p>
                  <p class="loss">Rp{{formatPrice(this.totalPendapatan - this.totalPengeluaran)}}</p>
                </b-row>
              </b-col>
            </b-row>
          </b-container>

          <b-row>
            <!-- INCOME TABLE -->
            <b-col>
              <p class="list-label">Income List</p>
              <b-table
                show-empty
                small
                stacked="md"
                :items="incomeItems"
                :fields="fieldsInvoice"
                :current-page="currentPage"
                :per-page="perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :borderless="true"
                :sticky-header="true"
              >
                <template v-slot:head(index)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(noInvoice)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(dateInvoice)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(nominal)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>

                <template v-slot:cell(index)="row">
                  {{ row.index + 1}}
                </template>

                <template v-slot:cell(nominal)="row">
                  Rp{{formatPrice(row.item.nominal)}}
                </template>

                <template v-slot:cell(dateInvoice)="row">
                  {{row.item.dateInvoice | moment("ll")}}
                </template>
              </b-table>

              <b-row align-h="between" id="income_row" v-if="this.isWindowSmall">
                <b-col cols="4" style="width:300px">
                  <div v-if="perPage > pendapatanList.length" class="my-2">
                    <b-card-sub-title>Showing {{ pendapatanList.length }} of {{ pendapatanList.length }}</b-card-sub-title>
                  </div>
                  <div v-else-if="currentPage != 1 && currentPage === Math.ceil(pendapatanList.length/perPage)" class="my-2">
                    <b-card-sub-title>Showing {{ pendapatanList.length % perPage }} of {{ pendapatanList.length }}</b-card-sub-title>
                  </div>
                  <div v-else class="my-2">
                    <b-card-sub-title>Showing {{ perPage }} of {{ pendapatanList.length }}</b-card-sub-title>
                  </div>
                </b-col>
                <b-col cols="8">
                  <div>
                    <b-form-group
                      label="Rows per page:"
                      label-cols="8"
                      label-cols-sm="8"
                      label-cols-md="8"
                      label-cols-xl="10"
                      label-cols-lg="8"
                      label-align="right"
                      label-align-md="right"
                      label-align-sm="right"
                      label-align-lg="right"
                      label-align-xl="right"
                      label-size="sm"
                      label-for="perPageSelect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="this.isWindowSmall">
                <b-col>
                  <div style="margin: 10px 0 0 0;">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      align="center"
                      size="sm"
                      class="my-1"
                      style="margin-left: 0;"
                    ></b-pagination>
                  </div>
                </b-col>
              </b-row>
            </b-col>

            <!-- EXPENSE TABLE -->
            <b-col style="width: 200px">
              <p class="list-label">Expense List</p>
              <b-table
                show-empty
                small
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPagePengeluaran"
                :per-page="perPagePengeluaran"
                :sort-by.sync="sortByPengeluaran"
                :sort-desc.sync="sortDescPengeluaran"
                :sort-direction="sortDirectionPengeluaran"
                :borderless="true"
                :sticky-header="true"
              >
                <template v-slot:head(index)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(nama)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(tanggal)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(nominal)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>

                <template v-slot:cell(index)="row">
                  {{row.index + 1}}
                </template>

                <template v-slot:cell(nominal)="row">
                  Rp{{formatPrice(row.item.nominal)}}
                </template>

                <template v-slot:cell(tanggal)="row">
                  {{row.item.tanggal | moment("ll")}}
                </template>
              </b-table>

              <b-row align-h="between" id="expense_row" v-if="this.isWindowSmall">
                <b-col cols="4" style="width:300px">
                  <div v-if="perPage > pengeluaranList.length" class="my-2">
                    <b-card-sub-title>Showing {{ pengeluaranList.length }} of {{ pengeluaranList.length }}</b-card-sub-title>
                  </div>
                  <div v-else-if="currentPage != 1 && currentPage === Math.ceil(pengeluaranList.length/perPage)" class="my-2">
                    <b-card-sub-title>Showing {{ pengeluaranList.length % perPage }} of {{ pengeluaranList.length }}</b-card-sub-title>
                  </div>
                  <div v-else class="my-2">
                    <b-card-sub-title>Showing {{ perPage }} of {{ pengeluaranList.length }}</b-card-sub-title>
                  </div>
                </b-col>
                <b-col cols="8">
                  <div>
                    <b-form-group
                      label="Rows per page:"
                      label-cols="8"
                      label-cols-sm="8"
                      label-cols-md="8"
                      label-cols-xl="10"
                      label-cols-lg="8"
                      label-align="right"
                      label-align-md="right"
                      label-align-sm="right"
                      label-align-lg="right"
                      label-align-xl="right"
                      label-size="sm"
                      label-for="perPageSelect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="perPagePengeluaran"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptionsPengeluaran"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="this.isWindowSmall">
                <b-col>
                  <div style="margin: 10px 0 0 0;">
                    <b-pagination
                      v-model="currentPagePengeluaran"
                      :total-rows="totalRowsPengeluaran"
                      :per-page="perPage"
                      align="center"
                      size="sm"
                      class="my-1"
                      style="margin-left: 0;"
                    ></b-pagination>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-if="!this.isWindowSmall">
            <b-col>
              <b-row align-h="between" id="income_row">
                <b-col cols="4" style="width:300px">
                  <div v-if="perPage > pendapatanList.length" class="my-2">
                    <b-card-sub-title>Showing {{ pendapatanList.length }} of {{ pendapatanList.length }}</b-card-sub-title>
                  </div>
                  <div v-else-if="currentPage != 1 && currentPage === Math.ceil(pendapatanList.length/perPage)" class="my-2">
                    <b-card-sub-title>Showing {{ pendapatanList.length % perPage }} of {{ pendapatanList.length }}</b-card-sub-title>
                  </div>
                  <div v-else class="my-2">
                    <b-card-sub-title>Showing {{ perPage }} of {{ pendapatanList.length }}</b-card-sub-title>
                  </div>
                </b-col>
                <b-col cols="8">
                  <div>
                    <b-form-group
                      label="Rows per page:"
                      label-cols="8"
                      label-cols-sm="8"
                      label-cols-md="8"
                      label-cols-xl="10"
                      label-cols-lg="8"
                      label-align="right"
                      label-align-md="right"
                      label-align-sm="right"
                      label-align-lg="right"
                      label-align-xl="right"
                      label-size="sm"
                      label-for="perPageSelect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div style="margin: 10px 0 0 0;">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      align="center"
                      size="sm"
                      class="my-1"
                      style="margin-left: 0;"
                    ></b-pagination>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row align-h="between" id="expense_row">
                <b-col cols="4" style="width:300px">
                  <div v-if="perPage > pengeluaranList.length" class="my-2">
                    <b-card-sub-title>Showing {{ pengeluaranList.length }} of {{ pengeluaranList.length }}</b-card-sub-title>
                  </div>
                  <div v-else-if="currentPage != 1 && currentPage === Math.ceil(pengeluaranList.length/perPage)" class="my-2">
                    <b-card-sub-title>Showing {{ pengeluaranList.length % perPage }} of {{ pengeluaranList.length }}</b-card-sub-title>
                  </div>
                  <div v-else class="my-2">
                    <b-card-sub-title>Showing {{ perPage }} of {{ pengeluaranList.length }}</b-card-sub-title>
                  </div>
                </b-col>
                <b-col cols="8">
                  <div>
                    <b-form-group
                      label="Rows per page:"
                      label-cols="8"
                      label-cols-sm="8"
                      label-cols-md="8"
                      label-cols-xl="10"
                      label-cols-lg="8"
                      label-align="right"
                      label-align-md="right"
                      label-align-sm="right"
                      label-align-lg="right"
                      label-align-xl="right"
                      label-size="sm"
                      label-for="perPageSelect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="perPagePengeluaran"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptionsPengeluaran"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div style="margin: 10px 0 0 0;">
                    <b-pagination
                      v-model="currentPagePengeluaran"
                      :total-rows="totalRowsPengeluaran"
                      :per-page="perPage"
                      align="center"
                      size="sm"
                      class="my-1"
                      style="margin-left: 0;"
                    ></b-pagination>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';

export default {
  data() {
    return {
      pengeluaranList: [],
      pendapatanList: [],
      fieldsInvoice: [
        { key: 'index', label: 'No', sortable: false },
        { key: 'noInvoice', label: 'No Invoice', sortable: true, },
        { key: 'dateInvoice', label: 'Date', sortable: true, },
        { key: 'nominal', label: 'Nominal', sortable: true, },
      ],
      fields: [
        { key: 'index', label: 'No', sortable: false },
        { key: 'nama', label: 'Description', sortable: true, },
        { key: 'tanggal', label: 'Date', sortable: true, },
        { key: 'nominal', label: 'Nominal', sortable: true, },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      sortBy: 'id',
      sortDesc: true,
      sortDirection: 'desc',

      totalRowsPengeluaran: 1,
      currentPagePengeluaran: 1,
      perPagePengeluaran: 5,
      pageOptionsPengeluaran: [5, 10, 25, 50, 100],
      sortByPengeluaran: 'id',
      sortDescPengeluaran: true,
      sortDirectionPengeluaran: 'desc',

      startDate : '',
      endDate : '',
      totalPendapatan: 0,
      totalPengeluaran: 0,

      url_local: "http://localhost:8080/api/",
      url_deploy: "https://sipola-sixab.herokuapp.com/api/",

      invalidDate: false,
      isWindowSmall: false,
    }
  },
  computed: {
    incomeItems() {
      this.totalRows = this.pendapatanList.length
      return this.pendapatanList;
    },
    items() {
      this.totalRowsPengeluaran = this.pengeluaranList.length
      return this.pengeluaranList;
    },
  },
  beforeMount(){
    this.getPendapatanPengeluaran();
  },
  mounted(){
    this.getPaginationCoordinate();
  },
  created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
  },
  destroyed() {
      window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    getPendapatanPengeluaran: function(){
      let linkTanggal = ''
      if(this.$route.query.tanggalAwal != null && this.$route.query.tanggalAkhir != null) {
        linkTanggal = 'tanggalAwal=' + this.$route.query.tanggalAwal + '&tanggalAkhir=' + this.$route.query.tanggalAkhir
      } else if (this.$route.query.tanggalAwal != null){
        linkTanggal = 'tanggalAwal='+ this.$route.query.tanggalAwal
      } else if (this.$route.query.tanggalAkhir != null){
        linkTanggal = 'tanggalAkhir=' + this.endDate
      }

      axios.get(this.url_deploy + 'invoice?' + linkTanggal, { headers: authHeader() })
      .then(response => this.pendapatanList = response.data.result);
      axios.get(this.url_deploy + 'pengeluaran?' + linkTanggal, { headers: authHeader() })
      .then(response => this.pengeluaranList = response.data.result);
      axios.get(this.url_deploy + 'invoice/calculate?' + linkTanggal, { headers: authHeader() })
      .then(response => {
        this.totalPendapatan = response.data.result;
        });
      axios.get(this.url_deploy + 'pengeluaran/calculate?' + linkTanggal, { headers: authHeader() })
      .then(response => {
        this.totalPengeluaran = response.data.result;
        });
    },
    formatPrice(value) {
      if(value < 0){
        value *= -1
      }
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    onSubmit(evt) {
      if(this.startDate != '' && this.endDate != '' && this.startDate > this.endDate){
        this.invalidDate = true;
        this.$router.replace('');
        console.log("INVALID");
        // Reset data
        this.totalPendapatan = 0;
        this.totalPengeluaran = 0;
        this.pengeluaranList = [];
        this.pendapatanList = [];
      }
      else{
        console.log("VALID");
        if(this.startDate != '' && this.endDate != '') {
          this.$router.replace('?tanggalAwal=' + this.startDate + '&tanggalAkhir=' + this.endDate);
          console.log("Date Valid");
        } else if (this.startDate != ''){
          this.$router.replace('?tanggalAwal=' + this.startDate);
        } else if (this.endDate != ''){
          this.$router.replace('?tanggalAkhir=' + this.endDate);
        } else {
          console.log("VALID 0");
          this.$router.replace('');
        }
        this.invalidDate = false;
        this.getPendapatanPengeluaran();
      }
      
    },
    handleResize() {
        if(window.innerWidth <= 659){
          this.isWindowSmall = true;
        } else {
          this.isWindowSmall = false;
        }
    },
    redirect(){
        this.$router.push({ name: 'expense'});
    },
  },
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

#add_quotation_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 136px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}

.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}

/* .form-group{

} */

.form-tanggal{
  margin-left: 14px;
}

.label{
  font-weight: bold;
}

.find-button{
    border-color: #109CF1;
    border-width: 1px;
    background-color: #109CF1;
    color:white;
}

.invalid-date-text{
   font-size:14px;
}

p{
  margin: 0;
}

.summary_statement{
  max-width: 350px;
  margin-top: 20px;
  margin-bottom: 15px;
}

.expense-summary{
  /* display:inline-block; */
  border-bottom:1px solid black;
  padding-bottom:2px;
}

.profit{
  font-weight: bold;
  color: #1AD616;
}

.loss{
  font-weight: bold;
  color: #FF3E1D;
}

.button_group{
   margin-bottom: 1rem;
   margin-left: 14px;
}

.detail-label{
    padding-left: 70px;
}

.list-label{
  margin: 17px;
  text-align: center;
  font-weight: bold;
}

.pagination{
  margin-left: 0px;
}
</style>
