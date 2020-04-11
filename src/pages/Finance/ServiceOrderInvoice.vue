<template>

    <b-row class="service_order_row">
        <b-col md="5">
            <b-form-input
                id="deskripsi"
                v-model="service_order.deskripsi"
                type="text"
                required
                placeholder="Description"
                disabled
                >
            </b-form-input>
        </b-col>

        <b-col md="2">
            <b-form-input
                id="uom"
                v-model="service_order.uom"
                type="text"
                required
                placeholder="UOM"
                disabled
                >
            </b-form-input>
        </b-col>

         <b-col md="2">
            <b-form-input
                id="quantity"
                v-model="service_order.quantity"
                type="number"
                required
                placeholder="0"
                disabled
                >
            </b-form-input>
        </b-col>
        
        <b-col md="3">
            <b-form-input
                id="pricePerUnit"
                v-model="service_order.pricePerUnit"
                type="number"
                required
                placeholder="0"
                disabled
                >
            </b-form-input>
        </b-col>

<!-- 
        <b-col md="1">
            <b-button @click="$emit('del-service-order', service_order.id_service_order)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        </b-col> -->

    </b-row>

</template>


<script>
export default {
    name: "ServiceOrder",
    props: ["service_order"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.service_order_row{
    margin-bottom: 10px;
    margin-right: 0px;
}

</style>