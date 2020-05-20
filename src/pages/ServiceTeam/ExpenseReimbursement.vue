<template>
<b-row class="expense_row" style="margin: 0 -15px 5px -7px;">

    <span class = "col-md-5 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Expense Name</label>
    </span>

    <div class = "col-md-5 col-sm-8 col-xs-8 col-7">
        <b-form-input
            id="nama"
            v-model="expense.nama"
            type="text"
            required
            placeholder="Expense Name"
            maxlength="200"
            >
        </b-form-input>
    </div>

    <span class = "col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Price (IDR)</label>
    </span>
    <div class= "col-md-3 col-sm-8 col-xs-8 col-7">
           <b-form-input
            id="nominal"
            v-model="expense.nominal"
            type="number"
            required
            placeholder="0"
            min="1"
            lang="de-DE"
            >
        </b-form-input>
    </div>

    <span class = "col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Date</label>
    </span>
    <div class = "col-md-3 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
           <b-form-input
            id="tanggal"
            v-model="expense.tanggal"
            type="date"
            required
            >
        </b-form-input>
    </div>

    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none"></span>
    <div class = "col-md-1 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
        <b-button id="popover-button-variant" @click="$emit('del-expense', expense.id_expense)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        <b-popover target="popover-button-variant" variant="danger" triggers="focus">
            This field is required
        </b-popover>
    </div>

</b-row>
</template>


<script>
export default {
    name: "Expense",
    props: ["expense"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.expense_row{
    margin-bottom: 10px;
    margin-right: 0px;
    margin-left: -6px;
}
.label{
  font-weight: 600;
}
.required label:after {
  content:" *";
  color: red;
}
</style>
