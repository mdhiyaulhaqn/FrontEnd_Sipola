<template>

<b-row class="expense_row">
    <b-col md="5">
        <b-form-input
            id="nama"
            v-model="expense.nama"
            type="text"
            required
            placeholder="Expense Name"
            >
        </b-form-input>
    </b-col>

    <b-col md="3">
           <b-form-input
            id="nominal"
            v-model="expense.nominal"
            type="number"
            required
            placeholder="0"
            >
        </b-form-input>
    </b-col>

    <b-col md="3">
           <b-form-input
            id="tanggal"
            v-model="expense.tanggal"
            type="date"
            required
            placeholder="0"
            >
        </b-form-input>
    </b-col>

    <b-col md="1">
        <b-button @click="$emit('del-expense', expense.id_expense)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </b-col>

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

</style>