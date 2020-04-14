<template>

<b-row class="expense_row">
    <span class = "col-md-5 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
        <label>Expense Name</label>
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

    <span class = "col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
        <label>Price</label>
    </span>
    <div class= "col-md-3 col-sm-8 col-xs-8 col-7">
           <b-form-input
            id="nominal"
            v-model="expense.nominal"
            type="number"
            required
            placeholder="0"
            min="1"
            >
        </b-form-input>
    </div>

    <span class = "col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
        <label>Date</label>
    </span>
    <div class = "col-md-3 col-sm-8 col-xs-8 col-7">
           <b-form-input
            id="tanggal"
            v-model="expense.tanggal"
            type="date"
            required
            placeholder="0"
            >
        </b-form-input>
    </div>

    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none"></span>
    <div class = "col-md-1 col-sm-8 col-xs-8 col-7">
        <b-button @click="$emit('del-expense', expense.id_expense)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
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
}

.label{
  font-weight: 600;
}
</style>