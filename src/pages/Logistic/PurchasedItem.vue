<template>
    <b-row class="items_row">
        <b-col md="5">
            <b-form-input
                id="name"
                v-model="purchasedItem.name"
                type="text"
                required
                placeholder="Item Name"
                pattern="[a-zA-Z0-9-]++"
            ></b-form-input>
        </b-col>

        <b-col md="2">
            <b-form-input
            id="quantity"
                v-model="purchasedItem.quantity"
                type="number"
                min="0"
                required
                placeholder="0"
            >
            </b-form-input>
        </b-col>

        <b-col md="2">
            <b-form-input
                id="uom"
                v-model="purchasedItem.unitOfMeasurement"
                type="text"
                required
                placeholder="UOM"
                pattern="[a-zA-Z\s]+"
            >
            </b-form-input>
        </b-col>

        <b-col md="2">
            <b-form-input
                id="price"
                v-model="purchasedItem.pricePerUnit"
                type="number"
                required
                min="0"
                placeholder="0"
                lang = "id-ID"
            >
            </b-form-input>
        </b-col>

        <b-col md="1">
            <b-button id="delete-button" @click="$emit('delete-item', purchasedItem.id_purchased_item)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: "PurchasedItem",
    props: ["purchasedItem"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.items_row{
    margin-bottom: 5px;
    margin-right: 0px;
}
#delete-button{
    width: 100%;
}
</style>