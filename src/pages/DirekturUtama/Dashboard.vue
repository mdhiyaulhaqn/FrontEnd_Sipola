<template>
<div class="row">
  <div class="col-12">
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item active>
        Dashboard
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Dashboard</strong></h3>
  <div>
    <!--Stats cards-->
    <b-form>
      <div class="row">
        <div class="col-md-3 col-sm-8 col-xs-8 col-7">
          <b-form-select v-model="selected">
            <template v-slot:first>
              <b-form-select-option :value="null" disabled>-- Year --</b-form-select-option>
            </template>
            <option v-bind:key="year.index" v-for="year in currentYear" :value="year" v-b-scrollspy:nav-scroller>{{ year }}</option>
          </b-form-select>
        </div>
        <div class="col">
          <b-button class ="find-button" @click="redirect">
            Find
            <i class="fa fa-search" style="color: white; margin-left: 5px;"></i>
          </b-button>
        </div>
      </div>
    </b-form>

    <div class="row">
       <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"> <i class="ti ti-envelope"></i> <strong> Income </strong></div>
            <div v-if="this.income - this.target > 0">
              <div class = "card-body text-center amount profit">Rp{{formatPrice(income)}}</div>
            </div>
            <div v-else>
              <div class = "card-body text-center amount loss">Rp{{formatPrice(income)}}</div>
            </div>
            <div class = "card-footer">
              <strong> Target : </strong>
              Rp{{formatPrice(target)}}
            </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"> <i class="ti ti-agenda"></i> <strong> Expense </strong></div>
            <div v-if="this.budget - this.expense > 0">
              <div class = "card-body text-center amount profit">Rp{{formatPrice(expense)}}</div>
            </div>
            <div v-else>
              <div class = "card-body text-center amount loss">Rp{{formatPrice(expense)}}</div>
            </div>
            <div class = "card-footer">
              <strong> Budget : </strong>
              Rp{{formatPrice(budget)}}
            </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"> <i class="ti ti-package"></i> <strong> Project </strong></div>
            <div v-if="this.project - this.targetProject > 0">
              <div class = "card-body text-center amount profit">{{project}}</div>
            </div>
            <div v-else>
              <div class = "card-body text-center amount loss">{{project}}</div>
            </div>
            <div class = "card-footer"> <strong> Target : </strong> {{targetProject}} </div>
          </div>
      </div>
      <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"> <i class="ti ti-write"></i> <strong> Order </strong></div>
            <div v-if="this.project - this.targetOrder > 0">
              <div class = "card-body text-center amount profit">{{order}}</div>
            </div>
            <div v-else>
              <div class = "card-body text-center amount loss">{{order}}</div>
            </div>
            <div class = "card-footer"> <strong> Target : </strong> {{targetOrder}} </div>
          </div>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class = "card-header"><div class = "judul-card">Cash Flow <i class="ti ti-bar-chart" style="color:black"></i></div> for year {{selected}}</div>
          <div class="card-body">
            <BarChart :height="300" :chartData="cashFlowCollection" :options="optionsBar" :axis-min="0"></BarChart>
          </div>
          <div class="card-footer">
            <i class="ti-reload"></i> Updated <time-ago :refresh='60' class="timeago"></time-ago> ago
          </div>
        </div>
      </div>

      <div class="col-md-6 col-12">
        <div class = "card">
          <div class = "card-header"><div class = "judul-card">Project Statistics <i class="ti ti-pie-chart" style="color:black"></i> </div> for year {{selected}}</div>
          <div class = "card-body">
            <PieChart :width="300" :height="300" :chartData="datacollection" :options="options"></PieChart>
          </div>

        </div>
      </div>

      <div class="col-md-6 col-12">
        <div class="card">
          <div class = "card-header"><div class = "judul-card">Profit <i class="ti ti-stats-up" style="color:black"></i> </div> for year {{selected}}</div>
          <div class = "card-body">
            <LineChart :width="300" :height="300" :chartData="dataprofit" :options="optionsBar"></LineChart>
          </div>
        </div>
      </div>
    </div>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
      Sorry, data is not available.
    </b-modal>
  </div>
  </div>
</div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import PieChart from '@/pages/DirekturUtama/component/PieChart.vue';
import LineChart from '@/pages/DirekturUtama/component/LineChart.vue';
import BarChart from '@/pages/DirekturUtama/component/BarChart.vue';
import Chartist from 'chartist';
import axios from 'axios';
import TimeAgo from 'vue2-timeago';
import authHeader from '../../services/auth-header';

export default {
  name: 'app',
  components: {
    StatsCard,
    ChartCard,
    PieChart,
    BarChart,
    LineChart,
    TimeAgo,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      datacollection: {},
      cashFlowCollection: {},
      dataprofit: {},
      options: null,
      optionsBar: null,
      borderColour : ['#315C9C',"#FF6F61", '#6B5B95', '#9B1B30', '#F5D6C6', '#5A3E36', '#E08119'],
      projectData : null,
      list_income : {},
      list_project : {},
      list_expense : {},
      expense : '',
      income : '',
      order : '',
      project : '',
      target : 800000000,
      budget : 560000000,
      targetProject : 12,
      targetOrder : 24,
      failedModal: false,
      selected: null,
      years:null,
      currentYear:[],
      url_local_project: 'http://localhost:8080/api/dashboard/projects/',
      url_deploy_project: 'https://sipola-sixab.herokuapp.com/api/dashboard/projects/',
      url_local_income: 'http://localhost:8080/api/dashboard/income/',
      url_deploy_income: 'https://sipola-sixab.herokuapp.com/api/dashboard/income/',
      url_local_expense: 'http://localhost:8080/api/dashboard/pengeluaran/',
      url_deploy_expense: 'https://sipola-sixab.herokuapp.com/api/dashboard/pengeluaran/',
    };
  },

  beforeMount() {
      this.checkUrl()
      this.getProject();
  },

  mounted(){
      this.checkKosong();
  },

  methods: {

    checkUrl(){
      let tahun = new Date().getFullYear();
      for(let i = 2014; i <= tahun; i++){
        this.currentYear.push(i);
      }
      if (this.$route.params.year == null){
        this.$router.push({ name: 'dashboard-year',  params: {year:tahun}});
      }
    },

    redirect(){
      this.$router.push({ name: 'dashboard-year',  params: {year:this.selected}});
      this.$router.go(0)
    },

    getProject : function(){
      console.log(this.selected)
      axios.get(this.url_deploy_project + this.$route.params.year, { headers: authHeader() })
          .then(res => {this.list_project = res.data.result, this.getIncome(), this.selected = this.$route.params.year, console.log("list-project: " + this.list_project)})
          .catch(err => this.list_project = err.data);
    },
    getIncome: function(){
        axios.get(this.url_deploy_income + this.$route.params.year, { headers: authHeader() })
          .then(res => {this.list_income = res.data.result, this.getPengeluaran(), console.log("list-income: " +this.list_income)})
          .catch(err => this.list_income = err.data);
    },
    getPengeluaran: function(){
        axios.get(this.url_deploy_expense + this.$route.params.year, { headers: authHeader() })
          .then(res => {this.list_expense = res.data.result, this.computeTotal(), this.createProjectData(), this.checkKosong()})
          .catch(err => this.list_expense = err.data);
    },

    checkKosong(){
      if(this.list_project.length == 0 && this.list_income.length == 0 && this.list_expense.length == 0){
        this.failedModal = true;
      }
    },

    formatPrice(value) {
      if(value < 0){
        value *= -1
      }
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    computeTotal(){
      var jan = 0; var jan_ex = 0;
      var feb = 0; var feb_ex = 0;
      var mar = 0; var mar_ex = 0;
      var apr = 0; var apr_ex = 0;
      var may = 0; var may_ex = 0;
      var jun = 0; var jun_ex = 0;
      var jul = 0; var jul_ex = 0;
      var aug = 0; var aug_ex = 0;
      var sep = 0; var sep_ex = 0;
      var oct = 0; var oct_ex = 0;
      var nov = 0; var nov_ex = 0;
      var dec = 0; var dec_ex = 0;
      var total = 0; var total_expense = 0;

      var profit_jan = 0; var profit_feb = 0;
      var profit_mar = 0; var profit_apr = 0;
      var profit_may = 0; var profit_jun = 0;
      var profit_jul = 0; var profit_aug = 0;
      var profit_sep = 0; var profit_oct = 0;
      var profit_nov = 0; var profit_dec = 0;
      for(let i = 0; i < this.list_income.length; i++){
        if(this.list_income[i].date.substring(5,7) == 1){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            jan += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 2){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            feb += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 3){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            mar += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 4){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            apr += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 5){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            may += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 6){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            jun += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 7){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            jul += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 8){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            aug += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 9){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            sep += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 10){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            oct += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else if(this.list_income[i].date.substring(5,7) == 11){
          for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
            nov += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }else{
          for(let j = 0 ; j < this.date[i].serviceOrder.length; j++){
            dec += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
          }
        }
      }
      total = jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec;
      this.income = total;

      this.project = this.list_project.length;
      this.order = this.list_income.length;

      for(let i = 0; i < this.list_expense.length; i++){
        if(this.list_expense[i].tanggal.substring(5,7) == 1){
          jan_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 2){
          feb_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 3){
          mar_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 4){
          apr_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 5){
          may_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 6){
          jun_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 7){
          jul_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 8){
          aug_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 9){
          sep_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 10){
          oct_ex += this.list_expense[i].nominal
        }else if(this.list_expense[i].tanggal.substring(5,7) == 11){
          nov_ex += this.list_expense[i].nominal
        }else{
          dec_ex += this.list_expense[i].nominal
        }
      }

      total_expense = jan_ex + feb_ex + mar_ex + apr_ex + may_ex + jun_ex + jul_ex + aug_ex + sep_ex + oct_ex + nov_ex + dec_ex;

      this.expense = total_expense;

      // Data Profit
      if(jan - jan_ex > 0){ profit_jan += (jan - jan_ex) }
      if(feb - feb_ex > 0){ profit_feb += (feb - feb_ex) }
      if(mar - mar_ex > 0){ profit_mar += (mar - mar_ex) }
      if(apr - apr_ex > 0){ profit_apr += (apr - apr_ex) }
      if(may - may_ex > 0){ profit_may += (may - may_ex) }
      if(jun - jun_ex > 0){ profit_jun += (jun - jun_ex) }
      if(jul - jul_ex > 0){ profit_jul += (jul - jul_ex) }
      if(aug - aug_ex > 0){ profit_aug += (aug - aug_ex) }
      if(sep - sep_ex > 0){ profit_sep += (sep - sep_ex) }
      if(oct - oct_ex > 0){ profit_oct += (oct - oct_ex) }
      if(nov - nov_ex > 0){ profit_nov += (nov - nov_ex) }
      if(dec - dec_ex > 0){ profit_dec += (dec - dec_ex) }

      var label_data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      var series_data = [profit_jan, profit_feb, profit_mar, profit_apr, profit_may, profit_jun,
                          profit_jul, profit_aug, profit_sep, profit_oct, profit_nov, profit_dec]
      this.dataprofit = {
        labels: label_data,
        datasets: [
          {
            label: "Profit",
            backgroundColor: "#BD2640",
            borderColor: "#BD2640",
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "#F3BB45",
            data: series_data
          }
        ]
      };

      // Cashflow
      var data_in = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
      var data_out = [jan_ex, feb_ex, mar_ex, apr_ex, may_ex, jun_ex, jul_ex, aug_ex, sep_ex, oct_ex, nov_ex, dec_ex]
      this.cashFlowCollection = {
        labels: label_data,
        datasets: [
          {
            backgroundColor: "#BD2640",
            data: data_in,
            label: "Cash In"
          },
          {
            backgroundColor: "#F3BB45",
            data: data_out,
            label: "Cash Out"
          }
        ]
      };

      this.optionsBar = {
          responsive :true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              ticks: {
                suggestedMin: 0
              }
            }]
          }
      }
    },

    createProjectData(){

      var belom_selesai = 0;
      var sudah_selesai = 0;

      var total_project = this.list_project.length;

      for(let i = 0; i < total_project; i++){
        if(this.list_project[i].endDate.substring(0,4) > 2020){
          belom_selesai += 1;
        }
        else{
          sudah_selesai += 1;
        }
      }
      var persen_belum_selesai = parseFloat(belom_selesai) / total_project * 100
      var persen_sudah_selesai = parseFloat(sudah_selesai) / total_project * 100

      var label_data = [" Sudah Selesai", "Belum Selesai"]
      var series_data = [persen_sudah_selesai, persen_belum_selesai]

      // this.projectData = {
      //   labels: label_data,
      //   series: series_data
      // };

      this.options = {
          responsive :true,
          maintainAspectRatio: false,
      }

      this.datacollection = {
          labels: label_data,
          datasets: [
            {
              borderColor : ["#BD2640","#F3BB45"],
              backgroundColor: ["#BD2640","#F3BB45"],
              lineTension : 0,
              data: series_data
            }
          ]
        };
    }
  }
};
</script>
<style scoped>
.button_group{
   margin-bottom: 1rem;
   margin-left: 14px;
}
.judul-card{
  font-size: 20px;
}
.find-button{
    border-color: #109CF1;
    border-width: 1px;
    background-color: #109CF1;
    color:white;
    margin-bottom: 18px;
    font-size: 12px;
    line-height: 20px;
}
.amount{
  font-size: 22px;
  font-weight: bold;
}
.profit{
  color: #1AD616;
}
.loss{
  color: #FF3E1D;
}
.timeago{
  margin-left: 2px;
  font-size: 12px;
  font-weight: bold;
}
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
.judul-card{
  font-size: 20px;
  font-weight: 600;
}
.card-header{
  font-size: 18px;
}
</style>
<<<<<<< HEAD
>>>>>>> development
=======
>>>>>>> development
