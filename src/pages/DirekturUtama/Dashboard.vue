<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-1">Period</div>
    </div>
    <div class="row">
       <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"><strong> Income </strong></div>
            <div class = "card-body">{{income}}</div>
          </div>
      </div>
      <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"><strong> Expense </strong></div>
            <div class = "card-body">{{expense}}</div>
          </div>
      </div>
      <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"><strong> Project </strong></div>
            <div class = "card-body">{{project}}</div>
          </div>
      </div>
      <div class="col-md-6 col-xl-3" >
        <div class = "card">
            <div class = "card-header text-right"><strong> Order </strong></div>
            <div class = "card-body">{{order}}</div>
          </div>
      </div>
      <!-- <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">

        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div> -->
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card title="Users behavior"
                    sub-title="24 Hours performance"
                    :chart-data="usersChart.data"
                    :chart-options="usersChart.options">
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <!-- <div class="col-md-6 col-12">
        <chart-card title="Email Statistics"
                    sub-title="Last campaign performance"
                    :chart-data="projectData"
                    :chart-options="pieOptions"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div> -->
      <div class="col-md-6 col-12">
      <div class = "card">
        <div class = "card-header"><div class = "judul-card">Project Statistics</div> for year 2020</div>
        <div class = "card-body">
          <PieChart :width="300" :height="300" :chartData="datacollection" :options="options"></PieChart>

        </div>
        <div class = "card-footer">
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
          </div>
        </div>
      </div>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="2015 Sales"
                    sub-title="All products including Taxes"
                    :chart-data="activityChart.data"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Tesla Model S
            <i class="fa fa-circle text-warning"></i> BMW 5 Series
          </div>
        </chart-card>
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

export default {
  components: {
    StatsCard,
    ChartCard,
    PieChart,
    BarChart,
    LineChart,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      datacollection: {},
      options: null,
      borderColour : ['#315C9C',"#FF6F61", '#6B5B95', '#9B1B30', '#F5D6C6', '#5A3E36', '#E08119'],
      // projectData : null,
      list_income : {},
      list_project : {},
      list_expense : {},
      list_reimbursement : {},
      expense : '',
      income : '',
      order : '',
      project : '',
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Capacity",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Revenue",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: ["50%", "20%", "20%","10%"],
          series: [50,20,20,10]
        },
        options: {}
      }
    };
  },

  beforeMount() {
      this.getProject();
  },

  methods: {
    getProject : function(){
      axios.get('http://localhost:8080/api/dashboard/projects/2020')
          .then(res => {this.list_project = res.data.result, this.getIncome()})
          .catch(err => this.list_project = err.data);
    },
    getIncome: function(){
        axios.get('http://localhost:8080/api/dashboard/income/2020')
          .then(res => {this.list_income = res.data.result, this.getPengeluaran()})
          .catch(err => this.list_income = err.data);
    },
    getPengeluaran: function(){
        axios.get('http://localhost:8080/api/dashboard/pengeluaran/2020')
          .then(res => {this.list_expense = res.data.result, this.computeTotal(), this.createProjectData()})
          .catch(err => this.list_expense = err.data);
    },
    // getReimbursement: function(){
    //     axios.get('http://localhost:8080/api/dashboard/reimbursement/2020')
    //       .then(res => {this.list_reimbursement = res.data.result,this.computeTotal(), this.createProjectData()})
    //       .catch(err => this.list_reimbursement = err.data);
    // },

    computeTotal(){
      var total = 0;
      for(let i = 0; i < this.list_income.length; i++){
        for(let j = 0 ; j < this.list_income[i].serviceOrder.length; j++){
          total += this.list_income[i].serviceOrder[j].quantity * this.list_income[i].serviceOrder[j].pricePerUnit
        }
      }
      this.income = total;

      this.project = this.list_project.length;
      this.order = this.list_income.length;

      var total_expense = 0;
      for(let i = 0; i < this.list_expense.length; i++){
        total_expense += this.list_expense[i].nominal;
      }
      // for(let i = 0; i < this.list_reimbursement.length; i++){
      //   total_expense += this.list_reimbursement[i].totalReimburse;
      // }
      this.expense = total_expense;
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
.judul-card{
  font-size: 20px;
}
</style>
