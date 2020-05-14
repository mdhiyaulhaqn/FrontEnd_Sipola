<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Income and Expense Summary
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Income and Expense Summary</strong></h3>
      <card>
        <b-col>
          <b-row align-h="center">
            <b-form>
              <b-row align-v="end">
                  <b-form-group class="form-tanggal">
                      <label class="label" for="tanggal" style="">Start Date</label>
                      <b-form-input
                          id="companyName"
                          v-model="startDate"
                          type="date"
                          placeholder="Start Date"
                          >
                      </b-form-input>
                  </b-form-group>

                  <b-form-group class="form-tanggal">
                      <label class="label" for="tanggal">End Date</label>
                      <b-form-input
                          id="companyName"
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
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                
                :borderless="true"
              >

                <template v-slot:cell(id)="row">
                  {{incomeItems.indexOf(row.item) + 1}}
                </template>

                <template v-slot:cell(nominal)="row">
                  Rp{{formatPrice(row.item.nominal)}}
                </template>

                <template v-slot:cell(tanggal)="row">
                  {{row.item.tanggal | moment("ll")}}
                </template>
              </b-table>

              <b-row align-h="between">
                <b-col md="5" class="my-1" style="width:300px">
                  <b-form-group
                    label="Rows per page"
                    label-cols-sm="7"
                    label-align-sm="right"
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
                </b-col>
                <b-col sm="5" md="4" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
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
              >

                <template v-slot:cell(id)="row">
                  {{items.indexOf(row.item) + 1}}
                </template>

                <template v-slot:cell(nominal)="row">
                  Rp{{formatPrice(row.item.nominal)}}
                </template>

                <template v-slot:cell(tanggal)="row">
                  {{row.item.tanggal | moment("ll")}}
                </template>
              </b-table>

              <b-row align-h="between">
                <b-col md="5" class="my-1">
                  <b-form-group
                    label="Rows per page"
                    label-cols-sm="7"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelectPengeluaran"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="perPagePengeluaran"
                      id="perPageSelectPengeluaran"
                      size="sm"
                      :options="pageOptionsPengeluaran"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="5" md="4" class="my-1">
                  <b-pagination
                    v-model="currentPagePengeluaran"
                    :total-rows="totalRowsPengeluaran"
                    :per-page="perPagePengeluaran"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      pengeluaranList: [],
      pendapatanList: [],
      fields: [
        { key: 'id', label: 'No', sortable: false },
        { key: 'nama', label: 'Description', sortable: true, },
        // { key: 'tanggal', label: 'Date', sortable: true, },
        { key: 'nominal', label: 'Nominal', sortable: true, },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',

      totalRowsPengeluaran: 1,
      currentPagePengeluaran: 1,
      perPagePengeluaran: 5,
      pageOptionsPengeluaran: [5, 10, 25, 50, 100],
      sortByPengeluaran: '',
      sortDescPengeluaran: false,
      sortDirectionPengeluaran: 'asc',

      startDate : null,
      endDate : null,
      totalPendapatan: 0,
      totalPengeluaran: 0,
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
    }
  },
  beforeMount(){
    this.getPendapatanPengeluaran();
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

      axios.get('http://localhost:8080/api/pendapatan?' + linkTanggal)
      .then(response => this.pendapatanList = response.data.result);
      axios.get('http://localhost:8080/api/pengeluaran?' + linkTanggal)
      .then(response => this.pengeluaranList = response.data.result);

      axios.get('http://localhost:8080/api/pendapatan/calculate?' + linkTanggal)
      .then(response => {
        this.totalPendapatan = response.data.result; 
        });
      axios.get('http://localhost:8080/api/pengeluaran/calculate?' + linkTanggal)
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
      if(this.startDate != null && this.endDate != null) {
        this.$router.replace('?tanggalAwal=' + this.startDate + '&tanggalAkhir=' + this.endDate);
      } else if (this.startDate != null){
        this.$router.replace('?tanggalAwal=' + this.startDate);
      } else if (this.endDate != null){
        this.$router.replace('?tanggalAkhir=' + this.startDate);
      } 
      // this.$router.push({ name: 'income-expense-summary', query: {tanggalAwal:this.startDate, tanggalAkhir: this.endDate}});
      this.getPendapatanPengeluaran()
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
    margin: 5px 0 24px 0;
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
